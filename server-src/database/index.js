//Connect to Mongo database
import mongoose from 'mongoose'; 
mongoose.Promise = global.Promise; 

//your local database url
//27017 is the default mongoDB port
const uri = 'mongodb://localhost:27017/world-map';

export function dbConnection() { 
  mongoose.connect(uri).then(
    () => { 
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
        console.log('Connected to Mongo: ' + uri);
        
    },
    err => {
         /** handle initial connection error */ 
         console.log('error connecting to Mongo: ')
         console.log(err);
         
        }
  );
} 