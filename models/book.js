class Book {
  constructor(id, isbn, title, author, status) {
    this.id = id;
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.status = status; // true = tersedia, false = dipinjam
  }
}

module.exports = Book;
