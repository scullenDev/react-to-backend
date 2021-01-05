const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

const { sequelize } = require('./models');
const routes = require('./routes');

const corsOptions = {
  origin: 'http://localhost:1234',
};

app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/dist'));
}

app.use('/api', routes);

// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist/index.html'));
// });

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`API server listening on http://localhost:${PORT}!`);
  });
});
