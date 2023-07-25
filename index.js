import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

//Routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import accountsRouter from './routes/accounts.routes.js';
import categoriesRouter from './routes/categories.routes.js';
import tagsRouter from './routes/tags.routes.js';
import storesRouter from './routes/stores.routes.js';
import transactionsRouter from './routes/transactions.routes.js';
import cardsRouter from './routes/cards.routes.js';
import reportsRouter from './routes/reports.routes.js';

dotenv.config();
const app = express();
const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());

const { DB_CONNECTION } = process.env;

mongoose
  .connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((error) => console.error('Erro na conexão MongoDB' + error));

mongoose.connection.once('open', () => {
  console.log('Conectado ao MongoDB');
  const APP_PORT = process.env.PORT;
  app.listen(APP_PORT, () => {
    console.log('Servidor foi iniciado na porta:' + APP_PORT);
  });
});

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', accountsRouter);
app.use('/api', cardsRouter);
app.use('/api', categoriesRouter);
app.use('/api', tagsRouter);
app.use('/api', storesRouter);
app.use('/api', transactionsRouter);
app.use('/api', reportsRouter);
