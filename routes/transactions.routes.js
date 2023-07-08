import express from 'express';
import {
  getTransactions,
  newTransaction,
  updateTransaction,
  deleteTransaction,
} from '../services/transactionService.js';
import { authorization } from '../services/userService.js';

const transactionsRouter = express.Router();

transactionsRouter.get('/transactions', authorization, getTransactions); 
transactionsRouter.post('/transactions', authorization, newTransaction);
transactionsRouter.put('/transactions/:id', authorization, updateTransaction);
transactionsRouter.delete('/transactions/:id', authorization, deleteTransaction);

export default transactionsRouter;
