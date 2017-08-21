const knex = require('knex')({
  client: 'postgres',
  connection: process.env.DATABASE_URL || {
    host     : 'localhost',
    user     : 'postgres',
    password : 'postgres',
    database : 'bingo-generator',
    charset  : 'utf8'
  }
});
// then connect bookshelf with knex
const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;