import * as fs from 'fs';
import * as p from 'path';
import * as yaml from 'js-yaml';
import * as merge from 'lodash.merge';
import { YamlInclude } from './include';

export function recursiveReaddirSync(path: string, recursive = true): string[] {
  let list: string[] = [];
  const files = fs.readdirSync(path);

  files.forEach(function (file) {
    const stats = fs.lstatSync(p.join(path, file));
    if (recursive && stats.isDirectory()) {
      list = list.concat(recursiveReaddirSync(p.join(path, file)));
    } else {
      list.push(p.join(path, file));
    }
  });

  return list;
}

export interface BaseIncludeDirOptions {
  /**
   * Always include these file
   * @default []
   */
  include?: string[];

  /**
   * Always exclude this files
   * @default []
   */
  exclude?: string[];

  /**
   * Determines whether to allow empty entries
   * @default false
   */
  allowEmpty: boolean;

  /**
   * Determines whether to look for files recursively
   * @default true
   */
  recursive: boolean;

  /**
   * List of allowed file extensions
   * @default ['.yaml', '.yml']
   */
  extensions: string[];

  /**
   * Prefix of the file names to be ignored
   * @default '_'
   */
  ignoreIndicator: string;
}

/** Describes options for including directories */
export interface IncludeDirOptions extends BaseIncludeDirOptions {
  /**
   * Determines whether to include top directory directly and not inside of top directory name property
   * @default true
   */
  ignoreTopLevelDir: boolean;

  /**
   * Determines whether to ignore dir structure for constructing properties
   */
  ignoreDirStructure: boolean;

  /**
   * Determines whether to remove path separator ('/') from top directory name
   * @default true
   */
  excludeTopLevelDirSeparator: boolean;

  /**
   * Determines whether to convert property names into lower case
   * @default false
   */
  lowerKeys: boolean;

  /**
   * Separator to use when constructing property names based on the directory structure
   * @default '_'
   * @example File inside `books/chapters/first.yaml` will be converted to `book_chapters_first` property name
   */
  pathSeparator: string;
}

const DefaultIncludeDirOptions: IncludeDirOptions = {
  include: [],
  exclude: [],
  allowEmpty: false,
  recursive: true,
  extensions: ['.yaml', '.yml'],
  lowerKeys: false,
  ignoreIndicator: '_',
  ignoreTopLevelDir: true,
  ignoreDirStructure: true,
  excludeTopLevelDirSeparator: true,
  pathSeparator: '_'
};

/**
 * Gets a schema for including directories
 * @param yamlInclude YAML include object
 * @returns {yaml.Type} YAML type for a schema
 */
export const getDirectoryIncludeType = (
  yamlInclude: YamlInclude,
): yaml.Type => {
  return new yaml.Type('tag:yaml.org,2002:inc/dir', {
    kind: 'sequence',
    // Data should be an array of 1 or 2 items (path and optional options)
    resolve: (data: any) =>
      Array.isArray(data) && data.length > 0 && data.length < 3,
    construct: (data: any[]): any => {
      const basePath = yamlInclude.basePath;

      let files: string[] = [];

      if (!data[1]) {
        data[1] = {};
      }

      const options = {
        ...DefaultIncludeDirOptions,
        ...(yamlInclude.directoryOptions ?? {}),
        ...data[1],
      } as IncludeDirOptions;

      let result = {};
      options.extensions.sort((a, b) => b.length - a.length);

      if (Array.isArray(data[0])) {
        files = data[0];
      } else {
        const fullPath = p.join(basePath, data[0]);

        files = recursiveReaddirSync(fullPath, options.recursive);
        files = files.map((filePath) => filePath.replace(basePath + p.sep, ''));
      }

      // sort the by length of filepath
      files.sort(function (a, b) {
        return a.length - b.length;
      });

      const getKeepingFileName = (filePath: string): string | undefined => {
        const extension = options.extensions.find((ext) =>
          filePath.endsWith(ext),
        );

        if (!extension) {
          return undefined;
        }

        const filename = p.basename(filePath, extension);

        // check whitelist for filepath and file name
        if (
          options.include &&
          (options.include.indexOf(filePath) !== -1 ||
            options.include.indexOf(filename) !== -1 ||
            options.include.indexOf(filename + extension) !== -1)
        ) {
          return filename;
        }

        // if ANY part of the path has an ignorePrefix,
        // skip it
        if (filePath.indexOf(p.sep + options.ignoreIndicator) !== -1) {
          return undefined;
        }

        // check blacklist for filepath and file name
        if (
          options.exclude &&
          (options.exclude.indexOf(filePath) !== -1 ||
            options.exclude.indexOf(filename) !== -1 ||
            options.exclude.indexOf(filename + extension) !== -1)
        ) {
          return undefined;
        }

        return filename;
      };

      files.forEach(function (filePath: string) {
        let filename = getKeepingFileName(filePath);
        if (!filename) {
          return;
        }

        const splitDirPath = filePath.split(p.sep);
        splitDirPath.pop();

        // we generally don't want the top dir.
        if (options.ignoreTopLevelDir) {
          splitDirPath.shift();
        }

        if (options.lowerKeys) {
          filename = filename.toLowerCase();
        }

        // get the source at last
        let included = {};
        const fullFilePath = p.join(basePath, filePath);
        const src = fs.readFileSync(fullFilePath, yamlInclude.encoding);
        if (src.length > 0) {
          included = yamlInclude.parse(src, fullFilePath);

          yamlInclude.basePath = basePath;
        }

        const tmp = {};
        if (options.recursive) {
          let key = options.excludeTopLevelDirSeparator
            ? ''
            : options.pathSeparator;
          key += splitDirPath.join(options.pathSeparator);
          if (options.allowEmpty) {
            tmp[key] = {};
            tmp[key][filename] = included;
          } else {
            if (Object.getOwnPropertyNames(included).length > 0) {
              if (key.length > 0 && !options.ignoreDirStructure) {
                tmp[key] = {};
                tmp[key][filename] = included;
              } else {
                // this implements the opt.excludeTopLevelDirSeparator option when at the top level
                tmp[filename] = included;
              }
            }
          }
        } else {
          if (options.allowEmpty) {
            tmp[filename] = included;
          } else {
            if (Object.getOwnPropertyNames(included).length > 0) {
              tmp[filename] = included;
            }
          }
        }

        result = merge(result, tmp);
      });

      return result;
    },
    instanceOf: Object,
  });
};
