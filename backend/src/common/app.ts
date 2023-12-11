import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

export { app };
