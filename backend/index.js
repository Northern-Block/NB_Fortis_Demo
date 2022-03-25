const express=require('express')
const cors=require('cors')
const chokidar = require('chokidar');
const port=3005
const {mongoose}=require('./config/database')
const app=express()
const {routes}=require('./config/routes')
const dir=require('./config/default.json')
console.log(dir,'dir')
const http = require('http').Server(app);
const io = require("socket.io")(http, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

app.use(express.json())

io.on('connection', (socket) => {
  console.log('You are now connected to WEB-SOCKET...');
    // io.emit('message', "Refresh");
  socket.on('disconnect', function() {
    console.log('Got disconnect!');
 });
});
const watcher = chokidar.watch(dir.directoryPath, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    // persistent: false,
    ignoreInitial:true
  });
  
  let status=""
  watcher.on('add', path => { return io.emit('message', "Added");} )
    .on('change', path => {return io.emit('message', "Changed")})
    .on('unlink', path => {return io.emit('message', "Deleted");});
  

http.listen(3005);
app.use(express.json())
app.use(cors())
app.use('/fortis',require('./config/routes'));

// app.listen(port,()=>{
//     console.log('lisiting on port',port)
// })

