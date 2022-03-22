const addFile = require("../model/addFile");
const _ = require("lodash");
const express = require("express");
var fs = require('fs');
const config=require('config')
const path=config.get('directoryPath')

const app = express();
// let dir ='./tmp/vertix'
var dir = path;

fs.watch(dir, (eventType, filename) => {
  console.log("--------------------------!");
  console.log("\nThe file", filename, "was modified!");
  
  console.log("The type of change was:", eventType);
});

exports.addFileUpload = async (req, res) => {
  try {
    // if (!fs.existsSync(dir)){
    //     fs.mkdirSync(dir,{recursive:true});
    // }

    const data = req.body;

    if (req.file) {

      data.fileupload = req.file.filename;
      data.tags = req.body.tags;
      data.path = req.file.path
      // console.log(req.file.filename, 'data has been modifieds')

    }

    // const newStore = new addFile(data);
    // const result = await newStore.save();
    return res.status(201).json({ error: "", data });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

exports.getAllFile = async (req, res) => {
  try {

    let fileData = ''
    // let filePath=''
    fs.readdir(dir, (err, files) => {

      files && files.length > 0 && files.forEach(file => {

        // console.log(files);
        fileData = file + '#' + fileData
        // filePath= dir+'\\'+file+'#'+filePath

      });

      return res.status(201).json({ error: "", data: fileData, filePath: dir + '\\' });
    });

  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};
exports.downloadfile = async (req, res) => {
  try {
    // console.log('here')
    function base64_encode(file) {
      // read binary data
      var bitmap = fs.readFileSync(file);
      // convert binary data to base64 encoded string
      return new Buffer(bitmap).toString('base64');
  }

    const file = req.body.path
    const result=  base64_encode(file)
    // console.log(result)
    res.send(result); // Set disposition and send it.

  }

  catch (error) {
    return res
      .status(500)
      .json({ error: 'Something went wrong', message: error.message });
  }
}

exports.deleteFile = async (req, res) => {
  try {

    let resultHandler = function (err) {
      if (err) {
        return res
          .status(500)
          .json({ error: 'Something went wrong', message: 'File not deleted' });
      } else {
        return res
          .status(200)
          .json({ error: '', message: 'File Deleted', deletedPath: req.body.path });
      }
    }

    fs.unlink(req.body.path, resultHandler);
    
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Something went wrong', message: error.message });
  }
};


exports.path = `${__dirname}`;
exports.path = `${__dirname}`;