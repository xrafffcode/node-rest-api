const express = require('express')
const router = express.Router()
const Pegawai = require('../models/Pegawai')

// Create
router.post('/', async (req, res) => {
    const pegawaiPost = new Pegawai({
        nama: req.body.nama,
        alamat: req.body.alamat,
        jenisKelamin: req.body.jenisKelamin,
    })

    try {
        const pegawai = await pegawaiPost.save()
        res.json(pegawai)
    } catch (err) {
        res.json({ message: err })
    }
})

// Read
router.get('/', async (req, res) => {
    try {
        const pegawai = await Pegawai.find()
        res.json(pegawai)
    } catch (err) {
        res.json({ message: err })
    }
})

// Update
router.patch('/:pegawaiId', async (req, res) => {
    try {
        const pegawaiUpdate = await Pegawai.updateOne({ _id: req.params.pegawaiId }, {
            nama: req.body.nama,
            alamat: req.body.alamat,
            jenisKelamin: req.body.jenisKelamin,
        })
        res.json(pegawaiUpdate)
    } catch (err) {
        res.json({ message: err })
    }
})


// Delete
router.delete('/:pegawaiId', async (req, res) => {
    try {
        const pegawaiDelete = await Pegawai.deleteOne({ _id: req.params.pegawaiId })
        res.json(pegawaiDelete)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router