import express from 'express';
import mongoose from 'mongoose';
import usersRouters from './routes/users';

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use('/users', usersRouters);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));