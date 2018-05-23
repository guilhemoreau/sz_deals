// Method for save Data like 'key' => 'value' in smart phone
function saveDataToSmartPhone(key, value) {
    window.localStorage.setItem(key, value);
}

// Method for get Data by Key from smart phone
function getLocalStorageData(key) {
    return window.localStorage.getItem(key);
}

// Method for strip HTML code from string
function stripHTML(html) {
    var txt = $j('<p>').html(html).text();
    txt = txt.replace('\n', '');
    txt = txt.replace('\t', '');
    return txt;
}

// Method for check if default store Id is in available store
function isStoreAvailable(storeId) {
    var tmpLocation = _apiAllLocationData.locations;
    var count = tmpLocation.length;
    for (var i = 0; i < count; i++) {
        if (tmpLocation[i].id == storeId) {
            currentStoreId = tmpLocation[i].id;
            return true;
        }
    }
    return false;
}

// Method when customer wants LogIn
function loginCustomer(userName, password) {
    __getCheckUserData(userName, password);
}

// Method when customer wants LogOut
function logoutCustomer() {
    menuToggle();
    isCustomerLoggedIn = false;
    changeUserAndBasket(isCustomerLoggedIn);
    saveDataToSmartPhone('customer_id', null);
    _apiCheckUserData = null;
    loadPage('login.html');
}

// Function for check user login
function responseCheckUser(response) {
    if (response) {
        isCustomerLoggedIn = true;
        changeUserAndBasket(isCustomerLoggedIn);
        saveDataToSmartPhone('customer_id', _apiCheckUserData.user);
        loadPage('deals.html');
    } else {
        // Remove value from input field
        $j('#login_email').val('');
        $j('#login_password').val('');
        $j('.error-login-image').show();
    }
}

// Method for prepare data for add order api call
function prepareOrderData() {
    var total = totalPriceOfCart;

    var tvaTmp = (TVAPercentage / 100) * totalPriceOfCart;
    tvaTmp = parseFloat(Math.round(tvaTmp * 100) / 100).toFixed(2);

    var amount = total + tvaTmp;
    var user_id = getLocalStorageData('customer_id');
    var location = getLocalStorageData('id_default_store');
    var deals = [];

    for (var i=0; i<listProductInCart.length; i++) {
        deals.push(parseInt(listProductInCart[i].id));
    }

    var data = {};
    data['amount'] = parseFloat(amount);
    data['user_id'] = parseInt(user_id);
    data['location_id'] = parseInt(location);
    data['deals'] = deals;

    // Return json for add order
    return JSON.stringify(data);
}

// Method for explode time by character ":"
function explodeTime(obj) {
    var str = obj.split(':');
    var forRet = {};

    forRet.h = str[0];
    forRet.m = str[1];
    forRet.s = str[2];

    return forRet;
}

// Check if location is open
function isLocationOpen() {
    var idLocation = getLocalStorageData('id_default_store');
    var openTimeLocation, closeTimeLocation, pickupTimeLocation = null;

    for (var i=0; i<_apiAllLocationData.locations.length; i++) {
        if (_apiAllLocationData.locations[i].id == idLocation) {
            openTimeLocation = _apiAllLocationData.locations[i].opening_time;
            closeTimeLocation = _apiAllLocationData.locations[i].closing_time;
            // pickupTimeLocation = _apiAllLocationData.locations[i].pickup_limit;
            break;
        }
    }

    var timeServer = moment(_apiTimeData.time * 1000);
    var timeServerS = timeServer.format("MM-DD-YYYY");

    var timeOpen = moment(timeServerS + ' ' + openTimeLocation, 'MM-DD-YYYY HH:mm:ss');
    var timeClose = moment(timeServerS + ' ' + closeTimeLocation, 'MM-DD-YYYY HH:mm:ss');
    // var timePickUp = moment(timeServerS + ' ' + pickupTimeLocation, 'MM-DD-YYYY HH:mm:ss');

    var diffOpen = timeServer.diff(timeOpen);
    var diffClose = timeServer.diff(timeClose);
    // var diffPickUp = timeServer.diff(timePickUp);

    if (diffOpen > 0 && diffClose < 0) {
        return true;
    } else {
        return false;
    }
}

// Get Time for clock drawing
function getTimeForStartWorking() {
    var idLocation = getLocalStorageData('id_default_store');

    var starTime = null;
    for (var i=0; i<_apiAllLocationData.locations.length; i++) {
        if (_apiAllLocationData.locations[i].id == idLocation) {
            starTime = _apiAllLocationData.locations[i].opening_time;
            // starTime = _apiAllLocationData.locations[i].closing_time;
            // starTime = _apiAllLocationData.locations[i].pickup_limit;
            break;
        }
    }

    starTime = explodeTime(starTime);

    var forRet = {};
    forRet.h = starTime.h;
    forRet.m = starTime.m;

    return forRet;
}

// Check if app remember user ID
function checkIfCustomerRemember() {
    var customer = getLocalStorageData('customer_id');

    if (customer != "null" && customer != null) {
        isCustomerLoggedIn = true;
        changeUserAndBasket(isCustomerLoggedIn);
        return true;
    } else {
        return false;
    }
}

// Method for check Qty before place order
function callBackCheckQuantityBeforeOrdered(data, status) {
    if (status) {
        if (checkQtyFon(data)) {
            breakingOrder = false;
            //TODO change this
            // __getAddOrderData(prepareOrderData());
        } else {
            breakingOrder = false;
            loadPage('order_allready_sold.html');
        }
    } else {
        breakingOrder = false;
        loadPage('order_allready_sold.html');
    }
}

// Check qty in all deals by store
function checkQtyFon(data) {
    var forRet = true;
    var idsInCart = [];
    var idsAvailable = [];

    listProductInCart.forEach(function (value) {
        idsInCart.push(value.id);
    });

    data.deals_data.forEach(function (value) {
        idsAvailable.push(value.id)
    });

    idsInCart.forEach(function (value) {
        var isExist = idsAvailable.includes(value);
        if (!isExist) {
            forRet = false;
        }
    });

    return forRet;
}

// Method return current timestamp from Phone
function getCurrentTime() {
    var obj = new Date();
    var timestamp = obj.getTime();

    // Remove seconds
    timestamp = Math.trunc(timestamp);
    return timestamp;
}

// Method for convert Time from server to user readable
function convertTimeFromTimestamp(unix_timestamp) {
    // Multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    return hours + ':' + minutes + ':' + seconds;
}

// Method for parse Order Response
function newOrderResponse(params, par1, par2) {
    if (par1 === "success") {
        if (params.order_added === true) {
            breakingOrder = false;
            loadPage('order_confirmation.html');
        } else {
            breakingOrder = false;
            loadPage('order_error.html');
        }
    } else {
        breakingOrder = false;
        loadPage('order_error.html');
    }
}

//Method for Check If Time Ending
function checkIfTimeEnding() {
    var idLocation = getLocalStorageData('id_default_store');
    var openTimeLocation, closeTimeLocation, pickupTimeLocation = null;

    for (var i=0; i<_apiAllLocationData.locations.length; i++) {
        if (_apiAllLocationData.locations[i].id == idLocation) {
            openTimeLocation = _apiAllLocationData.locations[i].opening_time;
            closeTimeLocation = _apiAllLocationData.locations[i].closing_time;
            // pickupTimeLocation = _apiAllLocationData.locations[i].pickup_limit;
            break;
        }
    }

    // var timeServer = moment(_apiTimeData.time * 1000);
    var d = new Date();
    var n = d.getTime();
    var timeServer = moment(n);

    var timeServerS = timeServer.format("MM-DD-YYYY");

    var timeOpen = moment(timeServerS + ' ' + openTimeLocation, 'MM-DD-YYYY HH:mm:ss');
    var timeClose = moment(timeServerS + ' ' + closeTimeLocation, 'MM-DD-YYYY HH:mm:ss');
    // var timePickUp = moment(timeServerS + ' ' + pickupTimeLocation, 'MM-DD-YYYY HH:mm:ss');

    var diffOpen = timeServer.diff(timeOpen);
    var diffClose = timeServer.diff(timeClose);
    // var diffPickUp = timeServer.diff(timePickUp);

    if (diffOpen > 0 && diffClose < 0) {
        return true;
    } else {
        return false;
    }

}

