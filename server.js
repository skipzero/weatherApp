#!/usr/bin/env nodejs
/*eslint no-console: [1, { allow: ['log', 'info', 'error'] }] */
// import express from 'express';
// import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

console.log('DOT ENV', process.env)

const app = express();

let corsOptions = {
  origin: 'http://localhost:8080'
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'welcome to app III' });
});

// require('./app/routes/routes.js')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
