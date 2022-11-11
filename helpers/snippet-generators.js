export function incrementPointer() {
    return [
        '@sp',
        'M=M+1'
    ].join('\n')
}

export function decrementPointer() {
    return [
        '@sp',
        'M=M-1'
    ].join('\n')
}
