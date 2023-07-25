import accountModel from '../models/accountModel.js';

const getAccountsBalance = async (req, res) => {
  const userId = req.userId;

  try {
    let accounts = await accountModel.find({
      userId: userId,
    });

    let currentBalance = 0;
    let forecastBalance = 0;
    let expenseBalance = 0;
    let incomeBalance = 0;

    accounts.forEach((account) => {
      currentBalance += account.currentBalance;
      forecastBalance += account.forecastBalance;
    });

    let balance = {
      current: {
        _id: 1,
        name: 'Saldo Atual',
        total: currentBalance,
        color: '--blue-500',
        icon: 'fa-solid',
      },
      expenses: {
        _id: 2,
        name: 'Despesas',
        total: expenseBalance,
        color: '--red-500',
        icon: 'fa-solid',
      },
      income: {
        _id: 3,
        name: 'Receitas',
        total: incomeBalance,
        color: '--green-400',
        icon: 'fa-solid',
      },
      forecast: {
        _id: 4,
        name: 'Saldo Previsto',
        total: forecastBalance,
        color: '--orange-500',
        icon: 'fa-solid',
      },
    };
    res.send(balance);
  } catch (error) {
    res.sendStatus(500).send({
      message: 'Ocorreu um erro ao realizar as consultas. ' + error,
    });
  }
};

const getStoresReport = async (req, res) => {
  const userId = req.userId;
};

const getExpensesReport = async (req, res) => {
  const userId = req.userId;
};

const getReportEntries = async (req, res) => {
  const userId = req.userId;
};

const getMonthlyBalance = async (req, res) => {
  //Talvez nao precise. Usar dados do primeiro endpoint para graficos
  const userId = req.userId;
};

const getMonthlysBalance = async (req, res) => {
  const userId = req.userId;
};

const getIncomeCategoriesReport = async (req, res) => {
  const userId = req.userId;
};

const getExpenseCategoriesReport = async (req, res) => {
  const userId = req.userId;
};

export {
  getAccountsBalance,
  getStoresReport,
  getExpensesReport,
  getMonthlyBalance,
  getMonthlysBalance,
  getReportEntries,
  getExpenseCategoriesReport,
  getIncomeCategoriesReport,
};
