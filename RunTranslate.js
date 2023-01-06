import {translate} from './lib/Translate.js';

async function main () {
    try {
        const providedName = process.argv[2];

        translate(providedName);
    } catch (err) {
        console.error(err)
    }
}

main();
