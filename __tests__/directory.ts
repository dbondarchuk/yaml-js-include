import { YamlInclude } from "../src"

describe('Directory include', () => {
    beforeEach(() => {
        process.chdir(__dirname);
    });

    it('Includes basic directory', () => {
        const yi = new YamlInclude();
        
        const actual = yi.load<any>('fixtures/basics/directory.yaml');
        expect(Object.keys(actual.pages).length).toBe(4);
        expect(actual.pages.first.name).toBe('1');
        expect(actual.pages.second.name).toBe('2');
        expect(actual.pages.fourth.name).toBe('4');
        expect(actual.pages.$sixth.name).toBe('6');
    });

    it('Includes directory with file ref', () => {
        const yi = new YamlInclude();
        
        const actual = yi.load<any>('fixtures/basics/directory.pages.yaml');
        expect(Object.keys(actual.pages).length).toBe(1);
        expect(actual.pages.third.name).toBe('3');
        expect(actual.pages.third.values.type).toBe('Help');
        expect(actual.pages.third.values.value).toBe('Wanted');
    });

    it('Includes files directly if first argument is array', () => {
        const yi = new YamlInclude();
        
        const actual = yi.load<any>('fixtures/basics/extra/directoryFirstArgumentArray.yaml');
        expect(Object.keys(actual.pages).length).toBe(1);
        expect(actual.pages['first.page'].name).toBe('1');
    });

    ['_fifth', '_fifth.page.yaml', ].forEach(file => {
        it(`Includes files as ${file}`, () => {
            const yi = new YamlInclude({ include: [file]});
            
            const actual = yi.load<any>('fixtures/basics/directory.yaml');
            expect(actual.pages._fifth.name).toBe('5');
        });
    });

    it('Ignores files with prefix', () => {
        const yi = new YamlInclude({ ignoreIndicator: '$' });
        
        const actual = yi.load<any>('fixtures/basics/directory.yaml');
        expect(actual.pages._fifth.name).toBe('5');
        expect(actual.pages.$sixth).toBeUndefined();
    });

    ['$sixth', '$sixth.page.yaml', ].forEach(file => {
        it(`Excludes files as ${file}`, () => {
            const yi = new YamlInclude({ exclude: [file]});
            
            const actual = yi.load<any>('fixtures/basics/directory.yaml');
            expect(actual.pages.$sixth).toBeUndefined();
        });
    });

    it('Doesn\'t lowers key names', () => {
        const yi = new YamlInclude({ lowerKeys: false });
        
        const actual = yi.load<any>('fixtures/basics/directory.paging.yaml');
        expect(actual.pages.CapitalNaming.name).toBe('Capital');
    });

    it('Lowers key names', () => {
        const yi = new YamlInclude({ lowerKeys: true });
        
        const actual = yi.load<any>('fixtures/basics/directory.paging.yaml');
        expect(actual.pages.capitalnaming.name).toBe('Capital');
    });

    it('Allows empty recursive', () => {
        const yi = new YamlInclude({allowEmpty: true});
        
        const actual = yi.load<any>('fixtures/basics/directory.yaml');
        expect(actual.pages.recursive.empty).toBeDefined();
    });

    it('Does not ignores dir structure', () => {
        const yi = new YamlInclude({ignoreDirStructure: false});
        
        const actual = yi.load<any>('fixtures/basics/directory.yaml');
        expect(actual.pages.recursive.fourth).toBeDefined();
    });

    it('Allows empty non-recursive', () => {
        const yi = new YamlInclude({allowEmpty: true, recursive: false});
        
        const actual = yi.load<any>('fixtures/basics/directory.yaml');
        expect(actual.pages.empty).toBeDefined();
    });

    it('Includes basic directory not recursive', () => {
        const yi = new YamlInclude({recursive: false});
        
        const actual = yi.load<any>('fixtures/basics/directory.yaml');
        console.log(JSON.stringify(actual));
        expect(Object.keys(actual.pages).length).toBe(3);
        expect(actual.pages.first.name).toBe('1');
        expect(actual.pages.second.name).toBe('2');
        expect(actual.pages.$sixth.name).toBe('6');
    });
})