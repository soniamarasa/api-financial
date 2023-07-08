import cardModel from '../models/cardModel.js';

const getCards = async (req, res) => {
  const userId = req.userId;
  try {
    const cards = await cardModel.find({
      userId: userId,
    });
    res.send(cards);
  } catch (error) {
    res.send(500).send({
      message: 'Ocorreu um erro ao pesquisar os cartões.' + error,
    });
  }
};

const newCard = async (req, res) => {
  const cardBody = req.body;

  let card = new cardModel(cardBody);
  card.userId = req.userId;

  try {
    await card.save();
    res.send(card);
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao criar o cartão. Tente novamente mais tarde.' +
        error,
    });
  }
};

const updateCard = async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;
  const cardBody = req.body;

  try {
    const item = await cardModel.findById({
      _id: id,
    });

    if (item.userId !== userId) {
      return res.status(500).send({
        message: 'Você nao tem permissão para editar esse cartão.',
      });
    }

    const updatedCard = await cardModel.findByIdAndUpdate(
      {
        _id: id,
      },
      cardBody,
      {
        new: true,
      }
    );

    if (!updatedCard) {
      res.send({
        message: 'Cartão não encontrado',
      });
    } else {
      res.send(updatedCard);
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao atualizar o cartão. Tente novamente mais tarde.' +
        error,
    });
  }
};

const deleteCard = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  try {
    const card = await cardModel.findById({
      _id: id,
    });
    if (card.userId !== userId) {
      return res.status(500).send({
        message: 'Você não tem permissão para deletar esse cartão.',
      });
    }

    const dataId = await cardModel.findByIdAndRemove({
      _id: id,
    });
    if (!dataId) {
      res.send({
        message: 'Cartão não encontrado.',
      });
    } else {
      res.send({ message: 'Cartão deletado com sucesso!' });
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao deletar o cartão. Tente novamente mais tarde.' +
        error,
    });
  }
};

export { getCards, newCard, updateCard, deleteCard };
