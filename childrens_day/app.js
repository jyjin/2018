const exec = require('child_process').exec;

let cmd = `http-server -p 6161`
console.log(`Run [ ${cmd} ] ...`)
exec(cmd, null, (err, stderr, stdout) => {
    if (err || stderr) {
        console.log(`[ ERROR in run '${cmd}']`, err || stderr)
        return
    }
    console.log('success!')
})