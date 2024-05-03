export const up = function (knex) {
    return knex.schema.createTable('inventory', (table) => {
      table.increments('id').primary();
      table
        .integer('user_id')
        .unsigned();
      table.string('item_name').notNullable();
      table.integer('quantity').notNullable();
      table.integer('price').notNullable();
      table.string('description').notNullable();
      table.json('media'); 
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      table.foreign('user_id').references('user.id').onUpdate('CASCADE').onDelete('CASCADE');
    });
  };
  export const down = function (knex) {
    return knex.schema.dropTable('inventory');
  };