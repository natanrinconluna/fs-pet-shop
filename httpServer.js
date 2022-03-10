
const http = require("http");
const port = process.env.PORT || 8080
const fs = require("fs");
const DATA_PATH = 'pets.json';
const petRegExp = /^\/pets\/(.*)$/;



const server = http.createServer((req, res) =>{
    if (req.method === "GET" && req.url === "/pets"){
    // if(req.method === "GET" && petRegExp.test(req.url)){
        // const index = req.url.match(petRegExp)[1];
        // console.log(index);
    fs.readFile(DATA_PATH, 'utf-8', (err,data) =>{
        const parsedData = JSON.parse(data)
        if(err){
        res.statusCode = 500;
        res.statusMessage = "problem reading pets.json file";
        res.end();
        } else {
        res.setHeader("Content-Type", "application/json");
        res.write(data);
        // res.write(JSON.stringify(parsedData[index]))
        res.end();
        }
    });
    }
    if(req.method === "GET" && req.url === "/pets/0"){
        fs.readFile(DATA_PATH, 'utf-8', (err,data) =>{
        if(err){
            res.statusCode = 500;
            res.statusMessage = "problem reading pets.json file";
            res.end();
            } else {
            res.setHeader("Content-Type", "application/json");
            const parsedDatas= JSON.parse(data)
            res.write(JSON.stringify(parsedDatas[0]));
            // res.write(JSON.stringify(parsedData[index]))
            res.end();
            }
        });
        }
        if(req.method === "GET" && req.url === "/pets/1"){
            fs.readFile(DATA_PATH, 'utf-8', (err,data) =>{
            if(err){
                res.statusCode = 500;
                res.statusMessage = "problem reading pets.json file";
                res.end();
                } else {
                res.setHeader("Content-Type", "application/json");
                const parsedDatass= JSON.parse(data)
                res.write(JSON.stringify(parsedDatass[1]));
                // res.write(JSON.stringify(parsedData[index]))
                res.end();
                }
            });
            }
            if(req.method === "GET" && req.url === "/pets/2"){
                fs.readFile(DATA_PATH, 'utf-8', (err,data) =>{
                if(err){
                res.statusCode = 500;
                res.statusMessage = "problem reading pets.json file";
                res.end();
                } else {
                res.statusCode = 404;
                res.setHeader("Content-Type", "text/plain");
                res.write(`Not Found`);
                // res.write(JSON.stringify(parsedData[index]))
                res.end();
                }
                });
                }
                if(req.method === "GET" && req.url === "/pets/-1"){
                    fs.readFile(DATA_PATH, 'utf-8', (err,data) =>{
                    if(err){
                    res.statusCode = 500;
                    res.statusMessage = "problem reading pets.json file";
                    res.end();
                    } else {
                    res.statusCode = 404;
                    res.setHeader("Content-Type", "text/plain");
                    res.write(`Not Found`);
                    // res.write(JSON.stringify(parsedData[index]))
                    res.end();
                    }
                    });
                    }
});
server.listen(port, function() {
console.log('Listening on port', port);
});