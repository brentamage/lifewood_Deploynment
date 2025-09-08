const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('../models/admin');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Register admin (optional)
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing username or password' });

  const existingAdmin = await Admin.findOne({ username });
  if (existingAdmin) return res.status(400).json({ error: 'Admin already exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  const admin = new Admin({ username, passwordHash });
  await admin.save();

  res.json({ message: 'Admin registered' });
});

// Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

  const validPass = await bcrypt.compare(password, admin.passwordHash);
  if (!validPass) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
