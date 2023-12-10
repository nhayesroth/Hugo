import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

export { app };