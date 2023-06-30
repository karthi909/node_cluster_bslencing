const express = require('express');

const port = 3001;
const app = express();

app.get("/heavy", (req, res)=>{
    let total = 0;
    for(let i=0; i< 50_000_000; i++){
        total++
    };

    res.send(`The result of the CPU intensive task is ${total}`)
});

app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
    console.log(`wroekr PID - ${process.pid}`)
})