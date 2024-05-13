export const up = function (knex) {
    return knex.schema.createTable('user', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.string('email').notNullable();
      table.string('name').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
  };
  
  
  export const down = function (knex) {
    return knex.schema.dropTable('user');
  };