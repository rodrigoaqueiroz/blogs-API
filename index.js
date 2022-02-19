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

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
