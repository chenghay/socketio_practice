var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection',function(client){
    console.log('Client connected...');
    //client.emit('message',{hello:'world'});
    client.on('join',function(name){
       client.nickname = name; 
    });
    client.on('messages',function(data){
       console.log(data);
       var nickname = client.nickname;
       client.broadcast.emit("messages",nickname + ": " + data);
       client.emit("messages",nickname + ": " + data);
    });
});

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

server.listen(8080);

console.log('listening to port 8080');