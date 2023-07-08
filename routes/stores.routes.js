import express from 'express';
import {
  getStores,
  newStore,
  updateStore,
  deleteStore,
} from '../services/storeService.js';
import { authorization } from '../services/userService.js';

const storesRouter = express.Router();

storesRouter.get('/stores', authorization, getStores); 
storesRouter.post('/stores', authorization, newStore);
storesRouter.put('/stores/:id', authorization, updateStore);
storesRouter.delete('/stores/:id', authorization, deleteStore);

export default storesRouter;
