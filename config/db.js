const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'mysql.railway.internal',
  user: 'root',
  password: 'fphIAFTGLyydRdsaByCAvwkksQWqhlLs',       // Ganti sesuai password kamu
  database: 'railway', // Ganti dengan nama database kamu
  port: 3306
});

connection.connect((err) => {
  if (err) throw err;
  console.log('✅ Nyala CUY!!!');
});

module.exports = pool.promise;
