import express from 'express';
import rateLimit from 'express-rate-limit';

const app = express();
const port = 8000;

// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 60000, // Milisecond
  max: 3, // Limit each IP to 100 requests per `window`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: (req, res) =>
    res.json({
      status: 429,
      data: 'Too many requests, please try again later.',
    }),
});

app.get('/', limiter, (req, res) => {
  return res.json(req.ip);
});

app.listen(port, () => {
  console.log(`Server running in ${port}`);
});
