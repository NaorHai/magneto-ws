/**
 * Created by Haimov on 15/06/2017.
 */
const   express = require('express'),
        app = express(),
        magneto = require('./controllers/magnetoController'),
        PORT   = require('./config').properties.PORT,
        port = process.env.PORT || PORT;
app.set('port',port);
app.use('/', express.static('./public'));
app.use('/assets', express.static(`${__dirname}/public`)); // public as assets
app.use(
    (req,res,next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

/* All routes  */
app.get('/', (req,res) =>{
    res.sendfile(`${__dirname}/index.html`);
});

app.get('/getAllTracks', magneto.getAllTracks);

app.get('/getAllMixes', magneto.getAllMixes);

app.get('/get/:mixName', magneto.getTracksByMixName);

app.get('/getRandomTracks/:trackCount', magneto.getRandomTracks);

app.get('/getRandomMixes/:mixCount', magneto.getRandomMixes);

app.get('/createNewMix', magneto.createNewMix);

app.get('/dropMix', magneto.dropMix);

app.all('*', magneto.errorHandling);

app.listen(port, () => {console.log(`listening on port ${port}`);});