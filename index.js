/**
 * Created by Haimov on 08/06/2017.
 */
'use strict';

const   express          = require('express'),
        bodyParser       = require('body-parser'),
        config           = require('./config'),
        app              = express(),
        port             = process.env.PORT || config.properties.PORT,
        moment           = require('moment'),
        magnetoModule    = require('./magneto-module');


app.use(bodyParser.json()); // parsing application/json
app.use(bodyParser.urlencoded({extended:true})); // parsing application/x-www-form-urlencoded
app.use('/assets', express.static(`${__dirname}/public`)); // public as assets
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/getAllMixes', (req, res, next) => {
    res.set('header-Two', 'All data');
    magnetoModule().getAllMixes()
        .then((result) => {
            result.length === 0 ? next() : res.json({"Mixes": result});
        })
        .catch((error) =>{
            console.error(error);
            next();
    });
});

app.get('/getAllTracks', (req, res, next) => {
    res.set('header-Two', 'All data');
    magnetoModule().getAllTracks()
        .then((result) => {
            result.length === 0 ? next() : res.json({"Tracks": result});
        })
        .catch((error) =>{
            console.error(error);
            next();
        });
});

app.all('*', (req, res) => {
    res.status(200).json({"status":"404",
        "error": "No results found",
        "description": "The data is missing, or your query is invalid.",
        "at": moment().format(config.messageTemplates.TIME_FORMAT)
    });
});
app.listen(port);
console.log(`listening on port ${port}`);