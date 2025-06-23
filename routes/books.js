const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// GET semua buku
router.get('/semua', (req, res) => {
  res.json(books);
});

// GET buku berdasarkan ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id); // Ambil id dari URL
  const book = books.find(b => b.id === id); // Cari buku

  if (book) {
    res.json(book); // Jika ditemukan, kirim data buku
  } else {
    res.status(404).json({ message: 'Buku tidak ditemukan' }); // Jika tidak, kirim error
  }
});


// POST buku baru
router.post('/tambah', (req, res) => {
  const { isbn, title, author, status } = req.body;
  const newBook = new Book(
    books.length + 1,
    isbn,
    title,
    author,
    status
  );
  books.push(newBook);
  res.status(201).json(newBook);
});

// DELETE buku
router.delete('/hapus/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(b => b.id !== id);
  res.json({ message: 'Buku dihapus' });
});

// PUT update buku
router.put('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { isbn, title, author, status } = req.body;
  const book = books.find(b => b.id === id);

  if (book) {
    book.isbn = isbn;
    book.title = title;
    book.author = author;
    book.status = status;
    res.json(book);
  } else {
    res.status(404).json({ message: 'Buku tidak ditemukan' });
  }
});

module.exports = router;
