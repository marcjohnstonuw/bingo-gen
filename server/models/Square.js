const bookshelf = require('../bookshelf');
const GameType = require('./GameType');
const Square = bookshelf.Model.extend({
    tableName: 'square', // what you named your table as
    gameType: function () {
        this.belongsTo(GameType, 'gameTypeID');
    },
    boardSquares: function () {
        this.hasMany(BoardSquare);
    }
})

module.exports = Square;