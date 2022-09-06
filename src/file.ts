import * as p from 'path';
import * as yaml from 'js-yaml';
import { YamlInclude } from './include';

/**
 * Gets a schema for including files
 * @param yamlInclude YAML include object
 * @returns {yaml.Type} YAML type for a schema
 */
export const getFileIncludeType = (yamlInclude: YamlInclude): yaml.Type => {
  return new yaml.Type('tag:yaml.org,2002:inc/file', {
    kind: 'scalar',
    resolve: (data: any): boolean => {
      console.debug(`Resolving data for file: ${data}`);
      return typeof data === 'string';
    },
    construct: (data: string): any => {
      const basePath = yamlInclude.basePath;
      const fullPath = p.join(basePath, data);

      yamlInclude.basePath = fullPath;

      console.debug(
        `Constructing file include: basePath=${basePath}, fullPath: ${fullPath}, data=${data}`,
      );

      const included = yamlInclude.load(fullPath);

      yamlInclude.basePath = basePath;

      return included;
    },
  });
};
