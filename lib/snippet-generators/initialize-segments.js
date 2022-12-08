export function initializeSegments() {
    return [
        ...createVariable('SP', 256),
        ...createVariable('ARG', 400),
        ...createVariable('THIS', 3000),
        ...createVariable('THAT',3010),
        ...createVariable('TEMP', 5),
    ];
}

function createVariable(varName, value) {
    return [
        `// Initialize ${varName} to ${value}`,
        '@' + value,
        'D=A',
        '@' + varName,
        'M=D',
    ]
}
