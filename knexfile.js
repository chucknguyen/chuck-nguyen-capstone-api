import "dotenv/config";

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const knexConnection = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    charset: "utf8"
  }
};

export default knexConnection;