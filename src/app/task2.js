const csv = require("csvtojson");
const path = require('path');
const fs = require('fs');
const util = require('util');
const { pipeline } = require('stream');

const csvPath =  path.join(__dirname, "../csv/node_mentoring_t1_2_input_example.csv");
const readStream=fs.createReadStream(csvPath);

const textPath =  path.join(__dirname, "../output/node_mentoring_t1_2_input_example.txt");
const writeStream = fs.createWriteStream(textPath);


const pipelinePromise = util.promisify(pipeline);

/* 
async function readFile() {
    readStream.pipe(csv()).pipe(writeStream).on('error',(err)=>{
      console.log(err)
    })
}
 */

async function run() {
  await pipelinePromise(
    readStream,
    csv(),
    writeStream
  );
  console.log('Pipeline succeeded.');
}

run().catch(console.error);


