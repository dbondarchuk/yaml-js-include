import { readFileSync, statSync } from 'fs';
import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';
import * as p from 'path';
import { IncludeDirOptions, getDirectoryIncludeType } from './dir';
import { getFileIncludeType } from './file';

/** A wrapper around YAML loader to enable including of files or directories */
export class YamlInclude {
  private _baseFile = '';

  /**
   * Creates a new instance
   * @param _directoryOptions Default options for directory include
   * @param _encoding Encoding of files.
   */
  constructor(
    private readonly _directoryOptions?: Partial<IncludeDirOptions>,
    private readonly _encoding: BufferEncoding = 'utf-8',
  ) {}

  /**
   * Reads a YAML file and parses it's content using include schema
   * @param filePath Path to the file to read
   * @typeParam T - Type of the expected result object
   * @returns Parsed file content
   */
  public load<T>(filePath: string): T {
    const src = readFileSync(filePath, this._encoding);
    return this.parse(src, filePath);
  }

  /**
   * Reads a YAML file asynchronously and parses it's content using include schema
   * @param filePath Path to the file to read
   * @typeParam T - Type of the expected result object
   * @returns Parsed file content
   */
  public async loadAsync<T>(filePath: string): Promise<T> {
    const src = await readFile(filePath, this._encoding);
    return this.parse(src, filePath);
  }

  /**
   * Parses a YAML content using include schema
   * @param src YAML as string
   * @param basePath Base path for the include schema
   * @typeParam T - Type of the expected result object
   * @returns Parsed file content
   */
  public parse<T>(src: string, basePath: string): T {
    this.basePath = basePath;
    return yaml.load(src, { schema: this.schema, filename: basePath }) as T;
  }

  /** Sets a base file path for resolving files or directories */
  public set basePath(filePath: string) {
    this._baseFile = p.resolve(filePath);
    console.debug(`Setting base file ${this._baseFile}`);
  }

  /** Gets a base file path for resolving files or directories */
  public get basePath(): string {
    const dir = statSync(this._baseFile).isDirectory()
      ? this._baseFile
      : p.dirname(this._baseFile);

    console.debug(`Getting base path ${dir}`);
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

  /** Gets a schema for YAML */
  public get schema(): yaml.Schema {
    const types = [getDirectoryIncludeType(this), getFileIncludeType(this)];
    return new yaml.Schema(types);
  }
}
