import * as fs from 'fs';
import * as p from 'path';
import * as yaml from 'js-yaml';
import { YamlInclude } from './include';
import { BaseIncludeDirOptions, recursiveReaddirSync } from './dir';

/** Describes options for including directories as an array */
export interface IncludeDirSeqOptions extends BaseIncludeDirOptions {
}

const DefaultIncludeDirSeqOptions: IncludeDirSeqOptions = {
  include: [],
  exclude: [],
  allowEmpty: false,
  recursive: true,
  extensions: ['.yaml', '.yml'],
  ignoreIndicator: '_',
};

/**
 * Gets a schema for including directories as sequence (array)
 * @param yamlInclude YAML include object
 * @returns {yaml.Type} YAML type for a schema
 */
export const getSeqIncludeType = (
  yamlInclude: YamlInclude,
): yaml.Type => {
  return new yaml.Type('tag:yaml.org,2002:inc/seq', {
    kind: 'sequence',
    // Data should be an array of 1 or 2 items (path and optional options)
    resolve: (data: any) =>
      Array.isArray(data) && data.length > 0 && data.length < 3,
    construct: (data: any[]): any[] => {
      const basePath = yamlInclude.basePath;

      let files: string[] = [];

      if (!data[1]) {
        data[1] = {};
      }

      const options = {
        ...DefaultIncludeDirSeqOptions,
        ...(yamlInclude.directoryOptions ?? {}),
        ...data[1],
      } as IncludeDirSeqOptions;

      let result = [];
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

        // get the source at last
        let included = {};
        const fullFilePath = p.join(basePath, filePath);
        const src = fs.readFileSync(fullFilePath, yamlInclude.encoding);
        if (src.length > 0) {
          included = yamlInclude.parse(src, fullFilePath);

          yamlInclude.basePath = basePath;
        }

        if (options.allowEmpty || Object.getOwnPropertyNames(included).length > 0) {
          result.push(included);
        }
      });

      return result;
    },
    instanceOf: Array,
  });
};
