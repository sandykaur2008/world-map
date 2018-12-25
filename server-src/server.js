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
import path from 'path'; 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
})); 
app.use(
  process.env.NODE_ENV === 'TEST' ?
  csrf({ ignoreMethods: ['GET', 'POST']}): 
  csrf()
); 
app.use(helmet()); 
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'../client/build/index.html'));
});
app.use('/auth', authRouter); 
app.use('/map', mapRouter); 
app.use('/contact', contactRouter); 
const port = process.env.PORT || 5000;
export const server = app.listen(port);

console.log(`Password generator listening on ${port}`);
