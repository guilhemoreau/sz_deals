// Fb APP ID todo change this for production
var APP_ID = "192613124871370";

// Redirect uri todo change this for production
var redirect_uri = "https://dev.example.com/testPost.php";
var refBrowserInApp = null;

// Sushizen redirect URL -> redirect url with id or error todo change this for production
var szRedirectUrl = 'https://dev.example.com/testPostSuccess.php';
var timeOutFbLogin = null;

/**
 * Method for parse get parameters from URL
 *
 * @param name
 * @param url
 * @returns {*}
 */
function parseGetParams(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 * Check if pattern exist in url
 *
 * @param pattern
 * @param url
 * @returns {boolean}
 */
function ifUrlInclude(pattern, url) {
    var tmp = url.search(pattern);

    if (tmp === 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * Method for login to facebook custom method
 */
function facebookCustomLogin() {
    var fbLink = "https://www.facebook.com/v3.0/dialog/oauth?client_id=" + APP_ID + "&redirect_uri=" + redirect_uri;
    refBrowserInApp = cordova.InAppBrowser.open(fbLink, "_blank", "location=no");

    // timeOutFbLogin = setTimeout(function(){
    //     refBrowserInApp.close();
    //     isCustomerLoggedIn = false;
    //     changeUserAndBasket(isCustomerLoggedIn);
    //     saveDataToSmartPhone('customer_id', null);
    //     loadPage('login.html');
    //     }, 30000);

    // Add Events...
    refBrowserInApp.addEventListener('loadstart',  function(event) {

        // Check last url redirect
        if (ifUrlInclude(szRedirectUrl, event.url)) {
            // clearTimeout(timeOutFbLogin);
            refBrowserInApp.close();
            var tmpSuccess = parseGetParams('success', event.url);

            if (tmpSuccess === "ok") {
                refBrowserInApp.close();
                var UserId = parseGetParams('user', event.url);

                isCustomerLoggedIn = true;
                changeUserAndBasket(isCustomerLoggedIn);
                saveDataToSmartPhone('customer_id', UserId);
                loadPage('deals.html');
            } else {
                refBrowserInApp.close();
                var text_error = parseGetParams('text_error', event.url);

                //todo remove this for production
                alert('FB error: ' + text_error);

                isCustomerLoggedIn = false;
                changeUserAndBasket(isCustomerLoggedIn);
                saveDataToSmartPhone('customer_id', null);
                loadPage('login.html');
            }
        }
    });
}