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



exports.getTracksByMixName = function (req, res) {
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
        let length = 0;
        TRACK.find({track_id:{$eq:req.params.trackId1}},
            (err, tracks ) => {
                if (err) console.log(`query error: ${err}`);
                length = tracks[0].length;
                TRACK.find({track_id:{$eq:req.params.trackId2}},
                    (err, tracks ) => {
                        if (err) console.log(`query error: ${err}`);
                        length += tracks[0].length;
                        TRACK.find({track_id:{$eq:req.params.trackId3}},
                            (err, tracks ) => {
                                if (err) console.log(`query error: ${err}`);
                                length += tracks[0].length;
                                let fullDate = new Date();
                                let newMix = new MIX({ mix_name: req.params.mixName,
                                    creator: req.params.creator,
                                    creation_date: fullDate,
                                    img_src: 'assets/mixTiles/mix11.jpg',
                                    length: length,
                                    tracks_id: [
                                        req.params.trackId1,
                                        req.params.trackId2,
                                        req.params.trackId3,
                                    ]});
                                newMix.save(
                                    (err) => {
                                        if (err)  console.error(`${err} something went wrong - mix was not saved properly!`);
                                        console.log(`new mix: ${newMix} was been saved successfully`)
                                    }
                                );
                            });
                    });
            });
    };
    exports.dropMix = function (req, res) {
        MIX.remove({mix_name:{$eq:req.params.mixName}},
            (err,mix) => {
                if (err) console.log(`query error: ${err}`);
                else console.log(`${mix} was deleted successfully!`);
            });
    };