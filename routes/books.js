const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const db = require('../db');

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
router.post('/tambah', async (req, res) => {
  console.log('Data Diterima:', req.body); // 👈 Cek ini tampil atau tidak

  const { isbn, title, author, status } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO Book (isbn, title, author, status) VALUES (?, ?, ?, ?)',
      [isbn, title, author, status]
    );

    res.status(201).json({
      id: result.insertId,
      isbn,
      title,
      author,
      status
    });
  } catch (err) {
    console.error('❌ Error saat tambah buku:', err.message); // 👈 Ini penting
    res.status(500).json({ error: 'Gagal tambah buku' });
  }
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
