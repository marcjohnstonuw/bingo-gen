const bookshelf = require('../Bookshelf');
const Square = require('./Square');
const GameType = bookshelf.Model.extend({
    tableName: 'gameType',
    squares: function () {
        return this.hasMany(Square, 'gameTypeID');
    },
    boards: function () {
        return this.hasMany(Board, 'gameTypeID');
    }
})

module.exports = GameType;