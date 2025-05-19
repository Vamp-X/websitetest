const express = require('express');
const router = express.Router();

// Simple authentication for demo purposes
// In a real app, you'd use proper authentication with password hashing
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simple hardcoded credentials (replace with proper auth in production)
  if (username === 'admin' && password === 'portfolio123') {
    res.json({ 
      success: true, 
      message: 'Login successful',
      token: 'demo-token-123' // In a real app, use JWT
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

module.exports = router;