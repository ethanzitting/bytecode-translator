const sp = '@SP';

export function push (segment, number) {
    if (segment.toUpperCase() === 'LOCAL') {
        segment = 'LCL'
    }

    if (segment.toUpperCase() === 'ARGUMENT') {
        segment = 'ARG'
    }

    if (segment.toUpperCase() === 'CONSTANT') {
        return [
            // Get the constant in D
            '@' + number,
            'D=A',

            // Assign the open stack cell to D
            sp,
            'A=M',
            'M=D',

            // Increment the stack pointer
            sp,
            'M=M+1'
        ]
    }

    return [
        // addr = segment + number,
        '@' + number,
        'D=A',
        '@' + segment.toUpperCase(),
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

export function pop(segment, number) {
    if (segment.toUpperCase() === 'LOCAL') {
        segment = 'LCL'
    }

    if (segment.toUpperCase() === 'ARGUMENT') {
        segment = 'ARG'
    }

    if (segment.toUpperCase() === 'CONSTANT') {
        throw new Error(
            `Popped Constant at command ${byteCode.indexOf(line)}: "${line}"`
        )
    }
    return [
        // addr = segment + number
        '@' + segment.toUpperCase(),
        'D=M',
        '@' + number,
        'D=D+A',
        '@addr',
        'M=D',

        // SP--
        sp,
        'M=M-1',

        // *addr = *SP
        'A=M',
        'D=M',
        '@addr',
        'A=M',
        'M=D',
    ]
}

export function add() {
    return [
        sp,
        'M=M-1',
        'A=M',
        'D=M',
        sp,
        'M=M-1',
        'A=M',
        'M=D+M',
        sp,
        'M=M+1'
    ]
}

export function sub() {
    return [
        sp,
        'M=M-1',
        'A=M',
        'D=M',
        sp,
        'M=M-1',
        'A=M',
        'M=M-D',
        sp,
        'M=M+1'
    ]
}
