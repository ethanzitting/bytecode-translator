import {pushFalse, pushTrue} from './push.js';
import {decrementPointer, incrementPointer, setDToTheMOfA} from './utils.js';

export function add() {
    return [
        ...decrementPointer(),
        ...setDToTheMOfA(),
        ...decrementPointer(),
        'A=M',
        'M=D+M',
        ...incrementPointer()
    ]
}

/**
 * Subtract the younger number from the older number
 */
export function sub() {
    return [
        ...decrementPointer(),
        ...setDToTheMOfA(),
        ...decrementPointer(),
        'A=M',
        'M=M-D',
        ...incrementPointer()
    ]
}

export function eq() {
    const randOne = Math.floor((Math.random() * 10000))
    const randTwo = Math.floor((Math.random() * 10000))
    return[
        // Subtract the younger number from the older number
        ...sub(),

        // If the resulting number is zero, push true
        ...decrementPointer(),
        ...setDToTheMOfA(),
        '@PUSHTRUE' + randOne,
        'D;JEQ',

        // Else push false.
        ...pushFalse(),
        '@DONE' + randTwo,
        '0;JEQ',

        `(PUSHTRUE${randOne})`,
        ...pushTrue(),

        `(DONE${randTwo})`,
    ]
}

/**
 * Is the oldest stack number less than or equal to the youngest?
 */
export function lt() {
    const randOne = Math.floor((Math.random() * 10000))
    const randTwo = Math.floor((Math.random() * 10000))
    return[
        ...sub(),

        // If the remainder is positive, push false
        ...decrementPointer(),
        ...setDToTheMOfA(),
        '@PUSHFALSE' + randOne,
        'D;JGE',

        // Else push true
        ...pushTrue(),
        '@DONE' + randTwo,
        '0;JEQ',

        `(PUSHFALSE${randOne})`,
        ...pushFalse(),

        `(DONE${randTwo})`
    ]
}

/**
 * Is the oldest stack number greater than the youngest?
 */
export function gt() {
    const randOne = Math.floor((Math.random() * 10000))
    const randTwo = Math.floor((Math.random() * 10000))
    return [
        ...sub(),

        // If the remainder is positive, push true
        ...decrementPointer(),
        ...setDToTheMOfA(),
        '@PUSHTRUE' + randOne,
        'D;JGT',

        // Else push false
        ...pushFalse(),
        '@DONE' + randTwo,
        '0;JEQ',

        `(PUSHTRUE${randOne})`,
        ...pushTrue(),

        `(DONE${randTwo})`
    ]
}

export function neg() {
    return[
        ...decrementPointer(),
        'A=M',
        'M=-M',
        ...incrementPointer()
    ]
}

export function and() {
    return[
        '// and',
        ...decrementPointer(),
        ...setDToTheMOfA(),
        ...decrementPointer(),
        'A=M',
        'M=D&M',
        ...incrementPointer()
    ]
}

export function or() {
    return[
        '// or',
        ...decrementPointer(),
        ...setDToTheMOfA(),
        ...decrementPointer(),
        'A=M',
        'M=D|M',
        ...incrementPointer()
    ]
}

export function not() {
    return[
        '// not',
        ...decrementPointer(),
        'A=M',
        'M=!M',
        ...incrementPointer()
    ]
}
