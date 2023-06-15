const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorizeAdmin = require('_middleware/authorizeAdmin');
const authorize = require('_middleware/authorize');
const db = require('_helpers/db');
const fileService = require('./fileUploads.service')

const multer = require('multer');
let whitelist = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'application/msword',
  'image/jpeg',
  'image/jpg',
  'image/png'
];
let userwhitelist = [
  'image/jpeg',
  'image/jpg',
  'image/png'
];
let pdfLists = [
  'application/pdf'
];


let maxSize = 10000000
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  onFileUploadStart: function(file, req, callback){
    if(req.file.length > maxSize) {
      return  callback(new Error('File Size is Bigger allowed'));
    }
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
let fileFilter = (req, file, callback, next) => {
  if (!whitelist.includes(file.mimetype)) {
    return callback(new Error('file is not allowed'))
  }
  callback(null, true);
};
let userfileFilter = (req, file, callback, next) => {
  // console.log(file.mimetype);
  if (!userwhitelist.includes(file.mimetype)) {
    return callback(new Error('file is not allowed'))
  }
  callback(null, true);
};
let ImageFilter = (req, file, callback, next) => {
  // console.log(file.mimetype);
  if (!userwhitelist.includes(file.mimetype)) {
    return callback(new Error('file is not allowed'))
  }
  callback(null, true);
};
let pdfFilter = (req, file, callback, next) => {
  if (!pdfLists.includes(file.mimetype)) {
    return callback(new Error('file is not allowed'))
  }
  callback(null, true);
};
const uploadImage = multer({ storage: storage, fileFilter: fileFilter, limits: { fieldNameSize: 1048576 } }).single('image');
const uploaduserImage = multer({ storage: storage, fileFilter: userfileFilter, limits: { fieldNameSize: 1048576 } }).single('image');
const Image = multer({ storage: storage, fileFilter: ImageFilter, limits: { fieldNameSize: 1048576 } }).single('image');
const Pdf = multer({ storage: storage, fileFilter: pdfFilter, limits: { fieldNameSize: 1048576 } }).single('image');



// routes
router.post('/upload', authenticateSchema, upload);
router.post('/uploadUser', authorize(), authenticateSchema, Userupload);
router.post( '/imgupload' , authenticateSchema ,Imgupload  )
router.post( '/pdfupload' , authenticateSchema ,pdfUpload  )

router.get('/', getAll)
router.get('/:id', getById),

  module.exports = router;

function authenticateSchema(req, res, next) {
  // const schema = Joi.object({
  //     courseName: Joi.string().required()
  // });
  // validateRequest(req, next, schema);
  next();
}


function upload(req, res, next) {
  uploadImage(req, res, function (err) {
    if (err) {
      console.log(err);
      res.json({ message: 'Error uploading file' });

    }
    else {
      db.G2SfileUploads.create({ filePath: req.file.filename })
        .then((data) => {
          //console.log();
          res.json({ message: 'File is uploaded successfully!', file: data.get() })
        })
        .catch(next);
    }
  });
}
function Userupload(req, res, next) {
  uploaduserImage(req, res, function (err) {
    if (err) {
      console.log(err);
      res.json({ message: 'Error uploading file' });

    }
    else {
      db.G2SfileUploads.create({ filePath: req.file.filename })
        .then((data) => {
          //console.log();
          res.json({ message: 'File is uploaded successfully!', file: data.get() })
        })
        .catch(next);
    }
  });
}
function Imgupload(req, res, next) {
  Image(req, res, function (err) {
    if (err) {
      console.log(err);
      res.json({ message: 'Error uploading file' });

    }
    else {
      db.fileUploads.create({ filePath: req.file.filename })
        .then((data) => {
          //console.log();
          res.json({ message: 'File is uploaded successfully!', file: data.get() })
        })
        .catch(next);
    }
  });
}
function pdfUpload(req, res, next) {
  Pdf(req, res, function (err) {
    if (err) {
      console.log(err);
      res.json({ message: 'Error uploading file' });
    }
    else {
      db.G2SfileUploads.create({ filePath: req.file.filename })
        .then((data) => {
          res.json({ message: 'File is uploaded successfully!', file: data.get() })
        })
        .catch(next);
    }
  });
}


function getAll(req, res, next) {
  fileService.getAll(req.query.page, req.query.limit)
    .then(lists => res.json(lists))
    .catch(next);
}

function getById(req, res, next) {
  fileService.getById(req.params.id)
    .then(list => res.json(list))
    .catch(next);
}
