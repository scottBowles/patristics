import dotenv from 'dotenv';
import express, { json } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import Debug from 'debug';
import saintsRouter from './routes/saintsRouter';

const debug = Debug('app:debug');

dotenv.config();

const app = express();

mongoose
  .connect(process.env.DB_URL as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => debug('db connected...'))
  .catch((err) => {
    throw new Error(err);
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.use(json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...');
}

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.use('/saints', saintsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
