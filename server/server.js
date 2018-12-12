import express from 'express';
import bodyParser from 'body-parser'; 
const app = express();
import {urouter} from './routes/userRoutes'; 
const userRouter = urouter(); 
import {arouter} from './routes/authRouter'; 
const authRouter = arouter(); 
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', userRouter); 
app.use('/auth', authRouter); 

app.listen(port, () => console.log(`Listening on port ${port}`));