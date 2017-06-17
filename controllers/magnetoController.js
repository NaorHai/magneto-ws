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
            (err,mix) => {
                if (err) console.log(`query error: ${err}`);
                TRACK.find({track_id:{$in: mix[0].tracks_id}},
                    (err, tracks ) => {
                        if (err) console.log(`query error: ${err}`);
                        console.log(tracks);
                        res.json(tracks);
                });
            });
    };