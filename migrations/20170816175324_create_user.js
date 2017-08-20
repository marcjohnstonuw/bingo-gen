
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('user', function (table) {
        table.increments('id').primary();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.string('email').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('user')
};
