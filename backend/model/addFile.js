const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addFile = mongoose.Schema({
  
  fileupload: {
    type: String,
    required: true,
  },
  tags:[{
    type:String
  }
     
  ],
  path:{
    type:String
  }
 
});

module.exports = mongoose.model(
  "addFile",
  addFile
);
