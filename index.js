import express from "express";
import cors from "cors";
import inventory from './routes/inventory.js'
import cart from './routes/cart.js'
const app = express();
import "dotenv/config"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import knex from 'knex';
import knexfile from './knexfile.js';
const myknex = knex(knexfile);
import multer from 'multer';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  }
});

const { PORT, CORS_ORIGIN, SECRET_KEY } = process.env;
app.use(cors({ origin: CORS_ORIGIN })); 
app.use(express.json());
app.use(express.static('public/images'));

app.route("/")
  .get((req, res) => {res.status(200).json("Works!")})

app.use('/inventory', inventory);
app.use('/cart', cart);



app.post("/signup", async (req, res) => {
  const { name, email, username, password  } = req.body;

  if (!username || !name || !email || !password) {
    console.error("Missing things");
    return res.sendStatus(400);
  }

  const existingUser = await myknex('user').where({ username }).first();
  if (existingUser) {
    console.error("User already exists");
    return res.status(409).json({ error: "User already exists" });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  await myknex('user').insert({ name, email, username, password: hashedPassword });
  res.status(200).json({ success: "true" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await myknex('user').where({ username }).first();
  if (user && bcrypt.compareSync(password, user.password)) {
    console.log("Found user:", user);
    res.status(200).json({ token: jwt.sign({ username: user.username }, SECRET_KEY) });
  } else {
    res.status(403).json({
      token: "",
      error: {
        message: "Error logging in. Invalid username/password combination.",
      },
    });
  }
});
app.post('/upload', upload.array('files', 5), (req, res) => {
  const files = req.files;
  if (!files) {
    return res.status(400).send({error: 'No files were uploaded.'});
  }
  const fileUrls = files.map(file => {
    return {
      filename: file.filename,
      url: 'http://localhost:8080/' + file.filename 
    };
  });
  const media = fileUrls.map(file => file.url);
  res.status(200).json({media});
});


app.listen(PORT || 5050, () => {
    console.log(`running on ${PORT || 5050}`);
})