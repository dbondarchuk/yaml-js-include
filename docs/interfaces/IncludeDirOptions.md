[yaml-js-include - v1.0.0](../README.md) / [Exports](../modules.md) / IncludeDirOptions

# Interface: IncludeDirOptions

Describes options for including directories

## Hierarchy

- `BaseIncludeDirOptions`

  ↳ **`IncludeDirOptions`**

## Table of contents

### Properties

- [allowEmpty](IncludeDirOptions.md#allowempty)
- [exclude](IncludeDirOptions.md#exclude)
- [excludeTopLevelDirSeparator](IncludeDirOptions.md#excludetopleveldirseparator)
- [extensions](IncludeDirOptions.md#extensions)
- [ignoreDirStructure](IncludeDirOptions.md#ignoredirstructure)
- [ignoreIndicator](IncludeDirOptions.md#ignoreindicator)
- [ignoreTopLevelDir](IncludeDirOptions.md#ignoretopleveldir)
- [include](IncludeDirOptions.md#include)
- [lowerKeys](IncludeDirOptions.md#lowerkeys)
- [pathSeparator](IncludeDirOptions.md#pathseparator)
- [recursive](IncludeDirOptions.md#recursive)

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

### excludeTopLevelDirSeparator

• **excludeTopLevelDirSeparator**: `boolean`

Determines whether to remove path separator ('/') from top directory name

**`Default`**

true

#### Defined in

[dir.ts:78](https://github.com/dbondarchuk/yaml-js-include/blob/0d38f47/src/dir.ts#L78)

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

### ignoreDirStructure

• **ignoreDirStructure**: `boolean`

Determines whether to ignore dir structure for constructing properties

#### Defined in

[dir.ts:72](https://github.com/dbondarchuk/yaml-js-include/blob/0d38f47/src/dir.ts#L72)

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

### ignoreTopLevelDir

• **ignoreTopLevelDir**: `boolean`

Determines whether to include top directory directly and not inside of top directory name property

**`Default`**

true

#### Defined in

[dir.ts:67](https://github.com/dbondarchuk/yaml-js-include/blob/0d38f47/src/dir.ts#L67)

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

### lowerKeys

• **lowerKeys**: `boolean`

Determines whether to convert property names into lower case

**`Default`**

false

#### Defined in

[dir.ts:84](https://github.com/dbondarchuk/yaml-js-include/blob/0d38f47/src/dir.ts#L84)

___

### pathSeparator

• **pathSeparator**: `string`

Separator to use when constructing property names based on the directory structure

**`Default`**

'_'

**`Example`**

File inside `books/chapters/first.yaml` will be converted to `book_chapters_first` property name

#### Defined in

[dir.ts:91](https://github.com/dbondarchuk/yaml-js-include/blob/0d38f47/src/dir.ts#L91)

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
