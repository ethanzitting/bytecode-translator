export function push (segment, number) {
    if (segment.toUpperCase() === 'LOCAL') {
        segment = 'LCL'
    }

    if (segment.toUpperCase() === 'ARGUMENT') {
        segment = 'ARG'
    }

    if (segment.toUpperCase() === 'CONSTANT') {
        return [
            '@' + number,
            'D=A',
            '@SP',
            'A=M',
            'M=D',
            '@SP',
            'M=M+1'
        ]
    }

    return [
        // addr=segment+number,
        '@' + number,
        'D=A',
        '@' + segment.toUpperCase(),
        'A=M',
        'D=D+A',
        '@addr',
        'M=D',

        // SP--,
        '@SP',
        'M=M-1',

        // *addr=*SP
        'A=M',
        'D=M',
        '@addr',
        'A=M',
        'M=D'
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
        // @(segment + number),
        '@' + number,
        'D=A',
        '@' + segment.toUpperCase(),
        'A=M',
        'A=D+A',

        // *SP=*addr
        'D=M',
        '@SP',
        'A=M',
        'M=D',

        // SP++,
        '@SP',
        'M=M+1'
    ]
}

export function add() {
    return [
        '@SP',
        'M=M-1',
        'A=M',
        'D=M',
        'A=A-1',
        'M=D+M'
    ]
}

export function sub() {
    return [
        '@SP',
        'M=M-1',
        'A=M',
        'D=M',
        'A=A-1',
        'M=D-M'
    ]
}
