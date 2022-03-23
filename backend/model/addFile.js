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
  },
  status:{
    type:Boolean
  }
 
});

module.exports = mongoose.model(
  "addFile",
  addFile
);
