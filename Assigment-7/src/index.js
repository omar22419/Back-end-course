import express from 'express';
import bootstrap from "./app.bootstrap.js";
import { NODE_ENV } from './../config/config.service.js';
const app = express();
const port = process.env.PORT || 4500;
bootstrap(app,express);

app.listen(port, ()=>{
    console.log(`Server is Running on port: ${port}`)
})