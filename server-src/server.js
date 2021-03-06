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
import path from 'path'; 
import {withAuth} from './middleware'; 
mongoose.Promise = global.Promise; 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
})); 
app.use(
  process.env.NODE_ENV === 'TEST' ?
  csrf({ ignoreMethods: ['GET', 'POST']}): 
  csrf()
); 
import {dbConnection} from './database'; 
dbConnection(); 

import {passportConfig} from './passport';
passportConfig(app);  
app.use((req, res, next) => {
  let token = req.csrfToken();
  res.cookie('XSRF-TOKEN', token);
  next();
});
app.use(helmet()); 
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/auth/', authRouter); 
app.use('/servermap/', (req, res, next) => {withAuth(req, res, next);}, mapRouter); 
app.use('/contact/', contactRouter); 
app.get('/checkToken', (req, res, next) => {withAuth(req, res, next);}, function(req, res) {
  res.sendStatus(200);
});
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

export const server = app.listen(port, () => console.log(`Listening on port ${port}`));