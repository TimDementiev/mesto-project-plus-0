import express from 'express';
import mongoose from 'mongoose';

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));