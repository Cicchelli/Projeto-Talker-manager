const fs = require('fs').promises;
const { join } = require('path');

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

module.exports = {
  readData,
};