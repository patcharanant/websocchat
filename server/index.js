const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http,{cors: { origin: "*" }});
const port = 5500

app.use(express.static('/root/KYCHAT/app'));

app.get('/', (req, res) => {
    res.sendFile('/root/KYCHAT/app/index.html');
  });
  
io.on('connection', (socket) => {
    console.log(socket.id + 'connected');

    socket.on('message',(message) => {
        console.log(message);
        io.emit('message',socket.id.substr(0,2) + " says: " + message);
    });
  })

http.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })