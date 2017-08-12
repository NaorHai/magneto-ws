/**
 * Created by Haimov on 08/06/2017.
 */
require('./database');
require('./server');

// var AWS = require('aws-sdk');
// // AWS.config.update({region:'us-west-2'});
// AWS.config.update({
//     accessKeyId: "AKIAJQXEMDUMGL3OIYVQ",
//     secretAccessKey: "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",
//     "region": "us-west-2"
// });
//
// var ec2 = new AWS.EC2();
//
// var params = {
//     InstanceId: 'i-08ee98b89c6950efd' /* required */
//     // DryRun: false
// };
// ec2.getConsoleOutput(params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(data);           // successful response
// });

































// 'use strict';
//
// const   express          = require('express'),
//         bodyParser       = require('body-parser'),
//         config           = require('./config'),
//         app              = express(),
//         port             = process.env.PORT || config.properties.PORT,
//         moment           = require('moment'),
//         magnetoModule    = require('./magneto');
//
//
// app.use(bodyParser.json()); // parsing application/json
// app.use(bodyParser.urlencoded({extended:true})); // parsing application/x-www-form-urlencoded
// app.use('/assets', express.static(`${__dirname}/public`)); // public as assets
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
//
// app.get('/getAllMixes', (req, res, next) => {
//     res.set('header-Two', 'All mixes');
//     magnetoModule().getAllMixes().then((result) => {
//         result.length === 0 ? next() : res.json({"Mixes": result});
//     }).catch((error) =>{
//         console.error(error);
//         next();
//     });
// });
//
// app.get('/getAllTracks', (req, res, next) => {
//     res.set('header-Two', 'All tracks');
//     magnetoModule().getAllTracks().then((result) => {
//         result.length === 0 ? next() : res.json({"Tracks": result});
//     }).catch((error) =>{
//         console.error(error);
//         next();
//     });
// });
//
//
// app.all('*', (req, res) => {
//     res.status(200).json({"status":"404",
//         "error": "No results found",
//         "description": "The data is missing, or your query is invalid.",
//         "at": moment().format(config.messageTemplates.TIME_FORMAT)
//     });
// });
// app.listen(port);
// console.log(`listening on port ${port}`);