import {getByteCodeFromFileName} from './byte-code-file-reader.js';
import {translateByteCodeToAssembly} from './byte-code-translator.js';

try {
    const inputFileName = process.argv[2];

    const byteCode = getByteCodeFromFileName(inputFileName);

    console.log(`byteCode`);
    console.log(byteCode.join('\n'));
    console.log('\n')

    const assembly = translateByteCodeToAssembly(byteCode);

    console.log('assembly')
    console.log(assembly.join('\n'))
} catch (err) {
    console.error(err)
}
