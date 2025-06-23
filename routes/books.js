const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ✅ GET semua buku
router.get('/semua', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM books');
    res.json(rows);
  } catch (err) {
    console.error('❌ Error saat ambil semua buku:', err.message);
    res.status(500).json({ error: 'Gagal ambil data buku' });
  }
});

// ✅ GET buku berdasarkan ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [rows] = await db.query('SELECT * FROM books WHERE id = ?', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Buku tidak ditemukan' });
    }
  } catch (err) {
    console.error('❌ Error saat ambil buku:', err.message);
    res.status(500).json({ error: 'Gagal ambil data buku' });
  }
});

// ✅ POST buku baru
router.post('/tambah', async (req, res) => {
  const { isbn, title, author, status } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO books (isbn, title, author, status) VALUES (?, ?, ?, ?)',
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
    console.error('❌ Error saat tambah buku:', err.message);
    res.status(500).json({ error: 'Gagal tambah buku' });
  }
});

// ✅ PUT edit buku
router.put('/edit/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { isbn, title, author, status } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE books SET isbn = ?, title = ?, author = ?, status = ? WHERE id = ?',
      [isbn, title, author, status, id]
    );

    if (result.affectedRows > 0) {
      res.json({ message: 'Buku berhasil diperbarui' });
    } else {
      res.status(404).json({ message: 'Buku tidak ditemukan' });
    }
  } catch (err) {
    console.error('❌ Error saat update buku:', err.message);
    res.status(500).json({ error: 'Gagal update buku' });
  }
});

// ✅ DELETE buku
router.delete('/hapus/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const [result] = await db.query('DELETE FROM books WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Buku dihapus' });
    } else {
      res.status(404).json({ message: 'Buku tidak ditemukan' });
    }
  } catch (err) {
    console.error('❌ Error saat hapus buku:', err.message);
    res.status(500).json({ error: 'Gagal hapus buku' });
  }
});

module.exports = router;
