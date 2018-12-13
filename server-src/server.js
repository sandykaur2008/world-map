'use strict'; 
import dotenv from 'dotenv'; 
dotenv.config(); 
import express from 'express';
import bodyParser from 'body-parser'; 
const app = express();
import {arouter} from './routes/authRoutes'; 
const authRouter = arouter(); 
const port = process.env.PORT || 5000;
import mongoose from 'mongoose';
mongoose.Promise = global.Promise; 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import {dbConnection} from './database'; 
dbConnection(); 

import {passportConfig} from './passport';
passportConfig(app);  

app.use('/auth', authRouter); 

app.listen(port, () => console.log(`Listening on port ${port}`));