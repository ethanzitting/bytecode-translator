import {
    addLineNumberComments,
    indentNonJumpDestCode,
    initializeSegments
} from './utils.js';
import {CommandTranslator} from './CommandTranslator.js';

export class ByteCodeTranslator {
    assembly;
    providedName;
    lineTranslator;

    constructor(providedName, byteCodes) {
        this.lineTranslator = new CommandTranslator();
        this.providedName = providedName;
        this.assembly = this.translateAllFiles(byteCodes)
    }

    getAssembly () {
        return this.assembly
    }

    translateAllFiles (byteCodes) {
        return byteCodes.map((byteCode) => {
            return this.translateByteCodeFile(byteCode)
        });
    }

    translateByteCodeFile(byteCode) {
        let assembly = [];

        assembly.push('// ' + this.providedName.split('.')[0] + '.asm')

        assembly.push(initializeSegments())

        for (const line of byteCode) {
            assembly.push(this.translateLine(line))
        }

        assembly = assembly.flat();

        assembly = addLineNumberComments(assembly)

        return indentNonJumpDestCode(assembly);
    }

    translateLine(line) {
        let assembly = [];

        assembly.push('\n')
        assembly.push('// ' + line);

        let [command, segment, number] = line.split(' ')

        // Some vm commands are illegal to use directly in javascript so we
        // change them out here
        switch (command) {
            case 'if-goto':
                command = 'ifGoTo'
                break;
            case 'function':
                command = 'functionDeclaration'
                break;
            case 'return':
                command = 'returnFromFunction'
                break;
        }

        // Call the method on the lineTranslator that corresponds to the command
        assembly.push(...this.lineTranslator[command](
            segment,
            number,
            this.providedName
        ))

        console.log('assembly')
        console.log(assembly)

        return assembly;
    }
}
