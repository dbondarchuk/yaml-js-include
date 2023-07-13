[yaml-js-include - v0.0.6](../README.md) / [Exports](../modules.md) / YamlInclude

# Class: YamlInclude

A wrapper around YAML loader to enable including of files or directories

## Table of contents

### Constructors

- [constructor](YamlInclude.md#constructor)

### Accessors

- [basePath](YamlInclude.md#basepath)
- [directoryOptions](YamlInclude.md#directoryoptions)
- [encoding](YamlInclude.md#encoding)
- [schema](YamlInclude.md#schema)
- [types](YamlInclude.md#types)

### Methods

- [load](YamlInclude.md#load)
- [loadAsync](YamlInclude.md#loadasync)
- [parse](YamlInclude.md#parse)

## Constructors

### constructor

• **new YamlInclude**(`_directoryOptions?`, `_encoding?`)

Creates a new instance

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `_directoryOptions?` | [`Partial`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype )<[`IncludeDirOptions`](../interfaces/IncludeDirOptions.md)\> | `undefined` | Default options for directory include |
| `_encoding` | `BufferEncoding` | `'utf-8'` | Encoding of files. |

#### Defined in

[include.ts:17](https://github.com/dbondarchuk/yaml-js-include/blob/fca359f/src/include.ts#L17)

## Accessors

### basePath

• `get` **basePath**(): `string`

Gets a base file path for resolving files or directories

#### Returns

`string`

#### Defined in

[include.ts:72](https://github.com/dbondarchuk/yaml-js-include/blob/fca359f/src/include.ts#L72)

• `set` **basePath**(`filePath`): `void`

Sets a base file path for resolving files or directories

#### Parameters

| Name | Type |
| :------ | :------ |
| `filePath` | `string` |

#### Returns

`void`

#### Defined in

[include.ts:67](https://github.com/dbondarchuk/yaml-js-include/blob/fca359f/src/include.ts#L67)

___

### directoryOptions

• `get` **directoryOptions**(): [`Partial`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype )<[`IncludeDirOptions`](../interfaces/IncludeDirOptions.md)\>

Gets default directory include options

#### Returns

[`Partial`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype )<[`IncludeDirOptions`](../interfaces/IncludeDirOptions.md)\>

#### Defined in

[include.ts:86](https://github.com/dbondarchuk/yaml-js-include/blob/fca359f/src/include.ts#L86)

___

### encoding

• `get` **encoding**(): `BufferEncoding`

Gets default encoding for reading the files

#### Returns

`BufferEncoding`

#### Defined in

[include.ts:81](https://github.com/dbondarchuk/yaml-js-include/blob/fca359f/src/include.ts#L81)

___

### schema

• `get` **schema**(): `Schema`

Gets a schema for YAML

#### Returns

`Schema`

#### Defined in

[include.ts:96](https://github.com/dbondarchuk/yaml-js-include/blob/fca359f/src/include.ts#L96)

___

### types

• `get` **types**(): `Type`[]

Gets include types for the YAML schema

#### Returns

`Type`[]

#### Defined in

[include.ts:91](https://github.com/dbondarchuk/yaml-js-include/blob/fca359f/src/include.ts#L91)

## Methods

### load

▸ **load**<`T`\>(`filePath`, `baseSchema?`): `T`

Reads a YAML file and parses it's content using include schema

**`Default`**

yaml.DEFAULT_SCHEMA

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Type of the expected result object |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | Path to the file to read |
| `baseSchema?` | `Schema` | Determines the base schema for YAML parse. |

#### Returns

`T`

Parsed file content

#### Defined in

[include.ts:29](https://github.com/dbondarchuk/yaml-js-include/blob/fca359f/src/include.ts#L29)

___

### loadAsync

▸ **loadAsync**<`T`\>(`filePath`, `baseSchema?`): `Promise`<`T`\>

Reads a YAML file asynchronously and parses it's content using include schema

**`Default`**

yaml.DEFAULT_SCHEMA

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Type of the expected result object |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | Path to the file to read |
| `baseSchema?` | `Schema` | Determines the base schema for YAML parse. |

#### Returns

`Promise`<`T`\>

Parsed file content

#### Defined in

[include.ts:41](https://github.com/dbondarchuk/yaml-js-include/blob/fca359f/src/include.ts#L41)

___

### parse

▸ **parse**<`T`\>(`src`, `basePath`, `baseSchema?`): `T`

Parses a YAML content using include schema

**`Default`**

yaml.DEFAULT_SCHEMA

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Type of the expected result object |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | `string` | YAML as string |
| `basePath` | `string` | Base path for the include schema |
| `baseSchema?` | `Schema` | Determines the base schema for YAML parse. |

#### Returns

`T`

Parsed file content

#### Defined in

[include.ts:57](https://github.com/dbondarchuk/yaml-js-include/blob/fca359f/src/include.ts#L57)
