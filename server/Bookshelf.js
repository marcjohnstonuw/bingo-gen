const knex = require('knex')({
  client: 'postgres',
  connection: {
    host     : '127.0.0.1',
    user     : 'postgres',
    password : 'postgres',
    database : 'bingo-generator',
    charset  : 'utf8'
  }
});
// then connect bookshelf with knex
const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;