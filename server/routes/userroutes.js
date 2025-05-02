const express = require('express');
const router = express.Router();
const { getUser, updateUser } = require('../Controllers/userController');
const auth = require('../middleware/authMiddleware');

router.get('/:id', getUser);
router.put('/:id',  updateUser);

module.exports = router;
