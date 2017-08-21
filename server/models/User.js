const bookshelf = require('../Bookshelf');
const User = bookshelf.Model.extend({
    tableName: 'user', // what you named your table as
    boards: function () {
        return this.hasMany(Board);
    }
})

module.exports = User;