//サーバ処理
var express = require('express');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 7000;
//ゲーム処理
let player01 = false;
let player02 = false;

//ルート
app.get('/' , function(req, res){
    res.sendFile(__dirname+'/index.html');
});

//サーバ監視
http.listen(PORT, function(){
    console.log('server listening. Port:' + PORT);
});

/////////////////////////////////////////////////////////////////////////////////////////////
//socket
io.on('connection',function(socket){
  socket.on('joinPlayer', function(){
      if(!player01) {
        player01 = true;
        io.sockets.emit('joinPlayer01');
      } else if(!player02){
        player02 = true;
        io.sockets.emit('joinPlayer02');
        console.log('test');
      }
    });
    socket.on('movePlayer01_from_front',(player01_y) => {
      socket.broadcast.emit('movePlayer01_from_server', player01_y);
    });
    socket.on('movePlayer02_from_front',(player02_y) => {
      socket.broadcast.emit('movePlayer02_from_server', player02_y);
    });
    socket.on('moveBall_from_front',(ball) => {
      socket.broadcast.emit('moveBall_from_server', ball);
    });
    socket.on('startPlayer01_from_front', ()=> {
      socket.broadcast.emit('startPlayer01_from_server');
    });
    socket.on('startPlayer02_from_front', () => {
      socket.broadcast.emit('startPlayer02_from_server');
    });
});