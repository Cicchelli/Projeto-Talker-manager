const express = require('express');
const { readData } = require('./talker');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  try {
    const talkers = await readData();
    if (talkers) {
      res.status(200).json(talkers);
    }
    return res.status(200).json([]);
  } catch (error) {
    console.error('Não foi possivel encontrar');
    res.status(400);
  }
});