export const up = function (knex) {
    return knex.schema.createTable('cart', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('user.id').onUpdate('CASCADE').onDelete('CASCADE');
      table.json("existing")
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
  };
  
  
  export const down = function (knex) {
    return knex.schema.dropTable('cart');
  };
