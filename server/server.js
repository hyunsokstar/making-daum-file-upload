const express = require('express')
const multer = require('multer')
const { v4: uuid } = require('uuid')
const mime = require('mime-types')


console.log('uuid : ', uuid())

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  // filename: (req, file, cb) => cb(null, file.originalname),
  // filename: (req, file, cb) =>
  // cb(null, `${uuid()}.${mime.extension(file.mimetype)}`),
  filename: (req, file, cb) =>
    cb(null, `${uuid()}.${mime.extension(file.mimetype)}`),
})

// const upload = multer({ storage })
const upload = multer({
  storage,
  // fileFilter: (req, file, cb) => {
  //   if (['image/png', 'image/jpeg'].includes(file.mimetype)) {
  //     cb(null, true)
  //   } else {
  //     cb(new Error('invalid file type'), false)
  //   }
  // },
  // limits: {
  //   fileSize: 1024 * 1024 * 5,
  // },
})

const app = express()
const PORT = 5000

// express.static("uploads") 으로 스태틱 폴더를 설정하면 uploads 폴더의 이미지에 url 로 접근할수 있게 된다. 
app.use('/uploads', express.static('uploads'))

// app.post('/upload', upload.single('image'), (req, res) => {
app.post('/upload', upload.array('image', 5), async (req, res) => {
  console.log(req.file)
  res.json(req.file)

})

app.listen(PORT, () => console.log('Express server listening on PORT ' + PORT));
