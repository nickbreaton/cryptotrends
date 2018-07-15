import serverless from 'serverless-http';
import express from 'express';

const app = express();

app.use((req, res) => {
  res.status(200).json({ status: 'ok' });
});

export const handler = serverless(app);