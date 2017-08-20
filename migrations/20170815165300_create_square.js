
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('square', function (table) {
        table.increments('id').primary();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.string('text').notNullable();
        table.integer('gameTypeID').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('square')
};
