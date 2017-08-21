const knex = require('knex')({
  client: 'postgres',
  connection: {
    host     : 'ec2-184-73-249-56.compute-1.amazonaws.com',
    user     : 'postgres',
    password : 'postgres',
    database : 'bingo-generator',
    charset  : 'utf8'
  }
});
// then connect bookshelf with knex
const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;