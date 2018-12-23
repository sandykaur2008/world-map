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
import {mrouter} from './routes/mapRoutes';
const mapRouter = mrouter(); 
import {crouter} from './routes/contactRoutes';
const contactRouter = crouter(); 
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
app.use((req, res, next) => {
  let token = req.csrfToken();
  res.cookie('XSRF-TOKEN', token);
  console.log(token); 
  next();
});
app.use(helmet()); 
app.use('/auth', authRouter); 
app.use('/map', mapRouter); 
app.use('/contact', contactRouter); 

app.listen(port, () => console.log(`Listening on port ${port}`));