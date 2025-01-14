const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5132;  // Menggunakan PORT dari Heroku

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: 'https://quizapp-one-mu.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight CORS request
app.options('*', cors());  // Menangani semua permintaan OPTIONS

// Dummy user database
const users = [
  { username: 'nadin', password: '12345678' },
  { username: 'gading', password: 'barubaru' },
  { username: 'gavin', password: 'abcde' },
];

// Handle login request
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.status(200).json({ isCorrect: true, message: 'Login successful', user: { username: user.username } });
  } else {
    res.status(401).json({ isCorrect: false, message: 'Invalid username or password' });
  }
});

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the login API' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
