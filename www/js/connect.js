// var _ssl = 'https://';
var _ssl = 'http://';
var _baseUrl = 'preprod.sushizen.shop/api';

var _username = 'admin';
var _password = '1234';

var _postFlag = 'POST';
var _getFlag = 'GET';

var _timeOut = 3000;       // Set timeout to 3 seconds

// Api points
var _urlAllPages = '/pages/all_pages';
var _urlAbout = '/pages/a_props_page';
var _urlTermsAndConditions = '/pages/treams_and_conditions_page';
var _urlLegalsPage = '/pages/legals_page';
var _urlAllLocation = '/locations/all_locations';
var _urlLocationGet = '/locations/location/id/';
var _urlLocationPost = '/locations/location';
var _urlAllBubbles = '/bubbles/all_bubbles';
var _urlTime = '/general/time';
var _urlDealsGet = '/deals/deals';
var _urlOneDeal = '/deals/one_deal/id/';
var _urlCheckUser = '/users/check_user';
var _urlAddOrder = '/orders/add_order';
var _urlNoteError = '/notes/error_text';


// Array if calls done
var callsOnStartUp = [];
// callsOnStartUp.all_pages = false;
callsOnStartUp.a_props_page = false;
callsOnStartUp.treams_and_conditions_page = false;
callsOnStartUp.legals_page = false;
callsOnStartUp.all_location = false;
// callsOnStartUp.location = false;
callsOnStartUp.all_bubbles = false;
callsOnStartUp.time = false;
callsOnStartUp.error_text = false;
// callsOnStartUp.deals_get = false;

// Method for get All Pages Data from API
function __getAllPagesData() {
    $j.ajax({
        type: _getFlag,
        url: _ssl + _baseUrl + _urlAllPages,
        timeout: _timeOut,
        headers: {
            "Authorization": "Basic " + btoa(_username + ":" + _password),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        success: function (_data) {
            if (_data.status === 200) {
                _apiAllPagesData = _data;
                callsOnStartUp.all_pages = true;
            } else {
                _apiAllPagesData = null;
                callsOnStartUp.all_pages = false;
            }
        },
        error: function (_erorr) {
            _apiAllPagesData = null;
            callsOnStartUp.all_pages = false;
        }
    });
}

// Method for get About Data from API
function __getAboutData() {
    $j.ajax({
        type: _getFlag,
        url: _ssl + _baseUrl + _urlAbout,
        timeout: _timeOut,
        headers: {
            "Authorization": "Basic " + btoa(_username + ":" + _password),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        success: function (_data) {
            if (_data.status === 200) {
                _apiAboutData = _data;
                callsOnStartUp.a_props_page = true;
            } else {
                _apiAboutData = null;
                callsOnStartUp.a_props_page = false;
            }
        },
        error: function (_erorr) {
            _apiAboutData = null;
            callsOnStartUp.a_props_page = false;
        }
    });
}

// Mehtod for get Terms And Conditions Data from API
function __getTermsAndConditionsData() {
    $j.ajax({
        type: _getFlag,
        url: _ssl + _baseUrl + _urlTermsAndConditions,
        timeout: _timeOut,
        headers: {
            "Authorization": "Basic " + btoa(_username + ":" + _password),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        success: function (_data) {
            if (_data.status === 200) {
                _apiTermsAndConditionsData = _data;
                callsOnStartUp.treams_and_conditions_page = true;
            } else {
                _apiTermsAndConditionsData = null;
                callsOnStartUp.treams_and_conditions_page = false;
            }
        },
        error: function (_erorr) {
            _apiTermsAndConditionsData = null;
            callsOnStartUp.treams_and_conditions_page = false;
        }
    });
}

// Method for get Legals Data from API
function __getLegalsPageData() {
    $j.ajax({
        type: _getFlag,
        url: _ssl + _baseUrl + _urlLegalsPage,
        timeout: _timeOut,
        headers: {
            "Authorization": "Basic " + btoa(_username + ":" + _password),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        success: function (_data) {
            if (_data.status === 200) {
                _apiLegalsPageData = _data;
                callsOnStartUp.legals_page = true;
            } else {
                _apiLegalsPageData = null;
                callsOnStartUp.legals_page = false;
            }
        },
        error: function (_erorr) {
            _apiLegalsPageData = null;
            callsOnStartUp.legals_page = false;
        }
    });
}

// Method for get All Location from API
function __getAllLocationData() {
    $j.ajax({
        type: _getFlag,
        url: _ssl + _baseUrl + _urlAllLocation,
        timeout: _timeOut,
        headers: {
            "Authorization": "Basic " + btoa(_username + ":" + _password),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        success: function (_data) {
            if (_data.status === 200) {
                _apiAllLocationData = _data;
                callsOnStartUp.all_location = true;
            } else {
                _apiAllLocationData = null;
                callsOnStartUp.all_location = false;
            }
        },
        error: function (_erorr) {
            _apiAllLocationData = null;
            callsOnStartUp.all_location = false;
        }
    });
}

// Method for get Location Data by Id from API
function __getLocationByIdData(locationId, method) {
    if (method === _getFlag) {
        $j.ajax({
            type: _getFlag,
            url: _ssl + _baseUrl + _urlLocationGet + locationId,
            timeout: _timeOut,
            headers: {
                "Authorization": "Basic " + btoa(_username + ":" + _password),
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            success: function (_data) {
                if (_data.status === 200) {
                    _apiLocationData = _data;
                    callsOnStartUp.location = true;
                } else {
                    _apiLocationData = null;
                    callsOnStartUp.location = false;
                }
            },
            error: function (_erorr) {
                _apiLocationData = null;
                callsOnStartUp.location = false;
            }
        });
    } else {
        var data = "{\"id\":" + locationId + "}";

        $j.ajax({
            type: _postFlag,
            url: _ssl + _baseUrl + _urlLocationPost,
            data: data,
            timeout: _timeOut,
            headers: {
                "Authorization": "Basic " + btoa(_username + ":" + _password),
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            success: function (_data) {
                if (_data.status === 200) {
                    _apiLocationData = _data;
                    callsOnStartUp.location = true;
                } else {
                    _apiLocationData = null;
                    callsOnStartUp.location = false;
                }
            },
            error: function (_erorr) {
                _apiLocationData = null;
                callsOnStartUp.location = false;
            }
        });
    }
}

// Method for get All Bubbles from API
function __getAllBubblesData() {
    $j.ajax({
        type: _getFlag,
        url: _ssl + _baseUrl + _urlAllBubbles,
        timeout: _timeOut,
        headers: {
            "Authorization": "Basic " + btoa(_username + ":" + _password),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        success: function (_data) {
            if (_data.status === 200) {
                _apiAllBubblesData = _data;
                callsOnStartUp.all_bubbles = true;
            } else {
                _apiAllBubblesData = null;
                callsOnStartUp.all_bubbles = false;
            }
        },
        error: function (_erorr) {
            _apiAllBubblesData = null;
            callsOnStartUp.all_bubbles = false;
        }
    });
}

// Method for get Server Time from API
function __getTimeData() {
    $j.ajax({
        type: _getFlag,
        url: _ssl + _baseUrl + _urlTime,
        timeout: _timeOut,
        headers: {
            "Authorization": "Basic " + btoa(_username + ":" + _password),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        success: function (_data) {
            if (_data.status === 200) {
                _apiTimeData = _data;
                callsOnStartUp.time = true;
            } else {
                _apiTimeData = null;
                callsOnStartUp.time = false;
            }
        },
        error: function (_erorr) {
            _apiTimeData = null;
            callsOnStartUp.time = false;
        }
    });
}

// Method for check login credentials, we get User ID from API
function __getCheckUserData(userName, password) {
    //Create data for API call
    var dataUser = btoa(userName + '-:::-' + password);

    $j.ajax({
        type: _postFlag,
        url: _ssl + _baseUrl + _urlCheckUser,
        data: '{"data": "' + dataUser + '"}',
        timeout: _timeOut,
        headers: {
            "Authorization": "Basic " + btoa(_username + ":" + _password),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        success: function (_data, par) {
            if (par === "nocontent") {
                _apiCheckUserData = null;
                responseCheckUser(false);
            } else if (_data.status === 200) {
                _apiCheckUserData = _data;
                responseCheckUser(true);
            } else {
                _apiCheckUserData = null;
                responseCheckUser(false);
            }
        },
        error: function (_erorr) {
            _apiCheckUserData = null;
            responseCheckUser(false);
        }
    });
}

// Method for get all Notes Error from API
function __getNoteErrorData() {
    $j.ajax({
        type: _getFlag,
        url: _ssl + _baseUrl + _urlNoteError,
        timeout: _timeOut,
        headers: {
            "Authorization": "Basic " + btoa(_username + ":" + _password),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        success: function (_data, _par, _par2) {
            if (_data.status === 200) {
                _apiNoteErrorData = _data;
                callsOnStartUp.error_text = true;
            } else if (_data.status === 400) {
                _apiNoteErrorData = null;
                callsOnStartUp.error_text = false;
            } else {
                _apiNoteErrorData = null;
                callsOnStartUp.error_text = false;
            }
        },
        error: function (_data, _par, _par2) {
            _apiNoteErrorData = null;
            callsOnStartUp.error_text = false;
        }
    });
}

// Method for get Deals by location type and page from API
function __getDealsGet(type, location, page) {
    var query = '';
    if (type != null) {
        query += '/type/' + type;
    }
    if (location != null) {
        query += '/location/' + location;
    }
    if (page != null) {
        query += '/page/' + page;
    }

    $j.ajax({
        type: _getFlag,
        url: _ssl + _baseUrl + _urlDealsGet + query,
        headers: {
            "Authorization": "Basic " + btoa(_username + ":" + _password),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        success: function (_data, _status) {
            if (_status !== "nocontent") {
                if (_data.status === 200) {
                    _apiDealsByStore = _data;
                    callsOnStartUp.deals_get = true;
                } else if (_data.status === 204) {
                    _apiDealsByStore = null;
                    callsOnStartUp.deals_get = false;
                } else {
                    _apiDealsByStore = null;
                    callsOnStartUp.deals_get = false;
                }
            } else {
                _apiDealsByStore = null;
                callsOnStartUp.deals_get = false;
            }
        },
        error: function (_erorr) {
            _apiDealsByStore = null;
            callsOnStartUp.deals_get = false;
        }
    });
}

// Method for check quantity
function __checkQuantityBeforeOrdered(location) {
    var query = '/location/' + location;
    $j.ajax({
        type: _getFlag,
        url: _ssl + _baseUrl + _urlDealsGet + query,
        timeout: 5000,
        headers: {
            "Authorization": "Basic " + btoa(_username + ":" + _password),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        success: function (_data) {
            if (_data.status != null && _data.status === 200) {
                callBackCheckQuantityBeforeOrdered(_data, true);
            } else if (_data.status === 204) {
                callBackCheckQuantityBeforeOrdered(null, false);
            } else {
                callBackCheckQuantityBeforeOrdered(null, false);
            }
        },
        error: function (_erorr) {
            callBackCheckQuantityBeforeOrdered(null, false);
        }
    });
}

//Method for Add Order Data on API
function __getAddOrderData(data) {
    $j.ajax({
        type: _postFlag,
        url: _ssl + _baseUrl + _urlAddOrder,
        timeout: _timeOut,
        data: data,
        headers: {
            "Authorization": "Basic " + btoa(_username + ":" + _password),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        success: function (_data, _par, _par2) {
            if (_data.status === 200) {
                newOrderResponse(_data, _par, _par2);
                _apiAddOrderData = _data;
            } else if (_data.status === 400) {
                newOrderResponse(_data, _par, _par2);
                _apiAddOrderData = null;
            } else {
                newOrderResponse(_data, _par, _par2);
                _apiAddOrderData = null;
            }
        },
        error: function (_data, _par, _par2) {
            newOrderResponse(_data, _par, _par2);
            _apiAddOrderData = null;
        }
    });
}

//API Calls on start
function sendAllApiCalls() {
    __getAllLocationData();
    __getTimeData();
    __getAboutData();
    __getTermsAndConditionsData();
    __getLegalsPageData();
    __getAllBubblesData();
    __getNoteErrorData();
}

// Check All Api Calls from start
function checkAllCalls() {
    var _error = false;
    console.log('%c' + "Get Data On START:", "background: #222; color: #27ffe9");
    for (var key in callsOnStartUp) {
        console.log('%c' + key + " = " + callsOnStartUp[key], "background: #222; color: #27ffe9");

        if (callsOnStartUp[key] === false) {
            _error = true;
        }
    }

    if (_error) {
        // showNotificationByText("cat-notification.jpg", "DESOLE IL N'Y RIEN CE SOIR REVIENS DEMAON!", "restart");
        showNotificationByText("DESOLE IL N'Y RIEN CE SOIR REVIENS DEMAON!", "restart");
    } else {
        getAllDataFromApi();
    }
}
