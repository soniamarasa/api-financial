import storeModel from '../models/storeModel';

const stores = async (req, res) => {
  const userId = req.params.userId;
  try {
    const getStores = await storeModel.find({
      userId: userId,
    });
    res.send(getStores);
  } catch (error) {
    res.send(500).send({
      message: 'An error occurred while searching for stores.' + error,
    });
  }
};

const newStore = async (req, res) => {
  const storeBody = req.body;

  let store = new storeModel(storeBody);

  try {
    await store.save();
    res.send(store);
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while creating the store.' + error,
    });
  }
};

const editStore = async (req, res) => {
  const userId = req.params.userId;
  const id = req.params.id;
  const storeBody = req.body;

  try {
    const store = await storeModel.findById({
      _id: id,
    });

    if (store.userId !== userId) {
      return res
        .status(500)
        .send({ message: 'You do not have permission to edit this store.' });
    }

    const updatedStore = await storeModel.findByIdAndUpdate(
      {
        _id: id,
      },
      storeBody,
      {
        new: true,
      }
    );

    if (!updatedStore) {
      res.send({
        message: 'Store not found.',
      });
    } else {
      res.send(updatedStore);
    }
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while editing the store.' + error,
    });
  }
};

const deleteStore = async (req, res) => {
  const id = req.params.id;
  const userId = req.params.userId;

  try {
    const store = await storeModel.findById({
      _id: id,
    });
    if (store.userId !== userId) {
      return res.status(500).send({
        message: "You don't have permission to delete this store.",
      });
    }

    const dataId = await storeModel.findByIdAndRemove({
      _id: id,
    });
    if (!dataId) {
      res.send({
        message: 'Store not found.',
      });
    } else {
      res.send({ message: 'Successfully deleted store!' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'An error occurred while deleting the store.' + error });
  }
};

export { stores, newStore, editStore, deleteStore };
