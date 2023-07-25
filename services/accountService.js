import accountModel from '../models/accountModel.js';

const getAccounts = async (req, res) => {
  const userId = req.userId;

  try {
    let accounts = await accountModel.find({
      userId: userId,
    });
    res.send(accounts);
  } catch (error) {
    res.send(500).send({
      message: 'Ocorreu um erro ao pesquisar as contas.' + error,
    });
  }
};

const newAccount = async (req, res) => {
  const accountBody = req.body;

  let account = new accountModel(accountBody);
  account.userId = req.userId;

  try {
    await account.save();
    account = {
      account,
      message: `Conta criada com sucesso!`,
    };
    res.send(account);
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao criar a conta. Tente novamente mais tarde.' + error,
    });
  }
};

const updateAccount = async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;
  const accountBody = req.body;

  try {
    const item = await accountModel.findById({
      _id: id,
    });

    if (item.userId !== userId) {
      return res.status(500).send({
        message: 'Você nao tem permissão para editar essa conta.',
      });
    }

    let account = await accountModel.findByIdAndUpdate(
      {
        _id: id,
      },
      accountBody,
      {
        new: true,
      }
    );

    if (!account) {
      res.send({
        message: 'Conta não encontrada',
      });
    } else {
      account = {
        account,
        message: `Conta atualizada com sucesso!`,
      };
      res.send(account);
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao atualizar a conta. Tente novamente mais tarde.' +
        error,
    });
  }
};

const deleteAccount = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  try {
    const account = await accountModel.findById({
      _id: id,
    });
    if (account.userId !== userId) {
      return res.status(500).send({
        message: 'Você não tem permissão para deletar essa conta.',
      });
    }

    const dataId = await accountModel.findByIdAndRemove({
      _id: id,
    });
    if (!dataId) {
      res.send({
        message: 'Conta não encontrada.',
      });
    } else {
      res.send({ message: 'Conta deletada com sucesso!' });
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao deletar a conta. Tente novamente mais tarde.' +
        error,
    });
  }
};

export { getAccounts, newAccount, updateAccount, deleteAccount };
