const express = require('express');
const dotenv = require('dotenv');
const logger = require('./src/lib/logger');

dotenv.config();

const app = express();

app.listen(process.env.PORT, () => {
  logger.info(`app listening at ${process.env.PORT}`);
});
