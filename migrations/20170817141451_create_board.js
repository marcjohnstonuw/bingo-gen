
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('board', function (table) {
        table.increments('id').primary();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.integer('gameTypeID').notNullable();
        table.integer('userID').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('board')
};
