import {cleanSegment} from '../utils.js';
import {decrementPointer, setDToTheMOfA} from './utils.js';

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

        ...decrementPointer(),

        // *addr = *SP
        ...setDToTheMOfA(),
        '@addr',
        'A=M',
        'M=D',
    ]
}

function popPointer(number) {
    return [
        ...decrementPointer(),

        // @segment = *sp
        '@SP',
        ...setDToTheMOfA(),
        '@' + (Number(number) === 0 ? 'THIS' : 'THAT'),
        'M=D'
    ]
}
