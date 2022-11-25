export function push (inputFileName, segment, number) {
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

export function pop(inputFileName, segment, number) {
    segment = cleanSegment(segment)

    if (segment === 'STATIC') {
        segment = inputFileName.split('.')[0] + "." + number
    }

    if (segment === 'POINTER') {
        return popPointer(number);
    }

    if (segment === 'CONSTANT') {
        throw new Error(
            `Popped Constant at command ${byteCode.indexOf(line)}: "${line}"`
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

export function add() {
    return [
        '@SP',
        'M=M-1',
        'A=M',
        'D=M',
        '@SP',
        'M=M-1',
        'A=M',
        'M=D+M',
        '@SP',
        'M=M+1'
    ]
}

export function sub() {
    return [
        '@SP',
        'M=M-1',
        'A=M',
        'D=M',
        '@SP',
        'M=M-1',
        'A=M',
        'M=M-D',
        '@SP',
        'M=M+1'
    ]
}

function cleanSegment(segment) {
    segment = segment.toUpperCase()

    if (segment === 'LOCAL') {
        segment = 'LCL'
    }

    if (segment === 'ARGUMENT') {
        segment = 'ARG'
    }

    return segment
}
