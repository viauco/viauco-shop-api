module.exports = (app) => {
    const socket = require("socket.io")(app);
    socket.on('connection', (sock) => {
        
    });
    app.socket = socket;

    return socket;
}