const express = require('express')
const router = express.Router()
const connection = require('../dataBase/db_perpus')

router.get('/', async (req, res) => {
    connection.query('SELECT * FROM data_peminjaman ORDER BY peminjaman_ID', function (err, rows) {
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

router.post('/peminjamanBuku', async (req, res) => {
    let denda = 0
    let tanggal_pengembalian = "-"
    const { NIM, judulBuku, tanggal_peminjaman, tanggal_batas_peminjaman } = req.body
    connection.query(`SELECT * FROM data_buku WHERE judul = "${judulBuku}"`, (err, result) => {
        if (err) {
            throw err
        } else {
            if (res.status(200).json) {
                connection.query(`INSERT INTO data_peminjaman (NIM, book_ID, tanggal_peminjaman, tanggal_batas_peminjaman, tanggal_pengembalian,denda)  VALUES ("${NIM}", ${result[0].book_ID}, "${tanggal_peminjaman}", "${tanggal_batas_peminjaman}","${tanggal_pengembalian}", ${denda})`, (err, result) => {
                    if (err) throw err
                    res.status(200).json({
                        result,
                        metadata: "peminjaman berhasil"
                    })
                })
            }
        }
    })
})

router.post('/pengembalianBuku', async (req, res) => {
    const { NIM, judulBuku, tanggal_peminjaman, tanggal_pengembalian } = req.body
    connection.query(`SELECT * FROM data_buku WHERE judul = "${judulBuku}"`, (err, result) => {
        if (err) {
            throw err
        } else {
            if (res.status(200).json) {
                connection.query(`SELECT * FROM data_peminjaman WHERE NIM = "${NIM}" AND book_ID = ${result[0].book_ID} AND tanggal_peminjaman = "${tanggal_peminjaman}"`, (err, resultPeminjamanID) => {
                    if (err) throw err
                    else {
                        // console.log(resultt[0].peminjaman_ID)
                        let batas_pinjam = resultPeminjamanID[0].tanggal_batas_peminjaman
                        let pengembalian = resultPeminjamanID[0].tanggal_pengembalian
                        if (batas_pinjam < pengembalian) {
                            let selisih = pengembalian.getDate() - batas_pinjam.getDate()
                            let denda = selisih * 1000
                            connection.query(`UPDATE data_peminjaman SET tanggal_pengembalian = "${tanggal_pengembalian}, denda = ${denda}" WHERE peminjaman_ID = ${resultPeminjamanID[0].peminjaman_ID}`, (err, result) => {
                                if (err) {
                                    throw err
                                } else {
                                    res.status(200).json({
                                        result,
                                        metadata: "peminjaman berhasil"
                                    })
                                }
                            })
                        } else {
                            connection.query(`UPDATE data_peminjaman SET tanggal_pengembalian = "${tanggal_pengembalian}, denda = ${denda}" WHERE peminjaman_ID = ${resultPeminjamanID[0].peminjaman_ID}`, (err, result) => {
                                if (err) {
                                    throw err
                                } else {
                                    res.status(200).json({
                                        result,
                                        metadata: "peminjaman berhasil"
                                    })
                                }
                            })
                        }
                    }
                })

            }
        }
    })
})
module.exports = router