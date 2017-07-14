/**
 * Created by Haimov on 08/06/2017.
 */
'use strict';

let MIX = require('../models/mix');
let TRACK = require('../models/track');


    exports.goToHome = function (req, res) {
        res.sendfile(`../${__dirname}/index.html`);
    };

    exports.errorHandling = function (req, res) {
        res.json({"error": "404 - not found (Wrong input or Wrong url)"});
    };

    exports.getAllTracks = function (req, res) {
        TRACK.find({}, '-_id',
            (err, data) => {
                if (err) console.log(`query error: ${err}`);
                console.log(data);
                res.json(data);
            })
    };

    exports.getAllMixes = function (req, res) {
        MIX.find({},'-_id',
            (err, data) => {
                if (err) console.log(`query error: ${err}`);
                console.log(data);
                res.json(data);
            })
    };

    exports.getTtacksByMixName = function (req, res) {
        MIX.find({mix_name:{$eq:req.params.mixName}},'-_id',
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

    exports.getRandomTracks = function (req, res) {
        TRACK.aggregate({ $sample: { size: parseInt(req.params.trackCount) }},
            (err, tracks) => {
                if (err) console.log(`query error: ${err}`);
                console.log(tracks);
                res.json(tracks);
            })

    };

    exports.getRandomMixes = function (req, res) {
        MIX.aggregate({ $sample: { size: parseInt(req.params.mixCount) }},
            (err, mix) => {
                if (err) console.log(`query error: ${err}`);
                console.log(mix);
                res.json(mix);
            })
    };

    exports.createNewMix = function (req, res) {
    let newMix = new MIX(req.params.mix_name, req.params.creator, req.params.creation_date, req.params.img_src,
                        req.params.length, req.params.tracks_id);

        newMix.save((err, newMix) => {
            if (err)  console.error(`${err} something went wrong - mix was not saved properly!`);
            console.log(`new mix: ${newMix.mix_name} was been saved successfully`)
        });
        res.json(newMix);
    };