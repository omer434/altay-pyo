var seciliYil, seciliHafta;

$(document).ready(function () {


    if (window.history && window.history.pushState) {

        window.history.pushState('forward', null, './#forward');
    
        $(window).on('popstate', function() {
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
    $(".prev-step").click(function(e) {
        gotToTab(oncekiAdimId);
    });

    //Başlangıç Sayfası
    $("#btnYillaraGoreSorgula").click(function(e) {
        oncekiAdimId = 'a-baslangic';
        gotToTab('a-yillar');

    });

    $("#btnProjelereGoreSorgula").click(function(e) {
        // oncekiAdimId = 'a-baslangic';
        // gotToTab('a-projeler');
    });

    $(".btn-yil").click(function(e) {
        seciliYil = $(e.currentTarget).attr("data-item");
        oncekiAdimId = 'a-yillar';
        gotToTab('a-haftalar');
    })

    $(".btn-hafta").click(function(e) {
        seciliHafta = $(e.currentTarget).attr("data-item");
        oncekiAdimId = 'a-haftalar';
        gotToTab('a-projeler');
        getProjeler();
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
    $("#" + tabId).click().animate({opacity: 0}, 5000);
}

//AJAX calls
function getProjeler() {
    const res = fetch('/projeler?yil='+ seciliYil +'&hafta=' + seciliHafta + '').then(res=>{
        res.json().then(data => { 
            let projeler = data.resp.map(t => t.proje);
            projeler = [...new Set(projeler)];

            $("#projeler").empty();
            for(let i=0; i< data.resp.length; i++) {
                $("#projeler").append(projeAccordion(data.resp[i]));
            }
        });
    });
}

function getPdf() {
    console.log("asdasd")
}

let projeAccordion = function(data) {
    let div = $("<div id=proje_" + data.id + "></div>");
    $(div).append('<span class="btn btn-info" data-toggle="collapse" data-target="#proje_content_'+ data.id + '"><h1 class="display-6">' + data['proje'] + '</h1></span>');
    $(div).append('<hr />');
    $(div).append('<div id="proje_content_'+ data.id + '" class="collapse"><span click="getPdf()">' + data['pdf'] + '<span></div>');
    return div;
}
