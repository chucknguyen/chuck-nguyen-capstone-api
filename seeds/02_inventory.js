export const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('inventory').del();
    await knex('inventory').insert([
        {
            user_id: 1,
            item_name: 'JFlower JF20-23',
            quantity: 5,
            price: 600,
            description: 'High-quality pool cue with maple shaft and leather tip',
            media: JSON.stringify(['http://localhost:8080/jflowers-1.jpg']),
            brand: 'JFlower',
            type: "Playing cue",
            category: "Beginner",
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            user_id: 1, 
            item_name: 'Predator P3 with Revo shaft',
            quantity: 3,
            price: 1500,
            description: 'Professional-grade pool cue with carbon fiber shaft',
            media: JSON.stringify(['http://localhost:8080/p3-revo.jpg']),
            brand: 'Predator',
            type: "Playing cue",
            category: "Intermediate",
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            user_id: 2, 
            item_name: 'SVB Ghost',
            quantity: 2,
            price: 800,
            description: 'The best of Cuetec',
            media: JSON.stringify(['http://localhost:8080/svb-ghost.jpg']),
            brand: 'Cuetec',
            type: "Playing cue",
            category: "Intermediate",
            created_at: new Date(),
            updated_at: new Date()
        }
    ]);
  };