const express = require('express')
const router = express.Router()
const connection = require('../dataBase/db_perpus')

router.get('/', async(req,res)=>{
    connection.query('SELECT * FROM data_mahasiswa ORDER BY NIM', function (err, rows) {
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

router.post('/registrasi', async (req, res) => {
    const { NIM, nama, jurusan } = req.body

    connection.query(`INSERT INTO data_mahasiswa (NIM, nama, jurusan)  VALUES ("${NIM}", "${nama}","${jurusan}")`, (err, result) => {
        if (err) throw err
        res.status(200).json({
            registered: result,
            metadata: "registrasi sukses"
        })
    })
})



module.exports = router