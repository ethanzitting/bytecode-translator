import fs from 'fs';

export function getByteCodeFromFileName(fileName) {
    const fileContents = fs.readFileSync(fileName, 'utf8');
    return cleanUpFileContents(fileContents)
}

function cleanUpFileContents(fileContents) {
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
