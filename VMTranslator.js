const fs = require('fs');



function simpleReturn(line) {
    return line.toUpperCase()
}

const push = {
    constant: simpleReturn,
    argument: simpleReturn,
    that: simpleReturn,
    local: simpleReturn,
    temp: simpleReturn,
    this: simpleReturn
}

const pop = {
    constant: simpleReturn,
    argument: simpleReturn,
    that: simpleReturn,
    local: simpleReturn,
    temp: simpleReturn,
    this: simpleReturn
}

try {
    const inputFileName = process.argv[2];
    const byteCode = getByteCodeFromFileName(inputFileName);

    console.log(byteCode)

    const assembly = translateByteCodeToAssembly(byteCode);

    console.log(assembly)
} catch (err) {
    console.error(err);
}

function translateByteCodeToAssembly(byteCode) {
    return byteCode.map((line) => {
        const [firstWord, secondWord] = line.split(' ')
        switch (firstWord) {
            case 'add':
                return simpleReturn(line)
            case 'sub':
                return simpleReturn(line)
            case 'push':
                return push[secondWord](line)
            case 'pop':
                return pop[secondWord](line)
            default:
                return console.log('Error: ' + line);
        }
    })
}

function getByteCodeFromFileName(fileName) {
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
