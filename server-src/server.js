'use strict'; 
import dotenv from 'dotenv'; 
dotenv.config(); 
import express from 'express';
import bodyParser from 'body-parser'; 
const app = express();
import session from 'express-session'; 
import dbConnection from './database'; 
import connectMongo from 'connect-mongo';
const MongoStore = connectMongo(session); 
import passport from './passport'; 
import {urouter} from './routes/userRoutes'; 
const userRouter = urouter(); 
import {arouter} from './routes/authRoutes'; 
const authRouter = arouter(); 
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use ( 
  session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore ({ mongooseConnection: dbConnection}),
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session()); 
app.use('/user', userRouter); 
app.use('/auth', authRouter); 

app.listen(port, () => console.log(`Listening on port ${port}`));