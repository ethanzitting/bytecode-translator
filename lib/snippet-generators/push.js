import {cleanSegment} from '../utils.js';
import {incrementPointer, pushTheDRegister, setDToTheMOfA} from './utils.js';

export function push (segment, number, inputFileName = 'fileNameNotProvided') {
    segment = cleanSegment(segment)

    if (segment === 'STATIC') {
        segment = inputFileName.split('.')[0] + "." + number
    }

    if (segment === 'POINTER') {
        return pushPointer(number);
    }

    if (segment === 'CONSTANT') {
        return pushConstant(number);
    }

    return [
        // addr = segment + number,
        '@' + number,
        'D=A',
        '@' + segment,
        'D=D+M',
        '@addr',
        'M=D',

        // *SP = *add
        '@addr',
        ...setDToTheMOfA(),
        ...pushTheDRegister(),

        ...incrementPointer()
    ]
}

export function pushVariableOntoStack(variable) {
    return  [
        '@' + variable,
        ...setDToTheMOfA(),
        ...pushTheDRegister()
    ]
}

function pushPointer(number) {
    return [
        // *sp = *@segment
        '@' + (Number(number) === 0 ? 'THIS' : 'THAT'),
        'D=M',
        ...pushTheDRegister(),

        ...incrementPointer()
    ];
}

function pushConstant(number) {
    return [
        // Get the constant in D
        '@' + number,
        'D=A',

        // Assign the open stack cell to D
        ...pushTheDRegister(),

        ...incrementPointer()
    ]
}

export function pushTrue() {
    return [
        '@SP',
        'A=M',
        'M=-1',
        ...incrementPointer(),
    ]
}

export function pushFalse() {
    return [
        '@SP',
        'A=M',
        'M=0',
        ...incrementPointer(),
    ]
}
