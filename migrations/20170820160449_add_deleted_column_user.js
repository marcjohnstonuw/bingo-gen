
exports.up = function(knex, Promise) {
    return knex.schema.table('user', function (t) {
        t.timestamp('deleted_at')
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('user', function (t) {
        t.dropColumn('deleted_at')
    });
};
