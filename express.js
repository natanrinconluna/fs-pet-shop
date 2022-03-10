const express = require('express');
const fs = require('fs');
const { Pool } = require("pg");

const pool = new Pool({
    database: "PETSHOP"
});

const port = 4000; 
const app = express();

app.use(express.text());
app.use(express.json());


const petID = "3; SELECT * FROM users";


app.get("/pets/",(req, res) => {
    const {index} = req.params;
    if ( index > 1 || index < 0 ){
        res.send(404);
    }
    fs.readFile("pets.json", 'utf-8', (err, data) => {
        const parsedData = JSON.parse(data)
        res.json(parsedData);
    }); 
});


app.get("/pets/:index",(req, res) => {
    const {index} = req.params;
    if ( index > 1 || index < 0 ){
        res.send(404);
    }
    fs.readFile("pets.json", 'utf-8', (err, data) => {
    const parsedData = JSON.parse(data)
    res.json(parsedData[index]);
    }); 
});
app.listen( port, () => {
    console.log(`listening on port ${port}`);
})