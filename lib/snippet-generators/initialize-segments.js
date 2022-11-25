export function initializeSegments() {
    return [
        '// Initialize @SP at 256',
        '@256',
        'D=A',
        '@SP',
        'M=D',

        '// Initialize @LCL to 300',
        '@300',
        'D=A',
        '@LCL',
        'M=D',

        '// Initialize @ARG to 400',
        '@400',
        'D=A',
        '@ARG',
        'M=D',

        '// Initialize @THIS to 3000',
        '@3000',
        'D=A',
        '@THIS',
        'M=D',

        '// Initialize @THAT to 3010',
        '@3010',
        'D=A',
        '@THAT',
        'M=D',

        '// Initialize @TEMP to 5',
        '@5',
        'D=A',
        '@TEMP',
        'M=D',
    ];
}
