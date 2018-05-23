var _ssl_dt = 'https://';
var _datatransUrl = 'pay.sandbox.datatrans.com/upp/jsp/upStart.jsp?';
var _datatransCurrency = '&currency=' + 'CHF';
var _datatransMerchantId = '&merchantId=' + '1100016206'; //todo test MerchantID

// Method for create DataTrans URL
function createDatatransUrl(__amount) {
    var amount = '&amount=' + __amount;

    return _ssl_dt + _datatransUrl +
        _datatransMerchantId + generateRefNo() +
        amount + _datatransCurrency;
}

// Generate RefNo for api DataTrans call
function generateRefNo() {
    var obj = new Date();
    var timestamp = obj.getTime();
    var random = Math.floor(Math.random() * 9999);

    return "&refno=" + timestamp + random;
}


// $j(document).on("tap", ".js-header--close", function () {
//     alert('Tap exit');
// });