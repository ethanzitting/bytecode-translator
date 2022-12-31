import fs from 'fs';

export class ByteCodeReader {
    byteCode;

    constructor(argument) {
        const fileNames = this.getFileNamesFromArgument(argument)
        this.byteCode = this.getByteCodeFromFileNames(fileNames)
    }

    getByteCode () {
        return this.byteCode;
    }

    getFileNamesFromArgument (argument) {
        const inputIsFile = argument.includes('.')
        if (inputIsFile) {
            return [argument]
        }
        return this.getFileNamesFromDirectory(argument)
    }

    getFileNamesFromDirectory (directoryName) {
        const fileNames = fs.readdirSync(directoryName, 'utf8');
        return fileNames.filter(name => name.includes('.vm'))
    }

    getByteCodeFromFileNames (fileNames) {
        return fileNames.map((fileName) => {
            const fileContents = fs.readFileSync(fileName, 'utf8');
            return this.cleanUpFileContents(fileContents)
        })
    }

    cleanUpFileContents (fileContents) {
        return fileContents.split(/\r?\n/)
            .map(line => {
                const commentStart = line.indexOf('//')

                if (commentStart !== -1) {
                    return line.slice(0, commentStart)
                }

                return line
            })
            .map(line => line.trim())
            .filter(Boolean)
    }
}
