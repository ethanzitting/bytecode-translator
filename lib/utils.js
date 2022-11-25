export function cleanSegment(segment) {
    segment = segment.toUpperCase()

    if (segment === 'LOCAL') {
        segment = 'LCL'
    }

    if (segment === 'ARGUMENT') {
        segment = 'ARG'
    }

    return segment
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
