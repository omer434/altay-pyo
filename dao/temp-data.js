const tempData = [
    {
        "id": 1,
        "yil": 2019,
        "hafta": 52,
        "pdf": [{id: 3, name: "samp3.pdf"}, {id: 2, name: "samp2.pdf" }],
        "proje": "SBS",
        "dosya-adi": "Sanayi Bilgi Sistemi"
    },
    {
        "id": 2,
        "yil": 2019,
        "hafta": 52,
        "pdf": [{id: 2, name: "samp2.pdf"}],
        "proje": "TIBOS",
        "dosya-adi": "Ticaret Borsaları Bilgi Sistemi"
    },
    {
        "id": 3,
        "yil": 2019,
        "hafta": 50,
        "pdf": [{id: 1, name: "samp1.pdf"}],
        "proje": "PERBIS",
        "dosya-adi": "Perakende Bilgi Sistemi"
    }
];

const pdfs= [
    {
        "id": 1,
        "name": "samp1.pdf",
    },
    {
        "id": 2,
        "name": "samp2.pdf",
    },
    {
        "id": 3,
        "name": "samp3.pdf",
    }
];

module.exports = {tempData, pdfs};