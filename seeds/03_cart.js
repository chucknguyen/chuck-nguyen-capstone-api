export const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('cart').del();
    // await knex('cart').insert([
    //     {
    //       existing: {
    //         items: JSON.stringify([
    //           { inventory_item_id: 1, quantity: 2 }, // Pool Cue - Model A (2 items)
    //           { inventory_item_id: 2, quantity: 1 }  // Pool Cue - Model B (1 item)
    //         ]),
    //         total_amount: 320 // Total amount for items in the cart
    //       },
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //       user_id: 1 // John Doe
    //     },
    //     {
    //       existing: {
    //         items: JSON.stringify([
    //           { inventory_item_id: 3, quantity: 1 } // Pool Cue - Model C (1 item)
    //         ]),
    //         total_amount: 80 // Total amount for items in the cart
    //       },
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //       user_id: 2 // Jane Smith
    //     }
    // ]);
  };