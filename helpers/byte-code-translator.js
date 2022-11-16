import {add, sub, pop, push} from './snippet-generators.js';

export function translateByteCodeToAssembly(byteCode) {
    const assembly = [];

    for (const line of byteCode) {
        assembly.push('\n')
        assembly.push('// ' + line);

        const [command, segment, number] = line.split(' ')

        switch (command) {
            case 'add':
                assembly.push(add())
                break;
            case 'sub':
                assembly.push(sub())
                break;
            case 'push':
                assembly.push(push(segment, number))
                break;
            case 'pop':
                assembly.push(pop(segment, number))
                break;
            default:
                throw new Error(`Error at command ${byteCode.indexOf(line)}: "${line}"`)
        }
    }

    return assembly.flat();
}
