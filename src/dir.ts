import * as fs from 'fs';
import * as p from 'path';
import * as yaml from 'js-yaml';
import * as merge from 'lodash.merge';
import { YamlInclude } from './include';

function recursiveReaddirSync(path: string): string[] {
  let list: string[] = [];
  const files = fs.readdirSync(path);

  files.forEach(function (file) {
    const stats = fs.lstatSync(p.join(path, file));
    if (stats.isDirectory()) {
      list = list.concat(recursiveReaddirSync(p.join(path, file)));
    } else {
      list.push(p.join(path, file));
    }
  });

  return list;
}

/** Describes options for including directories */
export interface IncludeDirOptions {
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
   * Determines whether to convert property names into lower case
   * @default false
   */
  lowerKeys: boolean;

  /**
   * Prefix of the file names to be ignored
   * @default '_'
   */
  ignoreIndicator: string;

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
   * Separator to use when constructing property names based on the directory structure
   * @default true
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
  pathSeparator: '_',
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
      let result = {};

      if (Array.isArray(data[0])) {
        files = data[0];
      } else {
        const fullPath = p.join(basePath, data[0]);

        console.debug(`Constructing directory include: reading ${fullPath}`);

        files = recursiveReaddirSync(fullPath);
        files = files.map((filePath) => filePath.replace(basePath + p.sep, ''));
      }

      console.debug(`Constructing directory include: files ${files}`);

      // sort the by length of filepath
      files.sort(function (a, b) {
        return a.length - b.length;
      });

      if (!data[1]) {
        data[1] = {};
      }

      const options = {
        ...DefaultIncludeDirOptions,
        ...(yamlInclude.directoryOptions ?? {}),
        ...data[1],
      } as IncludeDirOptions;
      options.extensions.sort((a, b) => b.length - a.length);

      console.debug(
        'Constructing directory include: resolved options %j',
        options,
      );

      const getKeepingFileName = (filePath: string): string | undefined => {
        const extension = options.extensions.find((ext) =>
          filePath.endsWith(ext),
        );

        if (!extension) {
          console.debug(
            'Constructing directory include: skipping disallowed file extension in %s',
            filePath,
          );
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
          console.debug(
            'Constructing directory include: whitelisting %s',
            filePath,
          );
          return filename;
        }

        // if ANY part of the path has an ignorePrefix,
        // skip it
        if (filePath.indexOf(p.sep + options.ignoreIndicator) !== -1) {
          console.debug(
            'Constructing directory include: ignoring %s',
            filePath,
          );
          return undefined;
        }

        // check blacklist for filepath and file name
        if (
          options.exclude &&
          (options.exclude.indexOf(filePath) !== -1 ||
            options.exclude.indexOf(filename) !== -1 ||
            options.exclude.indexOf(filename + extension) !== -1)
        ) {
          console.debug(
            'Constructing directory include: blacklisting %s',
            filePath,
          );
          return undefined;
        }

        // guess we're keeping it!
        console.debug(
          `Constructing directory include: keepFile: keeping ${filePath}`,
        );

        return filename;
      };

      files.forEach(function (filePath: string) {
        console.debug(`Constructing directory include: looking at ${filePath}`);

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
