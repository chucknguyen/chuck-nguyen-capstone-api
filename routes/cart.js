import express from "express";
const router = express.Router();
import knex from 'knex';
import knexfile from '../knexfile.js';
const myknex = knex(knexfile);

const getToken = (req) => {
    if(!req.headers.authorization){
      return;
    } else {
      return req.headers.authorization.split(" ")[1];
    }
  }
const updateCart = async () => {
    await myknex('cart').insert({user_id:1})}
router.post('/', async (req,res) => {
    try {
        await updateCart();
        const data = req.body;
        console.log(data)
        await myknex('cart').where({user_id: 1}). update({existing: JSON.stringify(data)})
        const myCart = myknex('cart');
        console.log(myCart)
    } catch (error) {
        console.error('Error fetching inventory', error)
        res.status(500).json({error: 'Internal server error'})
    }
})

export default router;