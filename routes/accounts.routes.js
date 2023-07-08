import express from 'express';
import {
  getAccounts,
  newAccount,
  updateAccount,
  deleteAccount,
} from '../services/accountService.js';
import { authorization } from '../services/userService.js';

const accountsRouter = express.Router();

accountsRouter.get('/accounts', authorization, getAccounts); 
accountsRouter.post('/accounts', authorization, newAccount);
accountsRouter.put('/accounts/:id', authorization, updateAccount);
accountsRouter.delete('/accounts/:id', authorization, deleteAccount);

export default accountsRouter;
