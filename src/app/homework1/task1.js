
process.stdin.on('data', (result) => {
    process.stdout.write(
        `${result.toString()
            .split('')
            .reverse()
            .join('')  }\n`
    );
});

