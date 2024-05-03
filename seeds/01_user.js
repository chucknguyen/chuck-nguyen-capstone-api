export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user').del();
  await knex('user').insert([
    {
        username: 'john_doe',
        password: 'password123',
        email: 'john.doe@example.com',
        name: 'John Doe',
        is_seller: true,
        created_at: new Date(),
        updated_at: new Date()
        },
    {
        username: 'jane_smith',
        password: 'securepass',
        email: 'jane.smith@example.com',
        name: 'Jane Smith',
        is_seller: false,
        created_at: new Date(),
        updated_at: new Date()
        }
  ]);
};