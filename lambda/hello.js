import serverless from 'serverless-http';
import express from 'express';

const app = express();

app.get('/hello', (req, res) => {
  res.status(200).json({
    greeting: 'hello from lambda! 🙂'
  });
});

export const handler = serverless(app);