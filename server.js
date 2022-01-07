#!/usr/bin/env nodejs
/*eslint no-console: [1, { allow: ['log', 'info', 'error'] }] */
// import express from 'express';
// import cors from 'cors';

import express from 'express';
import cors from 'cors';

const app = express();

let corsOptions = {
  origin: 'http://localhost:8080'
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'welcome to app III' });
  console.log(res, req);
});

// require('./app/routes/routes.js')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
const obj = {
  tick,
  collide,
}

export default obj;
