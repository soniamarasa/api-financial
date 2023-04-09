import ruleModel from '../models/ruleModel';

const rules = async (req, res) => {
  const userId = req.params.userId;
  try {
    const getRules = await ruleModel.find({
      userId: userId,
    });
    res.send(getRules);
  } catch (error) {
    res.send(500).send({
      message: 'An error occurred while searching for rules.' + error,
    });
  }
};

const newRule = async (req, res) => {
  const ruleBody = req.body;

  let rule = new ruleModel(ruleBody);

  try {
    await rule.save();
    res.send(rule);
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while creating the rule.' + error,
    });
  }
};

const editRule = async (req, res) => {
  const userId = req.params.userId;
  const id = req.params.id;
  const ruleBody = req.body;

  try {
    const rule = await ruleModel.findById({
      _id: id,
    });

    if (rule.userId !== userId) {
      return res
        .status(500)
        .send({ message: 'You do not have permission to edit this rule.' });
    }

    const updatedRule = await ruleModel.findByIdAndUpdate(
      {
        _id: id,
      },
      ruleBody,
      {
        new: true,
      }
    );

    if (!updatedRule) {
      res.send({
        message: 'Rule not found.',
      });
    } else {
      res.send(updatedRule);
    }
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while editing the rule.' + error,
    });
  }
};

const deleteRule = async (req, res) => {
  const id = req.params.id;
  const userId = req.params.userId;

  try {
    const rule = await ruleModel.findById({
      _id: id,
    });
    if (rule.userId !== userId) {
      return res.status(500).send({
        message: "You don't have permission to delete this rule.",
      });
    }

    const dataId = await ruleModel.findByIdAndRemove({
      _id: id,
    });
    if (!dataId) {
      res.send({
        message: 'Rule not found.',
      });
    } else {
      res.send({ message: 'Successfully deleted rule!' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'An error occurred while deleting the rule.' + error });
  }
};

export { rules, newRule, editRule, deleteRule };
