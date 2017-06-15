/**
 * Created by Haimov on 08/06/2017.
 */
'use strict';

const   mongoose = require('mongoose');

let MIX = require('../models/mix');
let TRACK = require('../models/track');

    exports.getAllTracks = function (req, res) {
        TRACK.find({},
            (err, data) => {
                if (err) console.log(`query error: ${err}`);
                console.log(data);
                res.json(data);
            })
    };

    exports.getAllMixes = function (req, res) {
        MIX.find({},
            (err, data) => {
                if (err) console.log(`query error: ${err}`);
                console.log(data);
                res.json(data);
            })
    };

    exports.getTtacksByMixName = function (req, res) {


        MIX.find({mix_name:{$eq:req.params.mixName}},
            (err,data)=>{
                if (err) console.log(`query error: ${err}`);
            console.log(data);

            });


    };



    // getTracksById(id1,id2, id3) {
    //     return new Promise( (resolve,reject) =>{
    //         Movies.find({track_id: {$eq: id1} || {$eq: id2} || {$eq: id3} }, (err, result) => {
    //             if (err) reject(err);
    //             else {
    //                 console.log(`Got data from db: ${result}`);
    //                 resolve(result);
    //             }
    //         });
    //     });
    // }
