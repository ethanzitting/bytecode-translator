import {cleanSegment} from '../utils.js';

export function pop(segment, number, inputFileName = 'fileNameNotProvided') {
    segment = cleanSegment(segment)

    if (segment === 'STATIC') {
        segment = inputFileName.split('.')[0] + "." + number
    }

    if (segment === 'POINTER') {
        return popPointer(number);
    }

    if (segment === 'CONSTANT') {
        throw new Error(
            `Popped Constant at command: pop ${segment} ${number}`
        )
    }

    return [
        // addr = segment + number
        '@' + segment,
        'D=M',
        '@' + number,
        'D=D+A',
        '@addr',
        'M=D',

        // SP--
        '@SP',
        'M=M-1',

        // *addr = *SP
        'A=M',
        'D=M',
        '@addr',
        'A=M',
        'M=D',
    ]
}

function popPointer(number) {
    return [
        // sp--
        '@SP',
        'M=M-1',

        // @segment = *sp
        '@SP',
        'A=M',
        'D=M',
        '@' + (Number(number) === 0 ? 'THIS' : 'THAT'),
        'M=D'
    ]
}
