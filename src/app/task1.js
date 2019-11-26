const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

   function promptQuestion(){
    readline.question('enter input : ', async function (result) {
     await readline.write('\033[1A' + result.split("").reverse().join(""));
     // readline.close();
        promptQuestion();
    });
  
}
promptQuestion();