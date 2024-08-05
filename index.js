const express = require('express');
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "redux_server"
})


app.get("/books", (req, res) =>{
    const sql = "SELECT * FROM books";
    db.query(sql, (err, data)=>{
        if(err) return res.json("Error");
        return res.json(data)
    })
})

app.post("/books", (req, res) => {
    const values = [
        req.body.title,
        req.body.author,
    ];

    const sql = "INSERT INTO books (title, author) VALUES (?, ?)";

    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.put('/books/:id', (req, res) => {
    const id = req.params.id;
    const { title, author } = req.body;

    const sql = 'UPDATE books SET title = ?, author = ? WHERE id = ?';
    db.query(sql, [title, author, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


app.delete("/books/:id", (req, res) =>{
    const id = req.params.id;

    const sql = "DELETE FROM books WHERE id=?";

    db.query(sql, [id], (err, data)=>{
        if (err) return res.json(err);
        return res.json(data);
    })
})



app.listen(port, ()=>{
    console.log(`Dashboard is running port ${port}`)
})