const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here


app.get("/mario", async (req, res) => {
    const mario = await marioModel.find()
    res.send(mario)
})


app.get("/mario/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await marioModel.find({ _id: id })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

app.post("/mario", async (req, res) => {
    try {
        const mariochar = await marioModel.create({
            name: req.body.name,
            weight: req.body.weight
        })
        res.status(201).send("success")
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

app.patch("/mario/:id", async (req, res) => {
    try {
        const id = req.params.id
        const update = await marioModel.updateOne({ _id: id }, { $set: { name: req.body.name , weight:req.body.weight} })
        res.send("success")
    } catch (error) {
        res.send({ message: error.message })
    }

})

app.delete("/mario/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const del = await marioModel.deleteOne({ _id: id });
        res.status(200).send({ message: 'character deleted' });
    } catch (error) {
        req.status(400).send({ message: error.message });
    }
})

module.exports = app;