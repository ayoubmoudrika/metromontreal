import express from 'express';
import pool from '../server.js';

class MetroRouter {
    constructor() {
        this.metroRouter = express.Router();
        this.init();
    }

    async metros(req, res, next) {
        try{
            let conn = await pool.getConnection();

            await conn.query("CALL getMetroList()").then((result)=>{
                    delete result[0].meta;
                    res.json(result[0])
                });

        }
        catch(err){
            console.log(err);
        }
    }

    init() {
        this.metroRouter().get('/gti525/v1/metros', this.metros.bind(this));
    }

}

const metrosRouter = new MetroRouter();
metrosRouter.init()
export default metrosRouter;