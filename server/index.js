import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import cors from 'cors'

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express();

app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());
dotenv.config()

app.use('/posts', postRoutes);
app.use('/user',userRoutes)


const Connection_Url = process.env.MONGODB_CLIENT_KEY

mongoose.connect( Connection_Url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(5000, () => console.log(`server running on port: 5000`)))
    .catch((error)=> {console.log('error'); console.log(error)});


// mongoose.set('useFindAndModify', false);