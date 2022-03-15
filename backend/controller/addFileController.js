const addFile= require("../model/addFile");
const _ = require("lodash");
const express = require("express");
var fs = require('fs');

const app = express();
let dir ='./tmp/vertix'

exports.addFileUpload = async (req, res) => {
  try {
    // if (!fs.existsSync(dir)){
    //     fs.mkdirSync(dir,{recursive:true});
    // }
    const data = req.body;
   
    if (req.file) {
    
      data.fileupload = req.file.filename;
      data.tags= req.body.tags;
      data.path=req.file.path
      console.log(req.file.filename,'data has been modifieds')
         
    }
    
    const newStore = new addFile(data);
    // const result = await newStore.save();
    return res.status(201).json({ error: "", data: newStore });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

exports.getAllFile = async (req, res) => {
    try {
     
        let fileData =''
        fs.readdir('tmp', (err, files) => {
           files&&files.length>0 && files.forEach(file => {
              console.log(file);
              fileData=file+ '#'+fileData
           
            });
            return res.status(201).json({ error: "",  data:fileData });
      });
   
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "Something went wrong", message: error.message });
    }
  };


exports.path = `${__dirname}`;
