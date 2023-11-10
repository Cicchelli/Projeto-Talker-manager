const { readData } = require('../talker');

const findId = async (req, res, next) => {
  const { id } = req.params;
  const data = await readData();
  const find = data.find((talker) => talker.id === Number(id));
  console.log(find);
  if (!find) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  next();
};

module.exports = findId;