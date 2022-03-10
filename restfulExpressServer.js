const express = require("express");
const fs = require('fs');

const app = express();
app.use(express.json());

app.get("/pets", (req, res) => {
    fs.readFile('pets.json', "utf-8", (err, data) => {
    res.send(data);
    });
});
app.get("/pets/:index", (req, res) => {
    const {index} = req.params;
    const {age, kind, name } = req.body;
    if (index < 0 ){
        res.send(404);
    }
    fs.readFile("pets.json", 'utf-8', (err, data) => {
    const parsedData = JSON.parse(data)
  
        if (index > parsedData.length-1){
            res.status(404);
        }
    res.json(parsedData[index])
    }); 
});

app.post("/pets", (req, res) => {
    const {age, kind, name } = req.body;
    if (!age || !kind || !name){
        res.statusCode(400).send('Bad Request');
    }
    const newPet = {age, name, kind};
    fs.readFile('pets.json', "utf-8", (err, data) => {
        const parsedData = JSON.parse(data);
        parsedData.push(newPet);
        fs.writeFile("pets.json", JSON.stringify(parsedData), (err) => {
            if (err) {
                res.status(500).send();
            } else {
                res.status(201).send(newPet);
            }
        })
    });
});

app.patch("/pets/:index", (req,res) => {
    const {index} = req.params;
    const {age, kind, name } = req.body;
    if (index < 0 ){
        res.status(400).send('Bad Request');
    }
    const newPet = {age, name, kind};
    
    fs.readFile("pets.json", 'utf-8', (err, data) => {

        const parsedData = JSON.parse(data)
        
        parsedData[index] = Object.assign(parsedData[index], req.body)
   
        
        fs.writeFile("pets.json", JSON.stringify(parsedData), (err) => {
            if (err) {
                res.status(500).send();
            } else {
                res.send(JSON.stringify(parsedData[index]));

            }
        })
    }); 
});

app.delete("/pets/:index", (req,res) => {
    const {index} = req.params;
    const {age, kind, name } = req.body;

    fs.readFile('pets.json', "utf-8", (err, data) => {
        const parsedData = JSON.parse(data);
        
        parsedData.splice(index,1)

        fs.writeFile("pets.json", JSON.stringify(parsedData), (err) => {
            if (err) {
                res.status(500).send();
            } else {
                res.send(JSON.stringify(parsedData));
            }
        })
    });
});
// res.send(JSON.stringify(parsedData[index]));
app.listen(4000);