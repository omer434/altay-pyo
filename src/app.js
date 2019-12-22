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

var fs = require('fs');

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

    let subData = data.tempData.filter(t => {
        return t.yil == yil && t.hafta == hafta;
    });

    res.send({
        resp: subData
    });
})

app.get('/yillar', (req, res) => {
    let yillar = data.haftalikOzet.map(t => {
        return t.yil;
    });

    yillar = [...new Set(yillar)];
    yillar.sort();
    yillar.reverse();

    res.send(yillar);
})

app.get('/pdf', (req, res) => {
    let pdfId = req.query.id;
    let currentPDF = data.pdfs.find(t => {
        return t.id == pdfId;
    });

    let pdfFolderPath = "pdf/";
    let fullPDFPath = pdfFolderPath + currentPDF.name;

    var stream = fs.readFileSync(fullPDFPath);
    let base64Data = stream.toString('base64');
    res.contentType("application/pdf");
    res.send({ resp: base64Data });
})

app.get('/haftalik-ozet', (req, res) => {
    let hafta = req.query.hafta;
    let yil = req.query.yil;

    let secilenHaftalikOzet = data.haftalikOzet.find(t => {
        return t.hafta == hafta && t.yil == yil;
    });

    console.log(secilenHaftalikOzet);

    if (secilenHaftalikOzet != undefined) {
        let currentPDF = data.pdfs.find(t => {
            return t.id == secilenHaftalikOzet.pdf;
        });

        let pdfFolderPath = "pdf/";
        let fullPDFPath = pdfFolderPath + currentPDF.name;

        var stream = fs.readFileSync(fullPDFPath);
        let base64Data = stream.toString('base64');
        res.contentType("application/pdf");
        res.send({ resp: base64Data });

    }
})

app.listen(port, () => {
    console.log('Server is up on port' + port);
});