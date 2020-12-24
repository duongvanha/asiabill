const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const logger = require('./src/lib/logger');
const asianBillRouter = require('./router');
dotenv.config();


const app = express();
app.use(express.json());


app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');

app.use(asianBillRouter);

app.listen(process.env.PORT, () => {
  logger.info(`app listening at ${process.env.PORT}`);
});
