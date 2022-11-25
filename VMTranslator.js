import {getByteCodeFromFileName} from './helpers/byte-code-file-reader.js';
import {translateByteCodeToAssembly} from './helpers/byte-code-translator.js';
import {
    getOutputNameFromInput,
    writeAssemblyToFile
} from './helpers/assembly-code-writer.js';

try {
    const inputFileName = process.argv[2];

    const byteCode = getByteCodeFromFileName(inputFileName);

    const assembly = translateByteCodeToAssembly(inputFileName, byteCode);

    const outputFileName = getOutputNameFromInput(inputFileName);

    writeAssemblyToFile(assembly, outputFileName)
} catch (err) {
    console.error(err)
}
