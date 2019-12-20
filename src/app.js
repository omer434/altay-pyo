const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

//Paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const data = require('../dao/temp-data');

//Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Altay-PYO'
    });
});

app.get('/projeler', (req, res) => {
    let hafta = req.query.hafta;
    let yil = req.query.yil;

    let subData = data.filter( t => {
        return t.yil == yil && t.hafta == hafta;
    });

    res.send({
       resp: subData
    });
})

app.listen(port, () => {
    console.log('Server is up on port' + port);
});

