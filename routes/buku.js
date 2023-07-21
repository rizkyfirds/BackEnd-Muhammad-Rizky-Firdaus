const express = require('express')
const router = express.Router()
const connection = require('../dataBase/db_perpus')

router.get('/', async (req, res) => {
    connection.query('SELECT * FROM data_buku ORDER BY book_ID', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: "Internal Server Error",
            })
        } else {
            return res.status(200).json({
                status: true,
                message: "Get Users Success",
                data: rows
            })
        }
    })
})

router.post('/pendaftaranbuku', async (req, res) => {
    const { judul, penulis, kuantitas, tempat_penyimpanan } = req.body

    connection.query(`INSERT INTO data_buku (judul, penulis, kuantitas, tempat_penyimpanan)  VALUES ("${judul}", "${penulis}",${kuantitas},"${tempat_penyimpanan}")`, (err, result) => {
        if (err) throw err
        res.status(200).json({
            registered: result,
            metadata: "buku berhasil ditambahkan"
        })
    })
})

router.delete('/hapusbuku', async (req, res) => {
    const { judulBuku } = req.body
    connection.query(`SELECT * FROM data_buku WHERE judul = "${judulBuku}"`, (err, result) => {
        if (err) {
            throw err
        }else{
            if (res.status(200).json){
                connection.query(`DELETE FROM data_buku WHERE book_ID = ${result[0].book_ID}`, (err, result) => {
                    if (err) throw err
                    res.status(200).json({
                        metadata: "buku berhasil dihapus"
                    })
                })
            }
        }
    })
})

router.put('/ubahkuantitas',async (req, res) => {
    const { judulBuku, kuantitasBaru } = req.body
    connection.query(`SELECT * FROM data_buku WHERE judul = "${judulBuku}"`, (err, result) => {
        if (err) {
            throw err
        }else{
            if (res.status(200).json){
                connection.query(`UPDATE data_buku SET kuantitas = ${kuantitasBaru} WHERE book_ID = ${result[0].book_ID}`, (err, result) => {
                    if (err) throw err
                    res.status(200).json({
                        result,
                        metadata: "data buku berhasil diperbaharui"
                    })
                })
            }
        }
    })
})



module.exports = router