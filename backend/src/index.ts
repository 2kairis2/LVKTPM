import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import routes from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/v1', routes);

app.get('/api/v1', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

const db = process.env.MONGO_URI || 'mongodb://localhost:27017/express-mongo';

mongoose
    .connect(db, {
        family: 4,
    })
    .then(() => {
        console.log('[mongo]: Connected to the database');
    })
    .catch((error) => {
        console.log(`[mongo]: Error connecting to the database: ${error}`);
    });
