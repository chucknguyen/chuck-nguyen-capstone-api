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

export default router;