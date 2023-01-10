import { YamlInclude } from '..';
import * as yaml from 'js-yaml';

describe('Base schema', () => {
  beforeEach(() => {
    process.chdir(__dirname);
  });

  it('Parses default types', () => {
    const yi = new YamlInclude();

    const actual = yi.load<any>('fixtures/basics/types.yaml');
    expect(actual.boolean_value).toBe(true);
    expect(typeof actual.boolean_value).toBe('boolean');
    expect(actual.int_value).toBe(1);
    expect(typeof actual.int_value).toBe('number');
    expect(actual.float_value).toBe(1.5);
    expect(typeof actual.float_value).toBe('number');
    expect(actual.date).toBeInstanceOf(Date);
  });

  it("Parses values as string if schema didn't define them", () => {
    const yi = new YamlInclude();

    const actual = yi.load<any>('fixtures/basics/types.yaml', yaml.CORE_SCHEMA);
    expect(actual.boolean_value).toBe(true);
    expect(typeof actual.boolean_value).toBe('boolean');
    expect(actual.int_value).toBe(1);
    expect(typeof actual.int_value).toBe('number');
    expect(actual.float_value).toBe(1.5);
    expect(typeof actual.float_value).toBe('number');
    expect(typeof actual.date).toBe('string');
  });
});
