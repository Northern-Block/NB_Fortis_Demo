const express=require('express')
const router=express.Router()
const {addFileUpload ,getAllFile,deleteFile,downloadfile,} = require("../controller/addFileController")

const multer = require("multer");
var fs = require('fs');
const config=require('config')
const path=config.get('directoryPath')
var dir = path;

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir,{recursive:true});
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, `uploads`);
    cb(null,dir)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
    storage,

  });
  router.post("/addfile",upload.single("fileupload"),  addFileUpload );
  router.get("/getfile",  getAllFile );
  router.post('/deletefile',deleteFile);
  router.post('/downloadfile',downloadfile);
  // router.get('/watcherfile',fileWatcher);
  
  module.exports = router;