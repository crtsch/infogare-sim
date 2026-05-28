import express from 'express';
import {initDB, getDB} from './db.js';
import path from 'path';


const app = express();
const port = 3000;


app.use(express.json());
app.use(express.static('public'));


await initDB();

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), "views", "main.html"));
})

app.get('/departs', (req, res) => {
    res.sendFile(path.join(process.cwd(), "views", "departs.html"));
})

app.get('/arrivees', (req, res) => {
    res.sendFile(path.join(process.cwd(), "views", "arrivees.html"));
})

app.get('/flash', (req, res) => {
    res.sendFile(path.join(process.cwd(), "views", "flash.html"));
})


app.listen(port, () => {
    console.log(`Serveur lancé. https://localhost:${port}`)
})