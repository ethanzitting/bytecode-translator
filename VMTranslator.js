import {ByteCodeReader} from './lib/ByteCodeReader';
import {ByteCodeTranslator} from './lib/ByteCodeTranslator';
import {AssemblyWriter} from './lib/AssemblyWriter';

async function main () {
    try {
        const providedName = process.argv[2];

        // Get an array of byte code strings from the designated file or directory.
        const byteCode = (new ByteCodeReader(providedName))
            .getByteCode();

        // Translate the byte code to assembly.
        const assembly = (new ByteCodeTranslator(providedName, byteCode))
            .getAssembly();

        // Write the assembly to a file.
        (new AssemblyWriter(providedName, assembly)).writeToFile();
    } catch (err) {
        console.error(err)
    }
}

main();
