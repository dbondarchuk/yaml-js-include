[yaml-js-include - v1.0.0](../README.md) / [Exports](../modules.md) / IncludeDirSeqOptions

# Interface: IncludeDirSeqOptions

Describes options for including directories as an array

## Hierarchy

- `BaseIncludeDirOptions`

  ↳ **`IncludeDirSeqOptions`**

## Table of contents

### Properties

- [allowEmpty](IncludeDirSeqOptions.md#allowempty)
- [exclude](IncludeDirSeqOptions.md#exclude)
- [extensions](IncludeDirSeqOptions.md#extensions)
- [ignoreIndicator](IncludeDirSeqOptions.md#ignoreindicator)
- [include](IncludeDirSeqOptions.md#include)
- [recursive](IncludeDirSeqOptions.md#recursive)

## Properties

### allowEmpty

• **allowEmpty**: `boolean`

Determines whether to allow empty entries

**`Default`**

false

#### Inherited from

BaseIncludeDirOptions.allowEmpty

#### Defined in

[dir.ts:40](https://github.com/dbondarchuk/yaml-js-include/blob/0d38f47/src/dir.ts#L40)

___

### exclude

• `Optional` **exclude**: `string`[]

Always exclude this files

**`Default`**

[]

#### Inherited from

BaseIncludeDirOptions.exclude

#### Defined in

[dir.ts:34](https://github.com/dbondarchuk/yaml-js-include/blob/0d38f47/src/dir.ts#L34)

___

### extensions

• **extensions**: `string`[]

List of allowed file extensions

**`Default`**

['.yaml', '.yml']

#### Inherited from

BaseIncludeDirOptions.extensions

#### Defined in

[dir.ts:52](https://github.com/dbondarchuk/yaml-js-include/blob/0d38f47/src/dir.ts#L52)

___

### ignoreIndicator

• **ignoreIndicator**: `string`

Prefix of the file names to be ignored

**`Default`**

'_'

#### Inherited from

BaseIncludeDirOptions.ignoreIndicator

#### Defined in

[dir.ts:58](https://github.com/dbondarchuk/yaml-js-include/blob/0d38f47/src/dir.ts#L58)

___

### include

• `Optional` **include**: `string`[]

Always include these file

**`Default`**

[]

#### Inherited from

BaseIncludeDirOptions.include

#### Defined in

[dir.ts:28](https://github.com/dbondarchuk/yaml-js-include/blob/0d38f47/src/dir.ts#L28)

___

### recursive

• **recursive**: `boolean`

Determines whether to look for files recursively

**`Default`**

true

#### Inherited from

BaseIncludeDirOptions.recursive

#### Defined in

[dir.ts:46](https://github.com/dbondarchuk/yaml-js-include/blob/0d38f47/src/dir.ts#L46)
