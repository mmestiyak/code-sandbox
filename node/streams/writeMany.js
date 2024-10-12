const fs = require('node:fs/promises');
const fsDefault = require('node:fs');

// ===============================================
// Method 1: `fs.appendFile` for Direct Line Writing
// ===============================================
// Time: ~3 minutes 30 seconds
// - Opens, writes, and closes the file for each line, causing inefficiency due to repeated file system access.
// - Simple to use, but overhead per operation accumulates significantly.
// ===============================================

// (async () => {
//     try {
//         console.time('writeMany');
//         for (let i = 0; i <= 1000000; i++) {
//             await fs.appendFile('./million.txt', 'I am line number ' + i + '\n');
//         }
//         console.timeEnd('writeMany');
//     } catch (e) {
//         console.log(e);
//     }
// })();


// ===============================================
// Method 2: `fileHandle.writeFile` with Open Handle
// ===============================================
// Time: ~40.888 seconds
// - Opens a single file handle for reuse, eliminating the overhead of repeated opens/closes.
// - Still writes line by line but is faster than Method 1.
// ===============================================

// (async () => {
//     try {
//         console.time('writeMany');
//         const fileHandler = await fs.open('./million.txt', 'w');
//         for (let i = 0; i <= 1000000; i++) {
//             await fileHandler.writeFile('I am line number ' + i + '\n');
//         }
//         console.timeEnd('writeMany');
//     } catch (e) {
//         console.log(e);
//     }
// })();


// ===============================================
// Method 3: Synchronous Writing with `fs.writeSync`
// ===============================================
// Time: ~11.224 seconds
// - Opens file once and performs synchronous writes, reducing overhead compared to Method 1.
// ===============================================

(() => {
    try {
        fsDefault.open('./million.txt', 'w', (err, fd) => {
            if (err) return console.log(err);

            console.time('writeMany');
            for (let i = 0; i <= 1000000; i++) {
                fsDefault.writeSync(fd, 'I am line number ' + i + '\n');
            }
            fsDefault.close(fd, (err) => {
                if (err) return console.log(err);
                console.log('File closed successfully.');
            });
            console.timeEnd('writeMany');
        });
    } catch (e) {
        console.log(e);
    }
})();


// ===============================================
// Method 4: Accumulated Content in Memory
// ===============================================
// Time: ~7.944 seconds
// - Accumulates content in a variable and writes in a single operation, minimizing file I/O.
// ===============================================

// (async () => {
//     try {
//         console.time('writeMany');
//         const fileHandler = await fs.open('./million.txt', 'w');
//         let content = '';
//         for (let i = 0; i <= 1000000; i++) {
//             content += ('I am line number ' + i + '\n');
//         }
//         await fileHandler.writeFile(content);
//         console.timeEnd('writeMany');
//     } catch (e) {
//         console.log(e);
//     }
// })();


// ===============================================
// Method 5: Writing with Streams
// ===============================================
// Time: ~7.637 seconds
// - Utilizes streams for efficient writing, suitable for large datasets, minimizing memory usage.
// ===============================================

// (async () => {
//     try {
//         console.time('writeMany');
//         const fileHandler = await fs.open('./million.txt', 'w');
//         const stream = fileHandler.createWriteStream();
//         for (let i = 0; i <= 1000000; i++) {
//             stream.write('I am line number ' + i + '\n');
//         }
//         stream.end();
//         stream.on('finish', () => {
//             console.timeEnd('writeMany');
//             console.log('File written successfully using streams.');
//         });
//     } catch (e) {
//         console.log(e);
//     }
// })();
