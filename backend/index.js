const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const userRoutes = require('./src/web/routes/UserRoutes');
const messageRoutes = require('./src/web/routes/MessageRoutes');
const conversationRoutes = require('./src/web/routes/ConversationRoutes');
let middleware = require('./src/config/tokenMiddleware');

const app = express();
mongoose.connect('mongodb://localhost/messenger');
const db = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.all('*', middleware.checkToken)
app.use('/api/users', userRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/conversations', conversationRoutes)

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (client) => { 
    console.log('Client connected!!');
    client.on('new-message', (message) => {
        client.broadcast.emit(`conversation/${message.conversation}`, message);
        client.emit(`conversation/${message.conversation}`, message);
    });
});
server.listen(3000, function() {
    console.log('Server started on port 3000!')
});
