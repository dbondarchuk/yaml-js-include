import { readFile } from 'fs/promises';
import { IncludeDirOptions, YamlInclude } from '..';
import { IncludeDirSeqOptions } from '../seq';

describe('YamlInclude', () => {
  beforeEach(() => {
    process.chdir(__dirname);
  });

  it('Different methods give same result', async () => {
    const yi = new YamlInclude();

    const filePath = 'fixtures/basics/fileIncludeWithRelative.yaml';
    const actualLoad = yi.load<any>(filePath);
    const actualLoadAsync = await yi.loadAsync<any>(filePath);

    const content = await readFile(filePath);
    const actualParse = yi.parse<any>(content.toString(), filePath);

    expect(actualLoad).toStrictEqual(actualLoadAsync);
    expect(actualLoad).toStrictEqual(actualParse);
  });

  it('Returns correct encoding', () => {
    const encoding: BufferEncoding = 'binary';
    const yi = new YamlInclude(undefined, undefined, encoding);

    expect(yi.encoding).toBe(encoding);
  });

  it('Returns correct dir options', () => {
    const dirOptions: Partial<IncludeDirOptions> = {
      allowEmpty: true,
      extensions: ['.json'],
    };
    const yi = new YamlInclude(dirOptions);

    expect(yi.directoryOptions).toBe(dirOptions);
  });

  it('Returns correct seq options', () => {
    const seqOptions: Partial<IncludeDirSeqOptions> = {
      allowEmpty: true,
      extensions: ['.json'],
    };
    const yi = new YamlInclude(undefined, seqOptions);

    expect(yi.seqOptions).toBe(seqOptions);
  });

  it('Returns correct types', () => {
    const yi = new YamlInclude();

    expect(yi.types.length).toBe(3);
    expect(
      yi.types.some((type) => type['type'] === 'tag:yaml.org,2002:inc/file'),
    );
    expect(
      yi.types.some((type) => type['type'] === 'tag:yaml.org,2002:inc/dir'),
    );
    expect(
      yi.types.some((type) => type['type'] === 'tag:yaml.org,2002:inc/seq'),
    );
  });

  it('Returns correct schema', () => {
    const yi = new YamlInclude();

    expect(yi.schema).toBeDefined();
  });
});
