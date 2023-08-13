const app = require('./app');
const { db } = require('./database/config.js');

db.authenticate()
  .then((res) => console.log('Database autenthicated'))
  .catch((err) => console.log(error));

db.sync()
  .then((res) => console.log('Database synced'))
  .catch((err) => console.log(error));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
