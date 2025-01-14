const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5132;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000' // Allow only requests from your frontend
}));

// Dummy user database
const users = [
  { username: 'nadin', password: '12345678' },
  { username: 'gading', password: 'barubaru' },
  { username: 'gavin', password: 'abcde' },
];

// Handle login request
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.status(200).json({ isCorrect: true, message: 'Login successful', user: { username: user.username } });
  } else {
    res.status(401).json({ isCorrect: false, message: 'Invalid username or password' });
  }false});

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the login API' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
