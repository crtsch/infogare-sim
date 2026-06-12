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

app.get('/customflash', (req, res) => {
    res.sendFile(path.join(process.cwd(), "views", "flash-custom.html"));
})

app.get('/trains', async (req, res) => {
    const db = await getDB();
    const trains = await db.all(`SELECT * FROM trajets ORDER BY horaire`);
    return res.status(200).json(trains);
})

app.get('/typestrains', async (req, res) => {
    const db = await getDB();
    const trains = await db.all(`SELECT * FROM typestrains`);
    return res.status(200).json(trains);
})

app.get('/flashmsg', async (req, res) => {
    const db = await getDB();
    const trains = await db.all(`SELECT * FROM flash`);
    return res.status(200).json(trains);
})


app.listen(port, () => {
    console.log(`Serveur lancé. https://localhost:${port}`)
})