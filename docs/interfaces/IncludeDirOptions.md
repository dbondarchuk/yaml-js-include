[yaml-js-include - v0.0.4](../README.md) / [Exports](../modules.md) / IncludeDirOptions

# Interface: IncludeDirOptions

Describes options for including directories

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

#### Defined in

[dir.ts:41](https://github.com/dbondarchuk/yaml-js-include/blob/af0aab0/src/dir.ts#L41)

---

### exclude

• `Optional` **exclude**: `string`[]

Always exclude this files

**`Default`**

[]

#### Defined in

[dir.ts:35](https://github.com/dbondarchuk/yaml-js-include/blob/af0aab0/src/dir.ts#L35)

---

### excludeTopLevelDirSeparator

• **excludeTopLevelDirSeparator**: `boolean`

Determines whether to remove path separator ('/') from top directory name

**`Default`**

true

#### Defined in

[dir.ts:82](https://github.com/dbondarchuk/yaml-js-include/blob/af0aab0/src/dir.ts#L82)

---

### extensions

• **extensions**: `string`[]

List of allowed file extensions

**`Default`**

['.yaml', '.yml']

#### Defined in

[dir.ts:53](https://github.com/dbondarchuk/yaml-js-include/blob/af0aab0/src/dir.ts#L53)

---

### ignoreDirStructure

• **ignoreDirStructure**: `boolean`

Determines whether to ignore dir structure for constructing properties

#### Defined in

[dir.ts:76](https://github.com/dbondarchuk/yaml-js-include/blob/af0aab0/src/dir.ts#L76)

---

### ignoreIndicator

• **ignoreIndicator**: `string`

Prefix of the file names to be ignored

**`Default`**

'\_'

#### Defined in

[dir.ts:65](https://github.com/dbondarchuk/yaml-js-include/blob/af0aab0/src/dir.ts#L65)

---

### ignoreTopLevelDir

• **ignoreTopLevelDir**: `boolean`

Determines whether to include top directory directly and not inside of top directory name property

**`Default`**

true

#### Defined in

[dir.ts:71](https://github.com/dbondarchuk/yaml-js-include/blob/af0aab0/src/dir.ts#L71)

---

### include

• `Optional` **include**: `string`[]

Always include these file

**`Default`**

[]

#### Defined in

[dir.ts:29](https://github.com/dbondarchuk/yaml-js-include/blob/af0aab0/src/dir.ts#L29)

---

### lowerKeys

• **lowerKeys**: `boolean`

Determines whether to convert property names into lower case

**`Default`**

false

#### Defined in

[dir.ts:59](https://github.com/dbondarchuk/yaml-js-include/blob/af0aab0/src/dir.ts#L59)

---

### pathSeparator

• **pathSeparator**: `string`

Separator to use when constructing property names based on the directory structure

**`Default`**

true

**`Example`**

File inside `books/chapters/first.yaml` will be converted to `book_chapters_first` property name

#### Defined in

[dir.ts:89](https://github.com/dbondarchuk/yaml-js-include/blob/af0aab0/src/dir.ts#L89)

---

### recursive

• **recursive**: `boolean`

Determines whether to look for files recursively

**`Default`**

true

#### Defined in

[dir.ts:47](https://github.com/dbondarchuk/yaml-js-include/blob/af0aab0/src/dir.ts#L47)
