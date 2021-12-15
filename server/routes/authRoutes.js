const router = require('express').Router();
const authController = require('../controllers/authController');

// Signup
router.post('/signup', authController.signup_post);

// Login
router.post('/login', authController.login_post);

// Logout
router.get('/logout', authController.logout_get);

// Verify User
router.get('/verify', authController.verify_get);

module.exports = router;