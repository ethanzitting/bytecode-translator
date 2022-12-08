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
