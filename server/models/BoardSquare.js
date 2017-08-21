const bookshelf = require('../Bookshelf');
const Square = require('./Square');
const BoardSquare = bookshelf.Model.extend({
    tableName: 'boardSquare',
    board: function () {
        return this.belongsTo(Board, 'boardID');
    },
    square: function () {
        return this.belongsTo(Square, 'squareID');
    }
})

module.exports = BoardSquare;