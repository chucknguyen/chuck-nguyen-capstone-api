export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user').del();
  await knex('user').insert([
    {
        username: 'john_doe',
        password: 'password123',
        email: 'john.doe@example.com',
        name: 'John Doe',
        created_at: new Date(),
        updated_at: new Date()
        },
    {
        username: 'jane_smith',
        password: 'securepass',
        email: 'jane.smith@example.com',
        name: 'Jane Smith',
        created_at: new Date(),
        updated_at: new Date()
        }
  ]);
};