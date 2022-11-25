import {
    add,
    and,
    eq,
    gt,
    lt,
    neg,
    not,
    or,
    sub
} from './snippet-generators/arithmetics.js'
import {pop} from './snippet-generators/pop.js'
import {push} from './snippet-generators/push.js'
import {initializeSegments} from './snippet-generators/initialize-segments.js';
import {addLineNumberComments, indentNonJumpDestCode} from './utils.js';

export function translateByteCodeToAssembly(inputFileName, byteCode) {
    let assembly = [];

    assembly.push('// ' + inputFileName.split('.')[0] + '.asm')

    assembly.push(initializeSegments())

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
                assembly.push(push(segment, number, inputFileName))
                break;
            case 'pop':
                assembly.push(pop(segment, number, inputFileName))
                break;
            case 'eq':
                assembly.push(eq())
                break;
            case 'lt':
                assembly.push(lt())
                break;
            case 'gt':
                assembly.push(gt())
                break;
            case 'neg':
                assembly.push(neg())
                break;
            case 'and':
                assembly.push(and())
                break;
            case 'or':
                assembly.push(or())
                break;
            case 'not':
                assembly.push(not())
                break;
            default:
                throw new Error(`Error at command ${byteCode.indexOf(line)}: "${line}"`)
        }
    }

    assembly = assembly.flat();

    assembly = addLineNumberComments(assembly)

    return indentNonJumpDestCode(assembly);
}
