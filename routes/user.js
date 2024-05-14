import express from "express";
const router = express.Router();
import knex from 'knex';
import knexfile from '../knexfile.js';
const myknex = knex(knexfile);
import jwt from 'jsonwebtoken';
const { SECRET_KEY } = process.env;
const getToken = (req) => {
    if(!req.headers.authorization){
      return;
    } else {
      return req.headers.authorization.split(" ")[1];
    }
  }

const verifyToken = (req, res, next) => {
    const token = getToken(req);
    if(!token) {
      return res.status(401).send("Unauthorized: No token provided");
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if(err) {
        return res.status(401).send("Unauthorized: Invalid token");
      }
      req.username = decoded.username;
      next();
    });
  }
router.get('/:id/inventory', async (req,res) => {
    try {
        const { id } = req.params;
        const inventory = await myknex('inventory').where({user_id: id});
        res.status(200).json(inventory);
    } catch (error) {
        console.error('Error fetching inventory', error)
        res.status(500).json({error: 'Internal server error'})
    }
})
router.get('/auth', verifyToken, async (req,res) => {
    try {
        const { username } = req;
        const user = await myknex('user').where({username}).first();
        res.status(200).json(user.id);
    } catch (error) {
        console.error('Error fetching inventory', error)
        res.status(500).json({error: 'Internal server error'})
    }
})
export default router;