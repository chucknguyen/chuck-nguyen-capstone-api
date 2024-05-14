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
router.get('/', verifyToken, async (req,res) => {
    try {
        const existingUser =  await myknex('user').where({username: req.username}).select('id').first();
        const myCart = await myknex('cart').where({user_id: existingUser.id}).select('existing').first();
        if (myCart) {
            res.status(200).json(myCart);
        } else {
            res.status(200).json("");
        }
    } catch (error) {
        console.error('Error fetching inventory', error)
        res.status(500).json({error: 'Internal server error'})
    }
})
router.post('/', verifyToken, async (req,res) => {
    try {
        const existing = JSON.stringify(req.body.existing);
        const existingUser = await myknex('user').where({username: req.username}).select('id').first();
        const myCart = await myknex('cart').where({user_id: existingUser.id});
        if(myCart.length > 0) {
            await myknex('cart').where({user_id: existingUser.id}).update({existing});
        } else {
            await myknex('cart').insert({existing, user_id: existingUser.id});
        }
        const updatedCart = await myknex('cart').where({user_id: existingUser.id}).select('existing').first();
        res.status(200).json("Works!");
    } catch (error) {
        console.error('Error fetching inventory', error)
        res.status(500).json({error: 'Internal server error'})
    }
})

export default router;