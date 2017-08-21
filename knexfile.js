// knexfile.js
module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    host     : 'localhost',
    user     : 'postgres',
    password : 'postgres',
    database : 'bingo-generator',
    charset  : 'utf8'
  }
};