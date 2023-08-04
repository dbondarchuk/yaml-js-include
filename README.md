# yaml-js-include

This package provides support custom tags in a YAML document that facilitate inclusion of external .yaml files, or directories of .yaml files.
This package is a rethink of the [yaml-include](https://github.com/claylo/yaml-include) package.

### The main difference between this package and package mentioned above is a support for **relative** include inside of the included files

## Installation

`$ npm install yaml-js-include`

or

`$ yarn add yaml-js-include`

## Usage

Here is a small example of the script which allows to load a YAML file with the include tags:

```typescript
import { YamlInclude } from 'yaml-js-include';

const yamlInclude = new YamlInclude();
const myObj = yamlInclude.load<MyType>(pathToFile);
```

An example YAML file can look like this:

```yaml
name: Example
variables: !!inc/file variables.yaml
pages: !!inc/dir ['pages', { extensions: ['.page.yaml'] }]
steps:
  - name: Open Browser
    type: open-browser
    values:
      browser: chrome
      headless: true
```

Full example could be found [here](https://github.com/dbondarchuk/testh/tree/master/examples)

## YAML API

This package adds the support for the following tags inside of YAML files:

### !!inc/dir [path, options?]

Merges files in directory into the object

Arguments:

- `path` - **required** - Relative (or absolute) path to the directory
- `options` - _optional_ - Optional options for the directory include tag. Extends [`IncludeDirOptions`](/docs//interfaces/IncludeDirOptions.md)
  The merge flow for the options is like this: Default options -> Options passed to the `YamlInclude` constructor -> Options declared on the tag inside YAML file.

You can find options and defaults [here](/docs//interfaces/IncludeDirOptions.md)

### !!inc/seq [path, options?]

Merges files in directory into the array

Arguments:

- `path` - **required** - Relative (or absolute) path to the directory
- `options` - _optional_ - Optional options for the directory include tag. Extends [`IncludeDirSeqOptions`](/docs//interfaces/IncludeDirSeqOptions.md)
  The merge flow for the options is like this: Default options -> Options passed to the `YamlInclude` constructor -> Options declared on the tag inside YAML file.

You can find options and defaults [here](/docs//interfaces/IncludeDirSeqOptions.md)

### !!inc/file path

Parses path as a path to a single YAML document. The contents of that document will be a mapping under the key the tag is used on.

## JS / TS Usage

This package is written using Typescript. Please see the [documentation](/docs/modules.md)
