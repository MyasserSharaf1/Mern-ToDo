const express = require('express');
const router = express.Router();
const { getUser, updateUser } = require('../Controllers/userController');
const auth = require('../middleware/authMiddleware');

router.get('/:id', getUser);
// routes/userRoutes.js
router.put('/users/:id', auth, updateUser);

module.exports = router;
