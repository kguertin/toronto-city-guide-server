const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).json({msg: 'No authentication token, autherization denied'})
        } 

        const varified = jwt.verify(token, process.env.JWT_SECRET);
        if (!varified) {
            res.status(401).json({msg: 'Token varification failed, autherization denied'});
        }
        req.user = varified.id
        next()
    } catch (err) {
        res.status(500).json({error: err.message});
    }
} 

module.exports = isAuth