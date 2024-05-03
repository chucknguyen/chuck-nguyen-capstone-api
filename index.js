import express from "express";
import cors from "cors";
import inventory from './routes/inventory.js'
const app = express();
import "dotenv/config"

const { PORT, BACKEND_URL, CORS_ORIGIN } = process.env;
app.use(cors({ origin: CORS_ORIGIN })); 
app.use(express.json());
app.use(express.static('public/images'));

app.route("/")
  .get((req, res) => {res.status(200).json("Works!")})

app.use('/inventory', inventory);

app.listen(PORT || 5050, () => {
    console.log(`running on ${PORT || 5050}`);
})