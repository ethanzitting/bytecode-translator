export function cleanSegment(segment) {
    segment = segment.toUpperCase()

    if (segment === 'LOCAL') {
        return 'LCL'
    }

    if (segment === 'ARGUMENT') {
        return 'ARG'
    }

    return segment
}

export function popPointer(number) {
    return [
        ...decrementPointer(),

        // @segment = *sp
        '@SP',
        ...setDToTheMOfA(),
        '@' + (number == 0 ? 'THIS' : 'THAT'),
        'M=D'
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

export function addLineNumberComments(assembly) {
    let lineNumber = 0

    const lineLengths = assembly.map((line) => line.length)

    const longestLineLength = Math.max(...lineLengths)

    return assembly.map((line) => {
        if (line === '\n' || line.startsWith('//') || line.startsWith('(')) {
            // Line was empty or comment
            return line;
        }

        let x = longestLineLength - line.length

        line = line + (' ').repeat(x) + ' // ' + lineNumber

        lineNumber++

        return line
    })
}

export function indentNonJumpDestCode(assembly) {
    return assembly.map((line) => {
        if (line === '\n' || line.startsWith('(')) {
            return line;
        }

        return (' ').repeat(4) + line;
    })
}

/**
 * '@SP'
 * 'M=M+1'
 */
export function incrementPointer() {
    return [
        '@SP',
        'M=M+1'
    ]
}

/**
 * '@SP'
 * 'M=M-1
 */
export function decrementPointer() {
    return [
        '@SP',
        'M=M-1',
    ]
}

/**
 * '@SP'
 * 'A=M'
 * 'M=D,
 */
export function pushTheDRegister() {
    return [
        '@SP',
        'A=M',
        'M=D'
    ]
}

/**
 * 'A=M'
 * 'D=M'
 */
export function setDToTheMOfA() {
    return [
        'A=M',
        'D=M'
    ]
}

export function initializeSegments() {
    return [
        ...createVariable('SP', 256),
        ...createVariable('ARG', 400),
        ...createVariable('THIS', 3000),
        ...createVariable('THAT',3010),
        ...createVariable('TEMP', 5),
        ...createVariable('STATIC', 18),
    ];
}



export function createVariable(varName, value) {
    return [
        `// Initialize ${varName} to ${value}`,
        '@' + value,
        'D=A',
        '@' + varName,
        'M=D',
    ]
}

export function pushVariableOntoStack(variable) {
    return  [
        '@' + variable,
        ...setDToTheMOfA(),
        ...pushTheDRegister()
    ]
}

export function pushPointer(number) {
    return [
        // *sp = *@segment
        '@' + (number == 0 ? 'THIS' : 'THAT'),
        'D=M',
        ...pushTheDRegister(),
        ...incrementPointer()
    ];
}

export function pushConstant(number) {
    return [
        // Get the constant in D
        '@' + number,
        'D=A',

        // Assign the open stack cell to D
        ...pushTheDRegister(),
        ...incrementPointer()
    ]
}
