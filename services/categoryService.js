import categoryModel from '../models/categoryModel.js';

const categories = async (req, res) => {
  const userId = req.params.userId;
  try {
    const getCategories = await categoryModel.find({
      userId: userId,
    });
    res.send(getCategories);
  } catch (error) {
    res.send(500).send({
      message: 'An error occurred while searching for categories.' + error,
    });
  }
};

const newCategory = async (req, res) => {
  const categoryBody = req.body;

  let category = new categoryModel(categoryBody);

  try {
    await category.save();
    res.send(category);
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while creating the category.' + error,
    });
  }
};

const editCategory = async (req, res) => {
  const userId = req.params.userId;
  const id = req.params.id;
  const categoryBody = req.body;

  try {
    const item = await categoryModel.findById({
      _id: id,
    });

    if (item.userId !== userId) {
      return res
        .status(500)
        .send({ message: 'You do not have permission to edit this item.' });
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      {
        _id: id,
      },
      categoryBody,
      {
        new: true,
      }
    );

    if (!updatedCategory) {
      res.send({
        message: 'Category not found.',
      });
    } else {
      res.send(updatedCategory);
    }
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while editing the category.' + error,
    });
  }
};

const deleteCategory = async (req, res) => {
  const id = req.params.id;
  const userId = req.params.userId;

  try {
    const category = await categoryModel.findById({
      _id: id,
    });
    if (category.userId !== userId) {
      return res.status(500).send({
        message: "You don't have permission to delete this category.",
      });
    }

    const dataId = await categoryModel.findByIdAndRemove({
      _id: id,
    });
    if (!dataId) {
      res.send({
        message: 'Category not found.',
      });
    } else {
      res.send({ message: 'Successfully deleted category!' });
    }
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while deleting the category.' + error,
    });
  }
};

export { categories, newCategory, editCategory, deleteCategory };
