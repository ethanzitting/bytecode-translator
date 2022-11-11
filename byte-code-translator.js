import {
    decrementPointer,
    incrementPointer
} from './helpers/snippet-generators.js';

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

function translateAdd() {
    return [
        decrementPointer(),
        'A=M',
        'D=M',
        decrementPointer(),
        'A=M',
        'M=D+M',
        incrementPointer(),
    ]
}

export function translateByteCodeToAssembly(byteCode) {
    const assembly = [];

    for (const line of byteCode) {
        const [firstWord, secondWord] = line.split(' ')
        switch (firstWord) {
            case 'add':
                assembly.push(translateAdd())
                break;
            case 'sub':
                assembly.push(simpleReturn(line))
                break;
            case 'push':
                assembly.push(push[secondWord](line))
                break;
            case 'pop':
                assembly.push(pop[secondWord](line))
                break;
            default:
                throw new Error(`Error at command ${byteCode.indexOf(line)}: "${line}"`)
        }
    }

    return assembly.flat();
}
