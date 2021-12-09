import express from 'express';
import * as http from 'http';
const app: express.Application = express();
const http = ('http');
const server = http.createServer(app);
const port = 3000;

app.get('/', (req, res) => {
  res.status(200).send(`hello World. our server is on port ${port}`);
});

server.listen(port, () => {
  console.log(`server running at port ${port}`)
});
