const express = require('express');
const app = express();
const port = 3000;

const booksRouter = require('./routes/books');

// Middleware
app.use(express.json());

// Routes
app.use(express.json()); // <-- WAJIB untuk membaca JSON body
app.use('/api/books', booksRouter);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
