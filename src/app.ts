import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import authorization from './middlewares/authorization';
import error from './middlewares/error';

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use(authorization);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(error);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));