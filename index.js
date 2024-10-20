const express = require('express');
const multer = require('multer')
const path = require('path');
const fs = require('fs');

const app = express();

// Set up the storage for the uploaded files

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb){
		cb(null, file.originalname)
	}
})

// Set up the multer instance

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	}
})

app.get( '/', (req, res) =>{
	res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/upload', upload.single('file'), (req, res) => {
	res.redirect('/')
})

app.post('/users')

app.get("/files", (req, res) => {
	fs.readdir("uploads/", (err, files) => {
		if (err) {
			console.error(err);
			return res.status(500).send("Erro ao listar os arquivos.");
		}
		const fileInfos = files.map((file) => ({
			name: file,
			url: `/uploads/${file}`,
		}));
		res.json(fileInfos);
	});
});

// Servir arquivos estáticos na pasta 'uploads'
app.use("/uploads", express.static("uploads"));

app.listen(3000, () =>{
	console.log('Server started on port 3000')
})