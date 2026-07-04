// server.js
import pino from 'pino';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/items.js';
import { errorHandler, notFound } from './middleware/errors.js';

// ✅ Import connectDB
import { connectDB } from './db/index.js';
import dotenv from 'dotenv';

dotenv.config(); // load .env variables

const app = express();

export const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

app.use(
  helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  })
);

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(compression());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler); // centralized error handling

const port = process.env.PORT || 5000;

// ✅ Connect to MongoDB before starting server
connectDB(process.env.MONGO_URI).then(() => {
  app.listen(port, () => console.log(`Server running on ${port}`));
});
