const addFile = require("../model/addFile");
const _ = require("lodash");
const express = require("express");
const chokidar = require('chokidar');
var fs = require('fs');
const config = require('config')
const path = config.get('directoryPath')
const app = express();
// let dir ='./tmp/vertix'
var dir = path;
let message = ""

exports.addFileUpload = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.fileupload = req.file.filename;
      data.tags = req.body.tags;
      data.path = req.file.path
    }
    console.log("====>File is added from backend...")
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
    fs.readdir(dir, (err, files) => {
      files && files.length > 0 && files.forEach(file => {
        fileData = file + '#' + fileData
      });
      console.log("---->Fetching all files from backend...", dir + '\\')
      return res.status(201).json({ error: "", data: fileData, filePath: dir + '//' });
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
    const result = base64_encode(file)
    console.log(" ====>Backend resposne of downloading a file")
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
        console.log("=====>File is deleted from backend")
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
