const fs = require('fs').promises;
const { join } = require('path');

const paths = '/talker.json';
const completePath = join(__dirname, paths);

const filePath = join(__dirname, 'talker.json');

const readData = async () => {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading data:', error);
    return null;
  }
};

const getById = async (id) => {
  const talkers = await readData();
  const filteredTalker = talkers.find((talker) => talker.id === Number(id));
  return filteredTalker || null;
};

const postNewTalker = async (update) => {
  const talkers = await readData();
  const newTalker = { id: talkers.length + 1, ...update };
  const allTalkers = [...talkers, newTalker];
  if (update) {
    fs.writeFile(filePath, JSON.stringify(allTalkers, null, 2));
    return newTalker;
  }
  return null;
};
const putTalker = async (id, update) => {
  const talkers = await readData();
  const idNum = Number(id);
  const talkerChange = { id: idNum, ...update };
  
  const newTalkers = talkers.map((talker) => (talker.id === idNum ? talkerChange : talker));

  await fs.writeFile(filePath, JSON.stringify(newTalkers, null, 2));

  return talkerChange;
};

const deleteTalker = async (id) => {
  const talkers = await readData();
  const newTalkers = talkers.filter((talker) => talker.id !== Number(id));
  await fs.writeFile(completePath, JSON.stringify(newTalkers));
  return newTalkers;
};

module.exports = {
  readData,
  getById,
  postNewTalker,
  putTalker,
  deleteTalker,
};