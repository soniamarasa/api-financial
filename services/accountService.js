import accountModel from '../models/accountModel.js';

const accounts = async (req, res) => {
  const userId = req.params.userId;
  try {
    const getAccounts = await accountModel.find({
      userId: userId,
    });
    res.send(getAccounts);
  } catch (error) {
    res.send(500).send({
      message: 'An error occurred while searching for accounts.' + error,
    });
  }
};

const newAccount = async (req, res) => {
  const accountBody = req.body;

  let account = new accountModel(accountBody);

  try {
    await account.save();
    res.send(account);
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while creating the account.' + error,
    });
  }
};

const editAccount = async (req, res) => {
  const userId = req.params.userId;
  const id = req.params.id;
  const accountBody = req.body;

  try {
    const item = await accountModel.findById({
      _id: id,
    });

    if (item.userId !== userId) {
      return res
        .status(500)
        .send({ message: 'You do not have permission to edit this item.' });
    }

    const updatedAccount = await accountModel.findByIdAndUpdate(
      {
        _id: id,
      },
      accountBody,
      {
        new: true,
      }
    );

    if (!updatedAccount) {
      res.send({
        message: 'Account not found.',
      });
    } else {
      res.send(updatedAccount);
    }
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while editing the account.' + error,
    });
  }
};

export { accounts, newAccount, editAccount };
