
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('boardSquare', function (table) {
        table.increments('id').primary();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.integer('boardID').notNullable();
        table.integer('squareID').notNullable(); 
        table.boolean('dabbed').defaultTo(false);
        table.integer('order').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('boardSquare')
};
