
$(document).ready(function () {
    
    let secilenYil, secilenHafta;

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
        getProjeler();

    });

    $("#btnProjelereGoreSorgula").click(function(e) {
        oncekiAdimId = 'a-baslangic';
        gotToTab('a-projeler');
    });

    $(".btn-yil").click(function(e) {
        oncekiAdimId = 'a-yillar';
        gotToTab('a-haftalar');
    })

    $(".btn-hafta").click(function(e) {
        oncekiAdimId = 'a-haftalar';
        gotToTab('a-projeler');
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

function getProjeler() {
    const res = fetch('/projeler').then(res=>{
        res.json().then(data => { 
            console.log(data);
        });
    });
}
