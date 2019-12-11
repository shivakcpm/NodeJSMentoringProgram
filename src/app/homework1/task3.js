import { csv } from 'csvtojson';
import path from 'path';
import fs from 'fs';
import util from 'util';
import { pipeline } from 'stream';

const csvPath = path.join(
    __dirname,
    '../../csv/node_mentoring_t1_2_input_example.csv'
);
const readStream = fs.createReadStream(csvPath);
const folderPath = path.join(__dirname, '../../output');

fs.exists(folderPath, isExist => {
    run(isExist).catch(console.error);
});

async function run(isPathExist) {
    const mkdir = util.promisify(fs.mkdir);
    if (!isPathExist) {
        await mkdir(folderPath);
    }
    const textPath = path.join(
        folderPath,
        '/node_mentoring_t1_2_input_example.txt'
    );
    const writeStream = fs.createWriteStream(textPath);
    const pipelinePromise = util.promisify(pipeline);

    await pipelinePromise(readStream, csv(), writeStream);
    console.log('Pipeline succeeded.');
}
