import fs from 'fs';
import {ByteCodeTranslator} from './lib/ByteCodeTranslator.js';
import {ByteCodeReader} from './lib/ByteCodeReader.js';

function main() {
    const singleFileTestDirs = fs.readdirSync('./tests/SingleFile', 'utf8');

    for (const testDirectory of singleFileTestDirs) {
        const testRoot = './tests/SingleFile/' + testDirectory;
        let files = fs.readdirSync(testRoot, 'utf8')

        const byteCodeFile = files.find(name => name.includes('.vm'))
        const byteCodeAddress = `${testRoot}/${byteCodeFile}`;

        const byteCode = (new ByteCodeReader(byteCodeAddress))
            .getByteCode();

        if (!byteCode) {
            console.log('No byte code found: ' + testRoot)
            continue;
        }

        const assembly = (new ByteCodeTranslator(byteCodeFile, byteCode))
            .getAssembly()

        const comparisonFile = files.find(name => name.includes('.cmp'))
        if (!comparisonFile) {
            console.log('No comparison file found: ' + testRoot)
            continue;
        }
        const comparisonAddress = `${testRoot}/${comparisonFile}`;

        const comparisonAssembly = (new ByteCodeReader(comparisonAddress))
            .getByteCode();

        const res = isAssemblyIdentical(comparisonAssembly, cleanUpCommands(assembly))

        console.log(testRoot + ': ' + res)
    }

    const multiFileTestDirs = fs.readdirSync('./tests/MultipleFiles', 'utf8');

    for (const testDirectory of multiFileTestDirs) {
        const testRoot = './tests/MultipleFiles/' + testDirectory;
        let files = fs.readdirSync(testRoot, 'utf8')

        const byteCode = (new ByteCodeReader(testRoot))
            .getByteCode();

        if (!byteCode) {
            console.log('No byte code found: ' + testRoot)
            continue;
        }

        const byteCodeFile = files.find(name => name.includes('.vm'))

        const assembly = (new ByteCodeTranslator(byteCodeFile, byteCode))
            .getAssembly()

        const comparisonFile = files.find(name => name.includes('.cmp'))

        if (!comparisonFile) {
            console.log('No comparison file found: ' + testRoot)
            continue;
        }

        const comparisonAddress = `${testRoot}/${comparisonFile}`;

        const comparisonAssembly = (new ByteCodeReader(comparisonAddress))
            .getByteCode();

        const res = isAssemblyIdentical(comparisonAssembly, cleanUpCommands(assembly))

        console.log(testRoot + ': ' + res)
    }

}

main();

function isAssemblyIdentical(comparisonAssembly, generatedAssembly) {
    comparisonAssembly = comparisonAssembly.flat()
    generatedAssembly = generatedAssembly.flat()

    if (comparisonAssembly.length !== generatedAssembly.length) {
        return 'FAILED: Different number of lines';
    }

    for (let i = 0; i < comparisonAssembly.length; i++) {
        if (comparisonAssembly[i] !== generatedAssembly[i]) {
            return 'FAILED: Different line at ' + i;
        }
    }

    return 'PASSED';
}

function cleanUpCommands(commands) {
    return commands[0].map(line => {
            const commentStart = line.indexOf('//')

            if (commentStart !== -1) {
                return line.slice(0, commentStart)
            }

            return line
        })
        .map(line => line.trim())
        .filter(Boolean)
}
