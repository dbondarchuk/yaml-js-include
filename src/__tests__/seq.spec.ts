import { YamlInclude } from '..';

describe('Sequence include', () => {
  beforeEach(() => {
    process.chdir(__dirname);
  });

  it('Includes basic directory', () => {
    const yi = new YamlInclude();

    const actual = yi.load<any>('fixtures/basics/directory.seq.yaml');
    expect(actual.pages.length).toBe(4);
    expect(actual.pages.find(p => p.name === "first")).toBeDefined();
    expect(actual.pages.find(p => p.name === "sixth")).toBeDefined();
    expect(actual.pages.find(p => p.name === "second")).toBeDefined();
    expect(actual.pages.find(p => p.name === "fourth")).toBeDefined();
  });

  it('Includes directory with file ref', () => {
    const yi = new YamlInclude();

    const actual = yi.load<any>('fixtures/basics/directory.seq.pages.yaml');
    expect(actual.pages.length).toBe(1);

    expect(actual.pages[0].name).toBe('third');
    expect(actual.pages[0].values.type).toBe('Help');
    expect(actual.pages[0].values.value).toBe('Wanted');
  });

  it('Ignores files with prefix', () => {
    const yi = new YamlInclude({ ignoreIndicator: '$' });

    const actual = yi.load<any>('fixtures/basics/directory.seq.yaml');
    expect(actual.pages.find(p => p.name === "fifth")).toBeDefined();
    expect(actual.pages.find(p => p.name === "sixth")).toBeUndefined();
  });

  ['_fifth', '_fifth.page.yaml'].forEach((file) => {
    it(`Includes files as ${file}`, () => {
      const yi = new YamlInclude({ include: [file] });

      const actual = yi.load<any>('fixtures/basics/directory.seq.yaml');
      expect(actual.pages.find(p => p.name === "fifth")).toBeDefined();
    });
  });

  ['$sixth', '$sixth.page.yaml'].forEach((file) => {
    it(`Excludes files as ${file}`, () => {
      const yi = new YamlInclude({ exclude: [file] });

      const actual = yi.load<any>('fixtures/basics/directory.seq.yaml');
      expect(actual.pages.find(p => p.name === "sixth")).toBeUndefined();
    });
  });

  it('Includes basic directory not recursive', () => {
    const yi = new YamlInclude({ recursive: false });

    const actual = yi.load<any>('fixtures/basics/directory.seq.yaml');
    expect(actual.pages.length).toBe(3);
    expect(actual.pages.find(p => p.name === "first")).toBeDefined();
    expect(actual.pages.find(p => p.name === "second")).toBeDefined();
    expect(actual.pages.find(p => p.name === "sixth")).toBeDefined();
  });

  it('Includes files directly if first argument is array', () => {
    const yi = new YamlInclude();

    const actual = yi.load<any>(
      'fixtures/basics/extra/directoryFirstArgumentArray.seq.yaml',
    );
    expect(actual.pages.length).toBe(1);
    expect(actual.pages[0].name).toBe('first');
  });
});
