const User = require('../models/user');

exports.getUser = async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        username: user.username,
        id: user._id
    })
}