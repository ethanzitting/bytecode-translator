import fs from 'fs';

export function writeAssemblyToFile(assembly, fileName) {
    const fileReadyAssembly = assembly.join('\n')
        .trim() + '\n';

    fs.writeFile(fileName, fileReadyAssembly, err => {
        if (err) {
            console.error(err);
        }
    });
}

export function getOutputNameFromInput(fileName) {
    return fileName.trim()
        .split('.')
        [0] + '.asm'
}
