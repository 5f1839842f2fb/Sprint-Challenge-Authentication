const server = require('./api/server.js');
const db = require('./database/dbConfig')

const PORT = process.env.PORT || 3300;
server.listen(PORT, async () => {
  await db('users').truncate()
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
