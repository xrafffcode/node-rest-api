const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

// import validation
const { registerValidation, loginValidation } = require('../configs/validation')

// import models
const User = require('../models/User')

// Register
router.post('/register', async (req, res) => {

    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // if email is already in use
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) {
        return res.status(400).json({ message: 'Email sudah digunakan' })
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        nama: req.body.nama,
        email: req.body.email,
        password: hashPassword
    })

    try {
        const saveUser = await user.save()
        res.json(saveUser)
    } catch (err) {
        res.status(400).json({
            status: res.status.code,
            message: 'Gagal membuat user baru'
        })
    }
})

module.exports = router