const cluster = require('cluster');
const os = require('os');
const path = require('path');
let {dirname} =require('path');
let {fileURLToPath} = require('url');

var _dirname = path.join(__dirname,'app.js')
console.log(_dirname)
//console.log(import.meta.url);
const cpuCount = os.cpus().length;

console.log(`The total number of CPUs is ${cpuCount}`);
console.log(`primary pid= ${process.pid}`);

cluster.setupPrimary({
    exec: _dirname
});

for(let i=0; i < cpuCount; i++){
    cluster.fork();
}

cluster.on('exit', (worker, code, signal)=>{
    console.log(`worker ${worker.process.pid} has been killed`);
    console.log("Starting another worker");
    cluster.fork();
});