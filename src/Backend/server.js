import metrosRouter from "./Router/MetroRouter.js";
import path from 'path';
import {fileURLToPath} from 'url';

const express = require("express");
const mariadb = require("mariadb");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();


app.set('views', __dirname + '/front-end/views/');
app.engine('html', renderFile);
app.set('view engine', 'ejs');

app.use("/src/", express.static(__dirname));

app.use(express.json());
app.use(express.urlencoded());
function routes() {
    let router = express.Router();

    router.get('/', (req, res, next) => {
        res.redirect('/gti525/v1/pageCompteurs');
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

const server = app.listen(5000, async function () {
    console.log("dataBase is loaded")
    routes();
    console.log('Node server is running..');
});






export default pool;