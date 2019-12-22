var secilenYil, secilenHafta;

$(document).ready(function() {

    if (window.history && window.history.pushState) {

        window.history.pushState('forward', null, './#forward');

        $(window).on('popstate', function() {
            $(".prev-step").click();
        });

    }

    let oncekiAdimId = '';

    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {

        var $target = $(e.target);

        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    //Geri butonu
    $(".prev-step").click(function(e) {
        gotToTab(oncekiAdimId);
    });

    //Başlangıç Sayfası
    $("#btnYillaraGoreSorgula").click(function(e) {
        oncekiAdimId = 'a-baslangic';
        gotToTab('a-yillar');

    });

    $("#btnProjelereGoreSorgula").click(function(e) {
        oncekiAdimId = 'a-baslangic';
        gotToTab('a-projeler');
    });

    $(".btn-yil").click(function(e) {
        secilenYil = $(this).attr('data-item');
        oncekiAdimId = 'a-yillar';
        gotToTab('a-haftalar');
    })

    $(".btn-hafta").click(function(e) {
        secilenHafta = $(this).attr('data-item');
        oncekiAdimId = 'a-haftalar';
        getHaftalikOzet();
    })

    $("#a-yillar").click(function(e) {
        oncekiAdimId = 'a-baslangic';
    })

    $("#a-projeler").click(function(e) {
        oncekiAdimId = 'a-haftalar';
    })

    $("#a-haftalar").click(function(e) {
        oncekiAdimId = 'a-yillar';
    })
});

function gotToTab(tabId) {
    $("#" + tabId).click().animate({ opacity: 0 }, 5000);
}

function getProjeler() {
    const res = fetch('/projeler').then(res => {
        res.json().then(data => {
            console.log(data);

        });
    });
}

{
    /* <object data="data:application/pdf;base64, your_base64_data" type="application/pdf">
    <iframe src="https://docs.google.com/viewer?&embedded=true"></iframe>
    </object> */
}

function getHaftalikOzet() {
    const res = fetch('/haftalik-ozet?yil=' + secilenYil + '&hafta=' + secilenHafta).then(res => {
        res.json().then(data => {
            // let pdfViewer = '<object style="position:absolute; height:100%; width: 100%" data="data:application/pdf;base64, ' + data.resp + '" type="application/pdf"><iframe src="https://docs.google.com/viewer?&embedded=true"></iframe></object>';
            // $("#pdfResult").append(pdfViewer);
            // $("#showModalPdf").click();

            easyPDF(data.resp, "Haftalık Rapor")
        });
    });
}


function getPdf() {
    const res = fetch('/pdf').then(res => {
        res.json().then(data => {
            console.log(data);
        });
    });
}

async function populateYillar() {
    const res = fetch('/yillar').then(res => {
        res.json().then(data => {

        });
    })
}