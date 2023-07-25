import express from 'express';
import {
  getAccountsBalance,
  getStoresReport,
  getExpensesReport,
  getMonthlyBalance,
  getMonthlysBalance,
  getReportEntries,
  getIncomeCategoriesReport,
  getExpenseCategoriesReport,
} from '../services/reportsService.js';
import { authorization } from '../services/userService.js';

const reportsRouter = express.Router();

reportsRouter.get('/reports', authorization, getAccountsBalance);
reportsRouter.get('/reports/income-categories',authorization, getIncomeCategoriesReport);
reportsRouter.get('/reports/expense-categories',authorization, getExpenseCategoriesReport);
reportsRouter.get('/reports/stores', authorization, getStoresReport);
// reportsRouter.get('/reports/expenses', authorization, getExpensesReport);
// reportsRouter.get('/reports/income', authorization, getReportEntries);
// reportsRouter.get('/reports/balance', authorization, getMonthlyBalance);
reportsRouter.get('/reports/monthly', authorization, getMonthlysBalance);

export default reportsRouter;
