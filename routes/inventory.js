import express from "express";
const router = express.Router();
import knex from 'knex';
import knexfile from '../knexfile.js';
const myknex = knex(knexfile);

router.get('/', async (req,res) => {
    try {
        const inventory = await myknex('inventory');
        res.status(200).json(inventory);
    } catch (error) {
        console.error('Error fetching inventory', error)
        res.status(500).json({error: 'Internal server error'})
    }
})

router.get('/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const inventory = await myknex('inventory').where({id});
        res.status(200).json(inventory);
    } catch (error) {
        console.error('Error fetching inventory', error)
        res.status(500).json({error: 'Internal server error'})
    }
})
router.post('/', async (req,res) => {
    try {
        const { user_id, item_name, quantity, price, description, media, brand, type, category } = req.body;
        const mediaArray = JSON.stringify(media.media);
        const newInventory = await myknex('inventory').insert({user_id, item_name, quantity, price, description, media:mediaArray, brand:brand.toLowerCase(), type:type.toLowerCase(), category:category.toLowerCase()});
        res.status(200).json(newInventory);
    } catch (error) {
        console.error('Error fetching inventory', error)
        res.status(500).json({error: 'Internal server error'})
    }
});

export default router;