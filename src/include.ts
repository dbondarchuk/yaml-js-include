import { readFileSync, statSync } from 'fs';
import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';
import * as p from 'path';
import { IncludeDirOptions, getDirectoryIncludeType } from './dir';
import { getFileIncludeType } from './file';
import { IncludeDirSeqOptions, getSeqIncludeType } from './seq';

/** A wrapper around YAML loader to enable including of files or directories */
export class YamlInclude {
  private _baseFile = '';

  /**
   * Creates a new instance
   * @param _directoryOptions Default options for directory include
   * @param _seqOptions Default options for directory as array include
   * @param _encoding Encoding of files.
   */
  constructor(
    private readonly _directoryOptions?: Partial<IncludeDirOptions>,
    private readonly _seqOptions?: Partial<IncludeDirSeqOptions>,
    private readonly _encoding: BufferEncoding = 'utf-8',
  ) {}

  /**
   * Reads a YAML file and parses it's content using include schema
   * @param filePath Path to the file to read
   * @param baseSchema Determines the base schema for YAML parse. @default yaml.DEFAULT_SCHEMA
   * @typeParam T - Type of the expected result object
   * @returns Parsed file content
   */
  public load<T>(filePath: string, baseSchema?: yaml.Schema): T {
    const src = readFileSync(filePath, this._encoding);
    return this.parse(src, filePath, baseSchema);
  }

  /**
   * Reads a YAML file asynchronously and parses it's content using include schema
   * @param filePath Path to the file to read
   * @param baseSchema Determines the base schema for YAML parse. @default yaml.DEFAULT_SCHEMA
   * @typeParam T - Type of the expected result object
   * @returns Parsed file content
   */
  public async loadAsync<T>(
    filePath: string,
    baseSchema?: yaml.Schema,
  ): Promise<T> {
    const src = await readFile(filePath, this._encoding);
    return this.parse(src, filePath, baseSchema);
  }

  /**
   * Parses a YAML content using include schema
   * @param src YAML as string
   * @param basePath Base path for the include schema
   * @param baseSchema Determines the base schema for YAML parse. @default yaml.DEFAULT_SCHEMA
   * @typeParam T - Type of the expected result object
   * @returns Parsed file content
   */
  public parse<T>(src: string, basePath: string, baseSchema?: yaml.Schema): T {
    baseSchema = baseSchema || yaml.DEFAULT_SCHEMA;
    this.basePath = basePath;
    return yaml.load(src, {
      schema: baseSchema.extend(this.types),
      filename: basePath,
    }) as T;
  }

  /** Sets a base file path for resolving files or directories */
  public set basePath(filePath: string) {
    this._baseFile = p.resolve(filePath);
  }

  /** Gets a base file path for resolving files or directories */
  public get basePath(): string {
    const dir = statSync(this._baseFile).isDirectory()
      ? this._baseFile
      : p.dirname(this._baseFile);

    return dir;
  }

  /** Gets default encoding for reading the files */
  public get encoding(): BufferEncoding {
    return this._encoding;
  }

  /** Gets default directory include options */
  public get directoryOptions(): Partial<IncludeDirOptions> | undefined {
    return this._directoryOptions;
  }

  /** Gets default directory as array include options */
  public get seqOptions(): Partial<IncludeDirSeqOptions> | undefined {
    return this._seqOptions;
  }

  /** Gets include types for the YAML schema */
  public get types(): yaml.Type[] {
    return [getDirectoryIncludeType(this), getSeqIncludeType(this), getFileIncludeType(this)];
  }

  /** Gets a schema for YAML */
  public get schema(): yaml.Schema {
    return new yaml.Schema(this.types);
  }
}
