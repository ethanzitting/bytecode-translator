import {add, sub, pop, push} from './snippet-generators.js';

export function translateByteCodeToAssembly(inputFileName, byteCode) {
    const assembly = [];

    assembly.push([
        // Initialize @SP at 256
        '@256',
        'D=A',
        '@SP',
        'M=D',

        // Initialize @LCL to 300
        '@300',
        'D=A',
        '@LCL',
        'M=D',

        // Initialize @ARG to 400
        '@400',
        'D=A',
        '@ARG',
        'M=D',

        // Initialize @THIS to 3000
        '@3000',
        'D=A',
        '@THIS',
        'M=D',

        // Initialize @THAT to 3010
        '@3010',
        'D=A',
        '@THAT',
        'M=D',

        // Initialize @TEMP to 5
        '@5',
        'D=A',
        '@TEMP',
        'M=D',
    ])


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
                assembly.push(push(inputFileName, segment, number))
                break;
            case 'pop':
                assembly.push(pop(inputFileName, segment, number))
                break;
            default:
                throw new Error(`Error at command ${byteCode.indexOf(line)}: "${line}"`)
        }
    }

    return assembly.flat();
}
