const bookshelf = require('../bookshelf');
const Square = require('./Square');
const BoardSquare = require('./BoardSquare');
const GameType = require('./GameType')
const Board = bookshelf.Model.extend({
    tableName: 'board',
    gameType: function () {
        return this.belongsTo(GameType, 'gameTypeID');
    },
    user: function () {
        return this.belongsTo(User, 'userID');
    },
    boardSquares: function () {
        return this.hasMany(BoardSquare, 'boardID');
    }
})

module.exports = Board;