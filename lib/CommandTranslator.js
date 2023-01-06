import {
    incrementPointer,
    decrementPointer,
    setDToTheMOfA,
    pushTheDRegister,
    pushFalse,
    pushTrue,
    cleanSegment, popPointer, pushPointer, pushConstant
} from './utils.js';
import uniqid from 'uniqid';

export class CommandTranslator {
    eq() {
        const labelOne = uniqid()
        const labelTwo = uniqid()
        return[
            // Subtract the younger number from the older number
            ...this.sub(),

            // If the resulting number is zero, push true
            ...decrementPointer(),
            ...setDToTheMOfA(),
            '@PUSHTRUE' + labelOne,
            'D;JEQ',

            // Else push false.
            ...pushFalse(),
            '@DONE' + labelTwo,
            '0;JEQ',

            `(PUSHTRUE${labelOne})`,
            ...pushTrue(),

            `(DONE${labelTwo})`,
        ]
    }

    /**
     * Is the oldest stack number less than or equal to the youngest?
     */
    lt() {
        const labelOne = uniqid()
        const labelTwo = uniqid()
        return[
            ...this.sub(),

            // If the remainder is positive, push false
            ...decrementPointer(),
            ...setDToTheMOfA(),
            '@PUSHFALSE' + labelOne,
            'D;JGE',

            // Else push true
            ...pushTrue(),
            '@DONE' + labelTwo,
            '0;JEQ',

            `(PUSHFALSE${labelOne})`,
            ...pushFalse(),

            `(DONE${labelTwo})`
        ]
    }

    /**
     * Is the oldest stack number greater than the youngest?
     */
    gt() {
        const labelOne = uniqid()
        const labelTwo = uniqid()
        return [
            ...this.sub(),

            // If the remainder is positive, push true
            ...decrementPointer(),
            ...setDToTheMOfA(),
            '@PUSHTRUE' + labelOne,
            'D;JGT',

            // Else push false
            ...pushFalse(),
            '@DONE' + labelTwo,
            '0;JEQ',

            `(PUSHTRUE${labelOne})`,
            ...pushTrue(),

            `(DONE${labelTwo})`
        ]
    }


    label (label) {
        return [
            `(${label})`
        ]
    }

    ifGoTo (label) {
        return [
            ...decrementPointer(),
            ...setDToTheMOfA(),
            '@' + label,
            'D;JNE',
        ]
    }

    goto (label) {
        return [
            '@' + label,
            '0;JEQ'
        ]
    }

    functionDeclaration () {
        return [
            'bruh'
        ]
    }

    call () {
        return [
            'bruh'
        ]
    }

    returnFromFunction () {
        return [
            'bruh'
        ]
    }

    not() {
        return[
            '// not',
            ...decrementPointer(),
            'A=M',
            'M=!M',
            ...incrementPointer()
        ]
    }

    add() {
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
    sub() {
        return [
            ...decrementPointer(),
            ...setDToTheMOfA(),
            ...decrementPointer(),
            'A=M',
            'M=M-D',
            ...incrementPointer()
        ]
    }


    neg() {
        return[
            ...decrementPointer(),
            'A=M',
            'M=-M',
            ...incrementPointer()
        ]
    }

    and() {
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

    or() {
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

    pop(segment, number, inputFileName = 'fileNameNotProvided') {
        segment = cleanSegment(segment)

        if (segment === 'STATIC') {
            segment = inputFileName.split('.')[0] + "." + number
        }

        if (segment === 'POINTER') {
            return popPointer(number);
        }

        if (segment === 'CONSTANT') {
            throw new Error(
                `Popped Constant at command: pop ${segment} ${number}`
            )
        }

        return [
            // addr = segment + number
            '@' + segment,
            'D=M',
            '@' + number,
            'D=D+A',
            '@addr',
            'M=D',

            ...decrementPointer(),

            // *addr = *SP
            ...setDToTheMOfA(),
            '@addr',
            'A=M',
            'M=D',
        ]
    }

    push (segment, number, inputFileName = 'fileNameNotProvided') {
        segment = cleanSegment(segment)

        if (segment === 'STATIC') {
            segment = inputFileName.split('.')[0] + "." + number
        }

        if (segment === 'POINTER') {
            return pushPointer(number);
        }

        if (segment === 'CONSTANT') {
            return pushConstant(number);
        }

        return [
            // addr = segment + number,
            '@' + number,
            'D=A',
            '@' + segment,
            'D=D+M',
            '@addr',
            'M=D',

            // *SP = *add
            '@addr',
            ...setDToTheMOfA(),
            ...pushTheDRegister(),

            ...incrementPointer()
        ]
    }
}
