const express = require('express');
const { readData, getById, postNewTalker, putTalker, deleteTalker } = require('./talker');
const token = require('./Utils/token');
const verifyEmail = require('./Middlewares/VerifyEmail');
const verifyPass = require('./Middlewares/VerifyPass');
const auten = require('./Middlewares/Auten');
const verifyName = require('./Middlewares/VerifyName');
const { validateAge, 
  validateTalk, 
  validateWatched,
  validateRate } = require('./Middlewares/VirifyAge');
const findId = require('./Middlewares/FindId');

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

app.get('/talker/search', auten, async (req, res) => {
  try {
    const { q } = req.query;
    const data = await readData();
    const filteredTalkers = data.filter((talker) => talker.name.includes(q));

    res.status(200).json(filteredTalkers);
  } catch (error) {
    console.error('Error searching talkers:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
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

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getById(id);
  if (talker) {
    return res.status(200).json(talker);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', verifyEmail, verifyPass, (req, res) => {
  const tokenCreate = token();
  res.status(200).json({ token: tokenCreate });
});

app.post('/talker', auten, verifyName, validateAge,
  validateTalk, validateWatched, validateRate,
  async (req, res) => {
    const newTalker = await postNewTalker(req.body);
    res.status(201).json(newTalker);
  });

app.put('/talker/:id', auten, verifyName, validateAge,
  validateTalk, validateWatched, validateRate, findId, async (req, res) => {
    const { id } = req.params;
    const update = req.body;
    const newTalker = await putTalker(id, update);
    res.status(200).json(newTalker);
  });
  
app.delete('/talker/:id', auten, async (req, res) => {
  const { id } = req.params;
  await deleteTalker(id);

  res.sendStatus(204);
});
