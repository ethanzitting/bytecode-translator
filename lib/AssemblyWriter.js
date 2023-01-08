import fs from 'fs';

export class AssemblyWriter {
    assembly;
    outputFileName;

    constructor(providedString, assembly) {
        this.assembly = assembly
        this.outputFileName = this.getOutputNameFromInput(providedString)
    }

    writeToFile() {
        const fileReadyAssembly = this.assembly[0]
            .join('\n')
            .trim();

        fs.writeFile(this.outputFileName, fileReadyAssembly, err => {
            if (err) {
                console.error(err);
            }
        });
    }

    // TODO: remember these notes
    // @SP = @0
    // @LCL = @1
    // @ARG = @2
    // @THIS = @3
    // @THAT = @4
    // @TEMP = 5 - 12 // My custom addition
    // pointer 0 = THIS
    // pointer 1 = THAT

    // 16-255 are where static variables are stored.
    // 256-2047 are where the stack is stored.

    getOutputNameFromInput(fileName) {
        return fileName.trim()
            .split('.')
            [0] + '.asm'
    }
}
