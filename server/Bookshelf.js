const knex = require('knex')({
  client: 'postgres',
  connection: {
    host     : 'postgres://zbmdnjiuzsnrtg:9229902ea11b1574a034cb241c512dfabe0492736573375f4e8e3ae3b9b87d43@ec2-184-73-249-56.compute-1.amazonaws.com:5432/d5sdalc8rmrsga',
    user     : 'postgres',
    password : 'postgres',
    database : 'bingo-generator',
    charset  : 'utf8'
  }
});
// then connect bookshelf with knex
const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;