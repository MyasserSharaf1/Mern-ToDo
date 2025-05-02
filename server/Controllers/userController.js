const User = require('../models/User');

// GET user by ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

// PUT update user by ID
// controllers/userController.js
exports.updateUser = async (req, res) => {
    const { name, email, phone } = req.body;
  
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      if (!req.user || req.user.id !== user._id.toString()) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
  
      user.name = name || user.name;
      user.email = email || user.email;
      user.phone = phone || user.phone;
  
      const updatedUser = await user.save();
  
      res.json({
        message: 'User updated successfully',
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
        },
      });
    } catch (err) {
      console.error('Update user failed:', err); // <-- log here
      res.status(500).json({ error: 'Server error: ' + err.message });
    }
  };
  
