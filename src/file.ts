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
      return typeof data === 'string';
    },
    construct: (data: string): any => {
      const basePath = yamlInclude.basePath;
      const fullPath = p.join(basePath, data);

      yamlInclude.basePath = fullPath;

      const included = yamlInclude.load(fullPath);

      yamlInclude.basePath = basePath;

      return included;
    },
  });
};
