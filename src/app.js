const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');


require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();
const PORT = process.env.PORT || 5000;





app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(cors());



app.get('/', (req, res) => {
  res.json({
    message: 'The world is ending'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


require('./db');


app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${PORT}`);
  /* eslint-enable no-console */
});

module.exports = app;
