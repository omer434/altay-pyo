const projeler = [{
        "id": 1,
        "yil": 2019,
        "hafta": 52,
        "pdf": [{ id: 3, name: "samp3.pdf" }, { id: 2, name: "samp2.pdf" }],
        "proje": "SBS",
        "dosya-adi": "Sanayi Bilgi Sistemi"
    },
    {
        "id": 2,
        "yil": 2019,
        "hafta": 52,
        "pdf": [{ id: 2, name: "samp2.pdf" }],
        "proje": "TIBOS",
        "dosya-adi": "Ticaret Borsaları Bilgi Sistemi"
    },
    {
        "id": 3,
        "yil": 2019,
        "hafta": 50,
        "pdf": [{ id: 1, name: "samp1.pdf" }],
        "proje": "PERBIS",
        "dosya-adi": "Perakende Bilgi Sistemi"
    }
];

const pdfs = [{
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

const haftalikOzet = [{
        "yil": 2020,
        "hafta": 1,
        "pdf": 3
    },
    {
        "yil": 2019,
        "hafta": 52,
        "pdf": 1
    },
    {
        "yil": 2018,
        "hafta": 51,
        "pdf": 2
    },
    {
        "yil": 2017,
        "hafta": 51,
        "pdf": 1
    }
]


module.exports = { projeler, pdfs, haftalikOzet };