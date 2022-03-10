const express = require('express');
const fs = require('fs');
const { Pool } = require("pg");

const pool = new Pool({
    database: "PETSHOP"
});

const port = 3000; 
const app = express();

app.use(express.text());
app.use(express.json());


const petID = "3; SELECT * FROM users";



app.get("/pets/:index",(req, res) => {
    const index = req.params.index;
  pool.query('SELECT * FROM pets ORDER by id = $1', [index],  (err, result) => {
      if (err){
          throw err; 
      } else {
          res.status(200).send(result.rows)
      }
})
});

app.post('/pets', (req, res) => {
    const {age, name , kind} = req.body
    pool.query( "INSERT INTO pets(age, name, kind) VALUES ($1, $2, $3) RETURNING *;", [age, name, kind], (err, result) => {
            if (err) {
                throw err;
            } else {
                res.status(201).send(result.rows[0])
            }
            });
            res.status(404).send("Missing parameters");
        });

app.patch("/pets/:index",  (req, res) => {
    const id = req.params.index
    const {age, name, kind } = req.body;
    const query = `
    UPDATE pets SET
    age = COALESCE($1, age),
    name = COALESCE($2, name),
    kind = COALESCE($3, kind),
    WHERE id = $4
    RETURNING *
    `;
    pool.query(query, [age, name, kind, id], (err, results) => {
        if (err) {
            throw err;
        } else {
            if (result.rows.length === 0){
                res.status(404).send("pets not found")
            } else {
                res.status(200).json(result.rows[0]);
            }
        }
    });
});



app.delete("/pets/:index", (req,res) => {
    const index = req.params.index;
    if (index != undefined){
        pool.query("DELETE FROM pets WHERE id = $1", [index], (err, result) => {
            res.send(index + "index deleted");
            if(err){
                res.status(400)
                res.send('URL MUST INCLUDE VALID INDEX')
            }
        });
    }
});

app.listen( port, () => {
    console.log(`listening on port ${port}`);
})