import {push} from './push.js';

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

export function eq() {
    const randOne = Math.floor((Math.random() * 10000))
    const randTwo = Math.floor((Math.random() * 10000))
    return[
        // There are two numbers in the stack already.
        // Subtract the youngest from the oldest.
        ...sub(),

        // If the resulting number is zero, push 1
        '@SP',
        'M=M-1',
        'A=M',
        'D=M',
        '@PUSHTRUE' + randOne,
        'D;JEQ',

        // Else pop 0.
        ...push('constant', '0'),
        '@DONE' + randTwo,
        '0;JEQ',

        `(PUSHTRUE${randOne})`,
        ...push('constant', '-1'),

        `(DONE${randTwo})`,
    ]
}

export function lt() {
    const randOne = Math.floor((Math.random() * 10000))
    const randTwo = Math.floor((Math.random() * 10000))
    return[
        // There are two numbers in the stack.
        // Is first lt second?
        // Subtract the youngest number from the oldest
        ...sub(),

        // If the remainder is positive, push true
        '@SP',
        'A=M',
        'D=M',
        '@PUSHTRUE' + randOne,
        'D;JGT',

        // Else push false
        ...push('constant', '0'),
        '@DONE' + randTwo,
        '0;JEQ',

        `(PUSHTRUE${randOne})`,
        ...push('constant', '-1'),

        `(DONE${randTwo})`
    ]
}

export function gt() {
    const randOne = Math.floor((Math.random() * 10000))
    const randTwo = Math.floor((Math.random() * 10000))
    return [
        // There are two numbers in the stack.
        // Is first gt second?
        // Subtract the youngest number from the oldest
        ...sub(),

        // If the remainder is positive, push false
        '@SP',
        'A=M',
        'D=M',
        '@PUSHFALSE' + randOne,
        'D;JLT',

        // Else push true
        ...push('constant', '-1'),
        '@DONE' + randTwo,
        '0;JEQ',

        `(PUSHFALSE${randOne})`,
        ...push('constant', '0'),

        `(DONE${randTwo})`
    ]
}

export function neg() {
    return[
        '@SP',
        'M=M-1',
        'A=M',
        'M=-M',
        '@SP',
        'M=M+1'
    ]
}

export function and() {
    return[
        '@SP',
        'M=M-1',
        'A=M',
        'D=M',
        '@SP',
        'M=M-1',
        'A=M',
        'M=D&M',
        '@SP',
        'M=M+1'
    ]
}

export function or() {
    return[
        '@SP',
        'M=M-1',
        'A=M',
        'D=M',
        '@SP',
        'M=M-1',
        'A=M',
        'M=D|M',
        '@SP',
        'M=M+1'
    ]
}

export function not() {
    return[
        '@SP',
        'M=M-1',
        'A=M',
        'M=!M',
        '@SP',
        'M=M+1'
    ]
}
