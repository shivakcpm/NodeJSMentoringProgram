import {csv} from 'csvtojson';
import  path from 'path';
import  fs from 'fs';
import  util from 'util';
import {pipeline} from 'stream';

const csvPath =  path.join(__dirname, "../csv/node_mentoring_t1_2_input_example.csv");
const readStream=fs.createReadStream(csvPath);

const textPath =  path.join(__dirname, "../output/node_mentoring_t1_2_input_example1.txt");
const writeStream = fs.createWriteStream(textPath);

async function readFile() {
    readStream.pipe(csv()).pipe(writeStream).on('error',(err)=>{
      console.log(err)
    })
}

const pipelinePromise = util.promisify(pipeline);

async function run() {
  await pipelinePromise(
    readStream,
    csv(),
    writeStream
  );
  console.log('Pipeline succeeded.');
}

run().catch(console.error);

readFile();
