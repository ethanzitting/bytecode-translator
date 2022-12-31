import fs from 'fs';

export class AssemblyWriter {
    assembly;
    outputFileName;

    constructor(providedString, assembly) {
        this.assembly = assembly
        this.outputFileName = this.getOutputNameFromInput(providedString)
    }

    writeToFile() {
        const fileReadyAssembly = this.assembly.join('\n')
            .trim() + '\n';

        fs.writeFile(this.outputFileName, fileReadyAssembly, err => {
            if (err) {
                console.error(err);
            }
        });
    }

    getOutputNameFromInput(fileName) {
        return fileName.trim()
            .split('.')
            [0] + '.asm'
    }
}
