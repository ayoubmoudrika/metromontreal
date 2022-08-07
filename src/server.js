import express from 'express';
import metrosRouter from "./backend/router/MetroRouter.js";
import path from 'path';
import {fileURLToPath} from 'url';
import { renderFile } from 'ejs';
import mariadb from 'mariadb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();


app.set('views', __dirname + '/frontend/views/');
app.engine('html', renderFile);
app.set('view engine', 'ejs');

app.use("/src/", express.static(__dirname));

app.use(express.json());
app.use(express.urlencoded());

function routes() {
    let router = express.Router();

    router.get('/', (req, res) => {
        res.redirect('/metromtl/v1/metrosPage');
    });

    app.use('/', router);  // routage de base
    app.use('/', metrosRouter.metroRouter);

}

const pool = mariadb.createPool({
    host:'localhost',
    user:'root',
    password:'admin',
    database:'metromtl'
});

app.listen(5000, async function () {
    console.log("Database is loaded.")
    routes();
    console.log('Node server is running.');
});

export default pool;