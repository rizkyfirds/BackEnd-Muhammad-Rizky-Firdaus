const express = require('express')
const cors = require('cors')
const port = 3002

const mahasiswaEndpoint = require('./routes/mahasiswa')
const bukuEndpoint = require('./routes/buku')
const peminjamanEndpoint = require('./routes/peminjamanBuku')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/mahasiswa', mahasiswaEndpoint)
app.use('/buku', bukuEndpoint)
app.use('/peminjaman', peminjamanEndpoint)

app.listen(port, () =>  console.log(`running server on port ${port}`))