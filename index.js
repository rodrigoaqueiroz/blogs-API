const express = require('express');
// const validations = require('./middlewares/validationUser');
// const Users = require('./controllers/userController');
const router = require('./routes/index');

// const { verifyDisplayName, verifyEmail, verifyPassword } = validations;
const PORT = 3000;
const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// app.post('/user', [
//   verifyDisplayName,
//   verifyEmail,
//   verifyPassword,
//   Users.createUser,
// ]);

app.post('/user', router);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
