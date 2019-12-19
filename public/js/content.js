$(document).ready(function () {

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
        oncekiAdimId = 'a-baslangic';
        gotToTab('a-projeler');
    });

});

function gotToTab(tabId) {
    $("#" + tabId).click().animate({opacity: 0}, 5000);
}
