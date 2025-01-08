import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>This is the root route!</h1>');
});

app.get('/puppy-images', async (req, res) => {
  const API = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=puppy`;
  const response = await fetch(API);
  const data = await response.json();

  res.json(data.results);
});

app.get('/cat-images', async (req, res) => {
  const API = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=cat`;
  const response = await fetch(API);
  const data = await response.json();

  res.json(data.results);
});

app.listen(8080, () => {
  console.log(`Server running on port 8080`);
});

const dbConnectionString = process.env.DATABASE_URL;

const db = new pg.Pool({
  connectionString: dbConnectionString,
});
