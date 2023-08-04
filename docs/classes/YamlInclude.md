[yaml-js-include - v1.0.0](../README.md) / [Exports](../modules.md) / YamlInclude

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
- [seqOptions](YamlInclude.md#seqoptions)
- [types](YamlInclude.md#types)

### Methods

- [load](YamlInclude.md#load)
- [loadAsync](YamlInclude.md#loadasync)
- [parse](YamlInclude.md#parse)

## Constructors

### constructor

• **new YamlInclude**(`_directoryOptions?`, `_seqOptions?`, `_encoding?`)

Creates a new instance

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `_directoryOptions?` | [`Partial`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype )<[`IncludeDirOptions`](../interfaces/IncludeDirOptions.md)\> | `undefined` | Default options for directory include |
| `_seqOptions?` | [`Partial`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype )<[`IncludeDirSeqOptions`](../interfaces/IncludeDirSeqOptions.md)\> | `undefined` | Default options for directory as array include |
| `_encoding` | `BufferEncoding` | `'utf-8'` | Encoding of files. |

#### Defined in

[include.ts:19](https://github.com/dbondarchuk/yaml-js-include/blob/cb38e6f/src/include.ts#L19)

## Accessors

### basePath

• `get` **basePath**(): `string`

Gets a base file path for resolving files or directories

#### Returns

`string`

#### Defined in

[include.ts:75](https://github.com/dbondarchuk/yaml-js-include/blob/cb38e6f/src/include.ts#L75)

• `set` **basePath**(`filePath`): `void`

Sets a base file path for resolving files or directories

#### Parameters

| Name | Type |
| :------ | :------ |
| `filePath` | `string` |

#### Returns

`void`

#### Defined in

[include.ts:70](https://github.com/dbondarchuk/yaml-js-include/blob/cb38e6f/src/include.ts#L70)

___

### directoryOptions

• `get` **directoryOptions**(): [`Partial`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype )<[`IncludeDirOptions`](../interfaces/IncludeDirOptions.md)\>

Gets default directory include options

#### Returns

[`Partial`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype )<[`IncludeDirOptions`](../interfaces/IncludeDirOptions.md)\>

#### Defined in

[include.ts:89](https://github.com/dbondarchuk/yaml-js-include/blob/cb38e6f/src/include.ts#L89)

___

### encoding

• `get` **encoding**(): `BufferEncoding`

Gets default encoding for reading the files

#### Returns

`BufferEncoding`

#### Defined in

[include.ts:84](https://github.com/dbondarchuk/yaml-js-include/blob/cb38e6f/src/include.ts#L84)

___

### schema

• `get` **schema**(): `Schema`

Gets a schema for YAML

#### Returns

`Schema`

#### Defined in

[include.ts:104](https://github.com/dbondarchuk/yaml-js-include/blob/cb38e6f/src/include.ts#L104)

___

### seqOptions

• `get` **seqOptions**(): [`Partial`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype )<[`IncludeDirSeqOptions`](../interfaces/IncludeDirSeqOptions.md)\>

Gets default directory as array include options

#### Returns

[`Partial`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype )<[`IncludeDirSeqOptions`](../interfaces/IncludeDirSeqOptions.md)\>

#### Defined in

[include.ts:94](https://github.com/dbondarchuk/yaml-js-include/blob/cb38e6f/src/include.ts#L94)

___

### types

• `get` **types**(): `Type`[]

Gets include types for the YAML schema

#### Returns

`Type`[]

#### Defined in

[include.ts:99](https://github.com/dbondarchuk/yaml-js-include/blob/cb38e6f/src/include.ts#L99)

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

[include.ts:32](https://github.com/dbondarchuk/yaml-js-include/blob/cb38e6f/src/include.ts#L32)

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

[include.ts:44](https://github.com/dbondarchuk/yaml-js-include/blob/cb38e6f/src/include.ts#L44)

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

[include.ts:60](https://github.com/dbondarchuk/yaml-js-include/blob/cb38e6f/src/include.ts#L60)
