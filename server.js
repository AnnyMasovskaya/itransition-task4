const express = require('express');
const mysql = require('mysql');
require('dotenv').config()

const app = express();
app.use(express.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'annkad'
});

db.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
  } else {
    console.log('Подключено к базе данных MySQL');
  }
});
ы

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Ошибка при регистрации пользователя:', err);
      res.status(500).json({ message: 'Ошибка при регистрации пользователя' });
    } else {
      console.log('Пользователь успешно зарегистрирован');
      res.sendStatus(200);
    }
  });
});


app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Ошибка при аутентификации пользователя:', err);
      res.status(500).json({ message: 'Ошибка при аутентификации пользователя' });
    } else if (result.length === 0) {
      console.log('Пользователь не найден');
      res.status(401).json({ message: 'Неверные учетные данные' });
    } else {
      console.log('Пользователь успешно аутентифицирован');
      res.sendStatus(200);
    }
  });
});

app.listen(5000, () => {
  console.log('Сервер запущен на порту 5000');
});