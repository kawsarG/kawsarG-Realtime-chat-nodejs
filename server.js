const express = require('express');

const app = express();
const http = require('http').createServer(app);



//static
app.use(express.static(__dirname + '/public'));



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});
//socket
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    })
})



const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
    console.log(`Server is started at port ${PORT}`);
});