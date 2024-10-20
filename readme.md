## CRIANDO UMA APLICAÇÃO DE UPLOAD

1. Instale os pacotes do express e do multer `npm i express multer`

2. Crie a aplicação para fazer o upload do arquivo com multer e express no arquivo index.js

```javascript
const express = require('express');
const multer = require('multer')
const path = require('path');

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

app.listen(3000, () =>{
	console.log('Server started on port 3000')
})
````
3. Crie o index.html para fazer o envio do arquivo

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Upload de arquivo</title>
</head>
<body>
	<form action="/upload" method="post" enctype="multipart/form-data">
		<input type="file" name="file">
		<button type="submit">Enviar</button>
	</form>
</body>
</html>
```

