const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.text());
app.use(express.json());

app.get("/pets/:index",(req, res) => {
    const {index} = req.params;
    if ( index > 1 || index < 0 ){
        res.send(404);
    }
    console.log(typeof index)
    fs.readFile("pets.json", 'utf-8', (err, data) => {
    const parsedData = JSON.parse(data)
    res.json(parsedData[index]);
    }); 
}); 

app.listen(3000);