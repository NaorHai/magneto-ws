/**
 * Created by Haimov on 15/06/2017.
 */
const consts   = require('./config').properties.AWS,
    mongoose = require('mongoose');


mongoose.Promise = global.Promise;
//The server option auto_reconnect is defaulted to true
let options = {
    server: {
        auto_reconnect:true,
    }
};
mongoose.connect(consts, options);
const conn = mongoose.connection;//get default connection
// Event handlers for Mongoose
conn.on('error', function (err) {
    console.log('Mongoose: Error: ' + err);
});
conn.on('open', function() {
    console.log('Mongoose: Connection established');
});
conn.on('disconnected', function() {
    console.log('Mongoose: Connection stopped, recconect');
    mongoose.connect(consts, options);
});
conn.on('reconnected', function () {
    console.info('Mongoose reconnected!');
});