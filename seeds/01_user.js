export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user').del();
};