[yaml-js-include - v0.0.2](../README.md) / [Exports](../modules.md) / YamlInclude

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

[include.ts:17](https://github.com/dbondarchuk/yaml-js-include/blob/4fa7f08/src/include.ts#L17)

## Accessors

### basePath

• `get` **basePath**(): `string`

Gets a base file path for resolving files or directories

#### Returns

`string`

#### Defined in

[include.ts:63](https://github.com/dbondarchuk/yaml-js-include/blob/4fa7f08/src/include.ts#L63)

• `set` **basePath**(`filePath`): `void`

Sets a base file path for resolving files or directories

#### Parameters

| Name | Type |
| :------ | :------ |
| `filePath` | `string` |

#### Returns

`void`

#### Defined in

[include.ts:57](https://github.com/dbondarchuk/yaml-js-include/blob/4fa7f08/src/include.ts#L57)

___

### directoryOptions

• `get` **directoryOptions**(): [`Partial`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype )<[`IncludeDirOptions`](../interfaces/IncludeDirOptions.md)\>

Gets default directory include options

#### Returns

[`Partial`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype )<[`IncludeDirOptions`](../interfaces/IncludeDirOptions.md)\>

#### Defined in

[include.ts:78](https://github.com/dbondarchuk/yaml-js-include/blob/4fa7f08/src/include.ts#L78)

___

### encoding

• `get` **encoding**(): `BufferEncoding`

Gets default encoding for reading the files

#### Returns

`BufferEncoding`

#### Defined in

[include.ts:73](https://github.com/dbondarchuk/yaml-js-include/blob/4fa7f08/src/include.ts#L73)

___

### schema

• `get` **schema**(): `Schema`

Gets a schema for YAML

#### Returns

`Schema`

#### Defined in

[include.ts:83](https://github.com/dbondarchuk/yaml-js-include/blob/4fa7f08/src/include.ts#L83)

## Methods

### load

▸ **load**<`T`\>(`filePath`): `T`

Reads a YAML file and parses it's content using include schema

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Type of the expected result object |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | Path to the file to read |

#### Returns

`T`

Parsed file content

#### Defined in

[include.ts:28](https://github.com/dbondarchuk/yaml-js-include/blob/4fa7f08/src/include.ts#L28)

___

### loadAsync

▸ **loadAsync**<`T`\>(`filePath`): `Promise`<`T`\>

Reads a YAML file asynchronously and parses it's content using include schema

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Type of the expected result object |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | Path to the file to read |

#### Returns

`Promise`<`T`\>

Parsed file content

#### Defined in

[include.ts:39](https://github.com/dbondarchuk/yaml-js-include/blob/4fa7f08/src/include.ts#L39)

___

### parse

▸ **parse**<`T`\>(`src`, `basePath`): `T`

Parses a YAML content using include schema

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Type of the expected result object |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | `string` | YAML as string |
| `basePath` | `string` | Base path for the include schema |

#### Returns

`T`

Parsed file content

#### Defined in

[include.ts:51](https://github.com/dbondarchuk/yaml-js-include/blob/4fa7f08/src/include.ts#L51)
