$(function () {
    $.ajax({
        type: 'GET',
        url: 'http://ptx.transportdata.tw/MOTC/APIs/v2/Rail/TRA/Station?$top=10&$format=JSON', //���I�s��API���}(���d�Ҭ��x�K�������)
        dataType: 'json',
        headers: GetAuthorizationHeader(),
        success: function (Data) {
            $('body').text(JSON.stringify(Data));
        }
    });
});

function GetAuthorizationHeader() {
    var AppID = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    var AppKey = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';

    var GMTString = new Date().toGMTString();
    var ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    var HMAC = ShaObj.getHMAC('B64');
    var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

    return { 'Authorization': Authorization, 'X-Date': GMTString};
}