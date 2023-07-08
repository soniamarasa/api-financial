import storeModel from '../models/storeModel.js';

const getStores = async (req, res) => {
  const userId = req.userId;
  try {
    const stores = await storeModel.find({
      userId: userId,
    });
    res.send(stores);
  } catch (error) {
    res.send(500).send({
      message: 'Ocorreu um erro ao pesquisar as lojas.' + error,
    });
  }
};

const newStore = async (req, res) => {
  const storeBody = req.body;

  let store = new storeModel(storeBody);
  store.userId = req.userId;

  try {
    await store.save();
    res.send(store);
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao criar a loja. Tente novamente mais tarde.' +
        error,
    });
  }
};

const updateStore = async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;
  const storeBody = req.body;

  try {
    const item = await storeModel.findById({
      _id: id,
    });

    if (item.userId !== userId) {
      return res.status(500).send({
        message: 'Você nao tem permissão para editar essa loja.',
      });
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
        message: 'Loja não encontrada',
      });
    } else {
      res.send(updatedStore);
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao atualizar a loja. Tente novamente mais tarde.' +
        error,
    });
  }
};

const deleteStore = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  try {
    const store = await storeModel.findById({
      _id: id,
    });
    if (store.userId !== userId) {
      return res.status(500).send({
        message: 'Você não tem permissão para deletar essa loja.',
      });
    }

    const dataId = await storeModel.findByIdAndRemove({
      _id: id,
    });
    if (!dataId) {
      res.send({
        message: 'Loja não encontrada.',
      });
    } else {
      res.send({ message: 'Loja deletada com sucesso!' });
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao deletar a loja. Tente novamente mais tarde.' +
        error,
    });
  }
};

export { getStores, newStore, updateStore, deleteStore };
