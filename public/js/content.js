var seciliYil, seciliHafta;

$(document).ready(function () {


    if (window.history && window.history.pushState) {

        window.history.pushState('forward', null, './#forward');

        $(window).on('popstate', function () {
            $(".prev-step").click();
        });

    }

    let oncekiAdimId = '';

    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);

        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    //Geri butonu
    $(".prev-step").click(function (e) {
        gotToTab(oncekiAdimId);
    });

    //Başlangıç Sayfası
    $("#btnYillaraGoreSorgula").click(function (e) {
        oncekiAdimId = 'a-baslangic';
        gotToTab('a-yillar');

    });

    $("#btnProjelereGoreSorgula").click(function (e) {
        // oncekiAdimId = 'a-baslangic';
        // gotToTab('a-projeler');
    });

    $(".btn-yil").click(function (e) {
        seciliYil = $(e.currentTarget).attr("data-item");
        oncekiAdimId = 'a-yillar';
        gotToTab('a-haftalar');
    })

    $(".btn-hafta").click(function (e) {
        seciliHafta = $(e.currentTarget).attr("data-item");
        oncekiAdimId = 'a-haftalar';
        gotToTab('a-projeler');
        getProjeler();
    })

    $("#a-yillar").click(function (e) {
        oncekiAdimId = 'a-baslangic';
    })

    $("#a-projeler").click(function (e) {
        oncekiAdimId = 'a-haftalar';
    })

    $("#a-haftalar").click(function (e) {
        oncekiAdimId = 'a-yillar';
    })

    $('body').on('click', '.pdf-item', function (e) {
        let pdfId = $(e.currentTarget).attr("data-pdf-id");
        fetch('/pdf?id=' + pdfId).then(res => {
            res.json().then(data => {
                let pdf = data.resp;

                $('#modal-pdf').modal('show');

                let pdfStr = "data:application/pdf;base64, " + pdf;
                $("#pdf-viewer").attr("src", pdfStr);



                // let pdfWindow = window.open("")
                // pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(pdf)+"'></iframe>")
            });
        });
    });
});

function gotToTab(tabId) {
    $("#" + tabId).click().animate({ opacity: 0 }, 5000);
}

//AJAX calls
function getProjeler() {
    fetch('/projeler?yil=' + seciliYil + '&hafta=' + seciliHafta + '').then(res => {
        res.json().then(data => {
            let projeler = data.resp.map(t => t.proje);
            projeler = [...new Set(projeler)];

            $("#projeler").empty();
            for (let i = 0; i < data.resp.length; i++) {
                $("#projeler").append(projeAccordion(data.resp[i]));
            }
        });
    });
}

let projeAccordion = function (data) {
    let div = $("<div id=proje_" + data.id + "></div>");
    $(div).append('<span class="btn btn-info" data-toggle="collapse" data-target="#proje_content_' + data.id + '"><h1 class="display-3">' + data['proje'] + '</h1><p class="lead">' + data['dosya-adi'] + '</p></span>');
    $(div).append('<hr />');

    let list = $("<ul></ul>");
    for (let i = 0; i < data['pdf'].length; i++) {
        $(list).append("<li class='list-group-item list-group-item-action pdf-item' data-pdf-id='" + data['pdf'][i]['id'] + "'><h1 class='display-4'>"+ data['pdf'][i]['name'] + "</h1></li>");
    }

    let collapsable = $('<div id="proje_content_' + data.id + '" class="collapse"></div>');
    $(collapsable).append(list);
    $(div).append(collapsable);

    return div;
}
