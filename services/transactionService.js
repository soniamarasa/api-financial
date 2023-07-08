import transactionModel from '../models/transactionModel.js';

const getTransactions = async (req, res) => {
  const userId = req.userId;
  try {
    const transactions = await transactionModel.find({
      userId: userId,
    });
    res.send(transactions);
  } catch (error) {
    res.send(500).send({
      message: 'Ocorreu um erro ao pesquisar as transações.' + error,
    });
  }
};

const newTransaction = async (req, res) => {
  const transactionBody = req.body;

  let transaction = new transactionModel(transactionBody);
  transaction.userId = req.userId;

  try {
    await transaction.save();
    res.send(transaction);
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao criar a transação. Tente novamente mais tarde.' +
        error,
    });
  }
};

const updateTransaction = async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;
  const transactionBody = req.body;

  try {
    const item = await transactionModel.findById({
      _id: id,
    });

    if (item.userId !== userId) {
      return res.status(500).send({
        message: 'Você nao tem permissão para editar essa transação.',
      });
    }

    const updatedTransaction = await transactionModel.findByIdAndUpdate(
      {
        _id: id,
      },
      transactionBody,
      {
        new: true,
      }
    );

    if (!updatedTransaction) {
      res.send({
        message: 'Transação não encontrada',
      });
    } else {
      res.send(updatedTransaction);
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao atualizar a transação. Tente novamente mais tarde.' +
        error,
    });
  }
};

const deleteTransaction = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  try {
    const transaction = await transactionModel.findById({
      _id: id,
    });
    if (transaction.userId !== userId) {
      return res.status(500).send({
        message: 'Você não tem permissão para deletar essa transação.',
      });
    }

    const dataId = await transactionModel.findByIdAndRemove({
      _id: id,
    });
    if (!dataId) {
      res.send({
        message: 'Transação não encontrada.',
      });
    } else {
      res.send({ message: 'Transação deletada com sucesso!' });
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao deletar a transação. Tente novamente mais tarde.' +
        error,
    });
  }
};

export { getTransactions, newTransaction, updateTransaction, deleteTransaction };
