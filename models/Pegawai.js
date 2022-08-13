const monggoose = require('mongoose')

const PegawaiSchema = new monggoose.Schema({
    nama: { type: String, required: true },
    alamat: { type: String, required: true },
    jenisKelamin: { type: String, required: true },
    tglTerdaftar: { type: Date, default: Date.now },
})

module.exports = monggoose.model('Pegawai', PegawaiSchema)