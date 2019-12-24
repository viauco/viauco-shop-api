const EventEmitter = require('events');

module.exports = (app) => {
    
    const bus = new EventEmitter();
    app.bus = bus;
    return bus;
}