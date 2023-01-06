import {ByteCodeReader} from './ByteCodeReader.js';
import {ByteCodeTranslator} from './ByteCodeTranslator.js';
import {AssemblyWriter} from './AssemblyWriter.js';

export function translate(providedName) {
    // Get an array of byte code strings from the designated file or directory.
    const byteCode = (new ByteCodeReader(providedName))
        .getByteCode();

    // Translate the byte code to assembly.
    const assembly = (new ByteCodeTranslator(providedName, byteCode))
        .getAssembly();

    // Write the assembly to a file.
    (new AssemblyWriter(providedName, assembly)).writeToFile();
}
