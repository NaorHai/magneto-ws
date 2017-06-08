/**
 * Created by Haimov on 08/06/2017.
 */
'use strict';

const   mongoose = require('mongoose'),
        config   = require('./config').properties.MLAB_KEY,
        Mix      = require('./models/mix').Mixes,
        Track    = require('./models/track').Tracks,
        Promise  = require('promise');

mongoose.connect(config); //get MLAB_KEY
const conn = mongoose.connection; //get default connection

conn.on('error', (err) => { // if err
    console.log(`connection error: ${err}`);
});

class magnetoModule {

    getAllTracks() {
        return new Promise( (resolve,reject) =>{
            Track.find({},'-_id', // without _id
                (err, result) => {
                if (err) reject(err);
                else {
                    console.log(`Got data from db: ${result}`);
                    resolve(result);
                }
            });
        });
    }

    getAllMixes() {
        return new Promise( (resolve,reject) =>{
            Mix.find({},'-_id', // without _id
                (err, result) => {
                if (err) reject(err);
                else {
                    console.log(`Got data from db: ${result}`);
                    resolve(result);
                }
            });
        });
    }

    getTracksById(id1,id2, id3) {
        return new Promise( (resolve,reject) =>{
            Movies.find({track_id: {$eq: id1} || {$eq: id2} || {$eq: id3} }, (err, result) => {
                if (err) reject(err);
                else {
                    console.log(`Got data from db: ${result}`);
                    resolve(result);
                }
            });
        });
    }


    // filterDocosByMinYearAndDuration(year, duration) {
    //     return new Promise( (resolve,reject) =>{
    //         Movies.find({year:{$gt: year}, duration:{$gt:duration}}, (err, result) => {
    //             if (err) reject(err);
    //             else {
    //                 console.log(`Got data from db: ${result}`);
    //                 resolve(result);
    //             }
    //         });
    //     });
    // }
}

module.exports = () => {
    return new magnetoModule();
};