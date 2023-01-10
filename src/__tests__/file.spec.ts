import { YamlInclude } from '..';

describe('File include', () => {
  beforeEach(() => {
    process.chdir(__dirname);
  });

  it('Includes basic file', () => {
    const yi = new YamlInclude();

    const actual = yi.load<any>('fixtures/basics/fileInclude.yaml');
    expect(actual.type).toBe('Values');
    expect(actual.values.type).toBe('Help');
    expect(actual.values.value).toBe('Wanted');
  });

  it('Works correctly with relative paths in included files', () => {
    const yi = new YamlInclude();

    const actual = yi.load<any>('fixtures/basics/fileIncludeWithRelative.yaml');
    expect(actual.type).toBe('Values');
    expect(actual.values.values.type).toBe('Help');
    expect(actual.values.values.value).toBe('Wanted');
  });
});
