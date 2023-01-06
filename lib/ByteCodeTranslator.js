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

        // TODO: Establish a test suite for all previous translations.

        // Whe it sees a call, the arguments will be prepared on the stack.

        // We will call with the number of arguments passed in.

        // First we set the arg pointer to the address of the first argument
        // on the stack.

        // then, push the return address onto the stack. Then push the
        // address of lcl, arg, this, that onto the stack. This is saving
        // the callers frame.

        // Then we jump to execute foo?

        // We are now running a function command.

        // first, we set up a local segment for the function.

        // We push nArgs 0s onto the stack?

        // Then the function does it's thing.

        // It's final act is to push the return value onto the stack.


        // Then we run the return command.

        // return copies the return value onto arguement 0.

        // then it restores the segments of the caller, lcl, arg, this, that

        // then it sets the sp to just after arg 0.

        // then we jump to the return address, bringing us fully back to
        // before the function call.



        // When finished, the return value will take the place of the first argument.


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

        return assembly;
    }
}
