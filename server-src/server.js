'use strict'; 
import dotenv from 'dotenv'; 
dotenv.config(); 
import express from 'express';
import bodyParser from 'body-parser'; 
import cookieParser from 'cookie-parser';
import csrf from 'csurf'; 
import session from 'express-session'; 
import helmet from 'helmet'; 
const app = express();
import {arouter} from './routes/authRoutes'; 
const authRouter = arouter(); 
const port = process.env.PORT || 5000;
import mongoose from 'mongoose';
mongoose.Promise = global.Promise; 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
})); 
app.use(csrf()); 
import {dbConnection} from './database'; 
dbConnection(); 

import {passportConfig} from './passport';
passportConfig(app);  
app.use(helmet()); 
app.use('/auth', authRouter); 

app.listen(port, () => console.log(`Listening on port ${port}`));