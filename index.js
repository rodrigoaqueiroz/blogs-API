const express = require('express');
const router = require('./routes/index');

const PORT = 3000;
const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', router);
app.post('/login', router);
app.get('/user', router);
app.get('/user/:id', router);
app.post('/categories', router);
app.get('/categories', router);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

// Agradecimento ao Gaspar, a aula de revisão ajudou demais.
// Agradecimento também ao Ricardo T-13 pela ajuda oferecida.
