import {cleanSegment} from '../utils.js';

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
        'A=M',
        'D=M',
        '@SP',
        'A=M',
        'M=D',

        // SP++
        '@SP',
        'M=M+1'
    ]
}

function pushPointer(number) {
    return [
        // *sp = *@segment
        '@' + (Number(number) === 0 ? 'THIS' : 'THAT'),
        'D=M',
        '@SP',
        'A=M',
        'M=D',

        // sp++
        '@SP',
        'M=M+1'
    ];
}

function pushConstant(number) {
    return [
        // Get the constant in D
        '@' + number,
        'D=A',

        // Assign the open stack cell to D
        '@SP',
        'A=M',
        'M=D',

        // Increment the stack pointer
        '@SP',
        'M=M+1'
    ]
}
