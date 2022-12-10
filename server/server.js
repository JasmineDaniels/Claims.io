const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const cors = require('cors');
const db = require('./config/connection');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const credentials = require('./utils/credentials');
const corsOptions = require('./config/corsOptions');

const app = express();
const PORT = process.env.PORT || 5000;

db.on('connected', () => {
  console.log('Mongoose is connected');
})

//fetch cookies credential requirement
app.use(credentials);
//cross origin resource sharing
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// if we're in production, serve client/build as static assets
//NODE_ENV=production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
