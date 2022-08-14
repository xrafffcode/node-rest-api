const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(400).json({ message: 'Access denied. No token provided.' })
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY)
        req.user = verified
        next()
    } catch {
        res.status(400).json({
            message: 'Token tidak valid'
        })
    }
}

module.exports = verifyToken