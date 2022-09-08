import { readFile } from "fs/promises";
import { IncludeDirOptions, YamlInclude } from "../src"

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
        const yi = new YamlInclude(undefined, encoding);

        expect(yi.encoding).toBe(encoding);
    });
    
    it('Returns correct dir options', () => {
        const dirOptions: Partial<IncludeDirOptions> = { allowEmpty: true, extensions: ['.json'] };
        const yi = new YamlInclude(dirOptions);

        expect(yi.directoryOptions).toBe(dirOptions);
    });
})