import cardModel from '../models/cardModel';

const cards = async (req, res) => {
  const userId = req.params.userId;
  try {
    const getCards = await cardModel.find({
      userId: userId,
    });
    res.send(getCards);
  } catch (error) {
    res.send(500).send({
      message: 'An error occurred while searching for cards.' + error,
    });
  }
};

const newCard = async (req, res) => {
  const cardBody = req.body;

  let card = new cardModel(cardBody);

  try {
    await card.save();
    res.send(card);
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while creating the card.' + error,
    });
  }
};

const editCard = async (req, res) => {
  const userId = req.params.userId;
  const id = req.params.id;
  const cardBody = req.body;

  try {
    const card = await cardModel.findById({
      _id: id,
    });

    if (card.userId !== userId) {
      return res
        .status(500)
        .send({ message: 'You do not have permission to edit this card.' });
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
        message: 'Card not found.',
      });
    } else {
      res.send(updatedCard);
    }
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while editing the card.' + error,
    });
  }
};

const deleteCard = async (req, res) => {
  const id = req.params.id;
  const userId = req.params.userId;

  try {
    const card = await cardModel.findById({
      _id: id,
    });
    if (card.userId !== userId) {
      return res.status(500).send({
        message: "You don't have permission to delete this card.",
      });
    }

    const dataId = await cardModel.findByIdAndRemove({
      _id: id,
    });
    if (!dataId) {
      res.send({
        message: 'Card not found.',
      });
    } else {
      res.send({ message: 'Successfully deleted card!' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'An error occurred while deleting the card.' + error });
  }
};

export { cards, newCard, editCard, deleteCard };
