var $j = jQuery.noConflict();

var isDeviceConnectOnInternet = false;
var isCustomerLoggedIn = false;     // True = if customer is logged in
var numberOfProducts = 4;           // Number of available products
var currentProduct = 1;             // Current product
var currentStoreId;                 // Current store

var screenWidth = 0;                // Screen width of device
var screenHeight = 0;               // Screen height of device
var lockSwipe = false;              // Semaphore for lock swipe

var listOfAvailableProduct;         // List of available product
var breakingOrder = false;

// Default Store
var _idDefaultStore;
var _tmpIdDefaultStore;
var _nextActionUrl;
var menu_break = false;
var destinationMap = '';

// About data
var allDataForAbout = '';           //

// Cart variable
var numberProductInCart = 0;        // Number product in cart
var listProductInCart = [];         // Array of product in basket
var totalPriceOfCart = 0;           // Price sum of all products in cart
var TVAPercentage = 8;              // TVA percentage 8% hardcoded by DRAGAN NEDELJKOVIC email

// Order confirmation
var allDataForOrderConfirmation = '';

// Terms & Conditions
var allDataForTermsAndConditions = '';

// Errors text
var allErrorCodeText = '';

// Time opening time
var openingTimes = '';

//Method for hamburger
$j(document).on('tap', "#hamburger", function () {
    if (isCustomerLoggedIn) {
        menuToggle();
    } else {
        loadPage('login.html');
    }
});

/**
 * Menu logic toggle button
 */
function menuToggle() {

    $j('#app_sushizen').css('overflow-y', 'scroll');
    $j('#app_sushizen').css('overflow-x', 'hidden');

    $j('#c-menu-slide-top').fadeToggle(600, function (e) {
        if ($j('#c-menu-slide-top').css('display') === "none") {
            $j('.app').addClass('enable-scroll');
            $j('.app').removeClass('disable-scroll');
        } else {
            $j('.app').addClass('disable-scroll');
            $j('.app').removeClass('enable-scroll');

        }
    });

    menuAnimationLog();
    menuCatLogic();
}

/**
 * Load page into url
 *
 * @param url           The url to load
 */
function loadPage(url) {
    $j.ajax({
        dataType: 'html',
        url: url,
        success: function (data) {
            $j('#container').html(data);
            switch (url) {
                case 'deals.html':
                    showHide('#hamburger', 'block');
                    showHide('#basket', 'flex');
                    showHide('.number-of-item-wrapper', 'flex');
                    currentProduct = 1;
                    topBarIndexer();
                    getProductData();
                    break;
                case 'about.html':
                    showHide('#basket', 'none');
                    showHide('.number-of-item-wrapper', 'none');
                    getAboutData();
                    break;
                case 'cart.html':
                    showHide('#basket', 'none');
                    showHide('.number-of-item-wrapper', 'none');
                    updateProductInBasket();
                    updateAllPricesInCart();
                    break;
                case 'login.html':
                    showHide('#basket', 'none');
                    showHide('.number-of-item-wrapper', 'none');
                    break;
                case 'login_email.html':
                    showHide('#basket', 'none');
                    break;
                case 'notification.html':
                    showHide('#basket', 'none');
                    showHide('.number-of-item-wrapper', 'none');
                    showErrorPage('no_internet_connection');
                    break;
                case 'order_confirmation.html':
                    getOrderConfirmationData();
                    break;
                case 'terms_and_conditions.html':
                    showHide('#basket', 'none');
                    showHide('.number-of-item-wrapper', 'none');
                    getTermsAndConditionsData();
                    break;
                case 'count_down.html':
                    showHide('#basket', 'none');
                    showHide('.number-of-item-wrapper', 'none');
                    initClock();
                    break;
                case 'notification_max_qty.html':
                    showHide('#basket', 'none');
                    showHide('.number-of-item-wrapper', 'none');
                    getMaxQuantityPopUpData();
                    break;
                case 'loading.html':
                    showHide('#basket', 'none');
                    // showHide('#hamburger', 'block');
                    showHide('.number-of-item-wrapper', 'none');
                    break;
                case 'switch_store_confirmation.html':
                    showHide('#basket', 'none');
                    showHide('.number-of-item-wrapper', 'none');
                    break;
                case 'shop_select.html':
                    showHide('#basket', 'none');
                    showHide('.number-of-item-wrapper', 'none');
                    break;
                case 'legal_page.html':
                    showHide('#basket', 'none');
                    showHide('.number-of-item-wrapper', 'none');
                    break;
                case 'empty_shop.html':
                    showHide('#basket', 'none');
                    // showHide('#hamburger', 'block');
                    showHide('.number-of-item-wrapper', 'none');
                    break;
                case 'order_allready_sold.html':
                    showHide('#basket', 'none');
                    showHide('#hamburger', 'none');
                    showHide('.number-of-item-wrapper', 'none');
                    setDataAllreadySold();
                    break;
                case 'order_error.html':
                    showHide('#basket', 'none');
                    // showHide('#hamburger', 'none');
                    showHide('.number-of-item-wrapper', 'none');
                    setDataOrderError();
                    break;
                case 'datatrans_payment.html':
                    showHide('#basket', 'none');
                    showHide('.number-of-item-wrapper', 'none');
                    break;
            }
        },
        error: function (data) {
            console.log('error = ' + data);
        }
    });
}

/**********************************************************************************************************************/
/*                                                   Menu actions                                                     */
/**********************************************************************************************************************/
$j(document).on('tap', "#menu_about", function () {
    menuToggle();
    loadPage('about.html');
});
$j(document).on('tap', "#menu_deals", function () {
    menuToggle();
    loadPage('deals.html');
});
$j(document).on('tap', "#menu_shops", function () {
    menuToggle();
    loadPage('shop_select.html');
});
$j(document).on('tap', "#menu_link", function () {
    menuToggle();
    window.open('https://www.sushizen.shop/', '_system');
});
$j(document).on('tap', "#menu_order_archive", function () {
    menuToggle();
    window.open('https://www.sushizen.shop/', '_system');
});
$j(document).on('tap', "#menu_conditions", function () {
    menuToggle();
    loadPage('terms_and_conditions.html');
});
$j(document).on('tap', "#menu_logout", function () {
    logoutCustomer();
});
$j(document).on('tap', "#login_create_acc", function () {
    window.open('https://www.sushizen.shop/francais/enregistrement', '_system');
});
$j(document).on('tap', "#login_login_email", function () {
    loadPage('login_email.html');
});
$j(document).on('tap', "#menu_legal_page", function () {
    menuToggle();
   loadPage('legal_page.html');
});

/**
 * About Registration => Open registration-url in phone web browser
 */
$j(document).on('tap', ".about-page-registration", function () {
    window.open('https://www.sushizen.shop/francais/enregistrement', '_system');
});

/**
 * Tap on the basket
 */
$j(document).on('tap', "#basket", function () {
    if (isCustomerLoggedIn) {
        loadPage('cart.html');
    } else {
        loadPage('login.html');
    }
});

/**
 * Tap for add product in cart
 */
$j(document).on('tap', ".deals-page-buy-content", function () {
    if (isCustomerLoggedIn) {
        addProductToBasket();
    } else {
        loadPage('login.html');
    }
});

/**
 * Call method when customer wants reset your password
 */
$j(document).on('tap', "#reset_password", function () {
    resetPassword();
});

// This method is called when customer click Pay from Cart page
// $j(document).on('tap', "#cart_button_pay_text", function (e) {
//     e.preventDefault();
//     if (listProductInCart.length > 0 && !breakingOrder) {
//         breakingOrder = true;
//         __checkQuantityBeforeOrdered(getLocalStorageData('id_default_store'));
//     }
// });

// Next action for max qty
$j(document).on('tap', "#notification_max_cat_image", function () {
    loadPage('deals.html');
});

// Go to terms and conditions from cart
$j(document).on('tap', "#cart_bottom_condition", function () {
    loadPage('terms_and_conditions.html');
});

/**
 * This method calls when document ready
 */
$j(document).on('ready', function () {
    screenWidth = $j(window).width();
    screenHeight = $j(window).height();
    checkIfCustomerRemember();
    changeUserAndBasket(isCustomerLoggedIn);
    loadPage('welcome.html');

    $j('.ui-loader.ui-corner-all.ui-body-a.ui-loader-default').remove();
});

var menuAnimLock = false;
// Action for menu animation logic
// $j(document).on('tap', "#hamburger", function () {
//     menuAnimationLog();
// });

function menuAnimationLog() {
    if (!menuAnimLock) {
        $j('#menu_animation').css('display', 'inline-block');
        animManu.playSegments([0, 75], true);
        menuAnimLock = true;
    } else {
        animManu.playSegments([75, anim.totalFrames], true);
        menuAnimLock = false;
        setTimeout(function() {
            if (!menuAnimLock) {
                $j('#menu_animation').css('display', 'none');
            }
        }, 600);
    }
}

/**********************************************************************************************************************/
/*                                               Swipe available product                                              */
/**********************************************************************************************************************/

$j(document).on('swiperight', ".deals-product-wrapper", function () {
    swipeProduct('right');
});
$j(document).on('swipeleft', ".deals-product-wrapper", function () {
    swipeProduct('left')
});
$j(document).on('tap', '.deals-page-right', function () {
    swipeProduct('left')
});
$j(document).on('tap', '.deals-page-left', function () {
    swipeProduct('right')
});

/**
 * Function for swipe logic
 *
 * @param leftOrRight
 */
function swipeProduct(leftOrRight) {
    if (numberOfProducts === 1) {
        return;
    }
    if (lockSwipe === true) {
        return;
    }

    lockSwipe = true;
    var prev;
    var next;

    if (leftOrRight === 'right') {
        prev = $j('.active');
        next = '';

        if (currentProduct === 1) {
            next = $j('.active').parent().children().last();
            prev = $j('.active');

            currentProduct = numberOfProducts;

            $j(next).css('left', '-' + screenWidth + 'px');
            $j(next).addClass('active');

            $j(function () {
                $j(next).animate({
                    left: '+=' + screenWidth
                }, {
                    duration: 500, queue: false, complete: function () {
                        $j(prev).removeClass('active');
                        lockSwipe = false;
                    }
                });

                $j(prev).animate({
                    left: '+=' + screenWidth
                }, {duration: 500, queue: false}, function () {
                    lockSwipe = false;
                });
            });

        } else {
            next = $j('.active').prev();
            prev = $j('.active');

            $j(next).css('left', '-' + screenWidth + 'px');
            $j(next).addClass('active');

            $j(function () {
                $j(next).animate({
                    left: '+=' + screenWidth
                }, {
                    duration: 500, queue: false, complete: function () {
                        $j(prev).removeClass('active');
                        lockSwipe = false;
                    }
                });

                $j(prev).animate({
                    left: '+=' + screenWidth
                }, {duration: 500, queue: false}, function () {
                    lockSwipe = false;
                });
            });
            currentProduct--;
        }
    } else {
        prev = $j('.active');
        next = '';

        if (currentProduct === numberOfProducts) {
            next = $j('.active').parent().children().first();
            prev = $j('.active');

            currentProduct = 1;

            $j(next).css('left', screenWidth + 'px');
            $j(next).addClass('active');

            $j(function () {
                $j(next).animate({
                    left: '-=' + screenWidth
                }, {
                    duration: 500, queue: false, complete: function () {
                        $j(prev).removeClass('active');
                        lockSwipe = false;
                    }
                });

                $j(prev).animate({
                    left: '-=' + screenWidth
                }, {duration: 500, queue: false}, function () {
                    lockSwipe = false;
                });
            });
        } else {
            next = $j('.active').next();
            prev = $j('.active');

            $j(next).css('left', screenWidth + 'px');
            $j(next).addClass('active');

            $j(function () {
                $j(next).animate({
                    left: '-=' + screenWidth
                }, {
                    duration: 500, queue: false, complete: function () {
                        $j(prev).removeClass('active');
                        lockSwipe = false;
                    }
                });

                $j(prev).animate({
                    left: '-=' + screenWidth
                }, {duration: 500, queue: false}, function () {
                    lockSwipe = false;
                });
            });
            currentProduct++;
        }
    }

    topBarIndexer();
}

/**
 * Function for top indexer
 */
function topBarIndexer() {
    $j('.top-bar-current-product').html(currentProduct);
    $j('.top-bar-number-of-product').html(numberOfProducts);
}

/**
 * Function for hide element
 *
 * @param object
 * @param show
 */
function showHide(object, show) {
    $j(object).css('display', show);
}

/**
 * Function for dynamically show information about price
 */
function updateAllPricesInCart() {
    totalPriceOfCart = 0;

    for (var i = 0; i < listProductInCart.length; i++) {
        totalPriceOfCart += parseFloat((listProductInCart[i].price * listProductInCart[i].quantity));
    }
    totalPriceOfCart = parseFloat(Math.round(totalPriceOfCart * 100) / 100).toFixed(2);

    var TVAPrice = (TVAPercentage / 100) * totalPriceOfCart;
    TVAPrice = parseFloat(Math.round(TVAPrice * 100) / 100).toFixed(2);

    var finalTotal = parseFloat(parseFloat(totalPriceOfCart) + parseFloat(TVAPrice)).toFixed(2);

    $j('.cart-total-price').html(finalTotal);
    $j('.cart-tva-percentage').html(TVAPercentage);
    $j('.cart-total-tva-price').html(TVAPrice);
}

/**
 * Function for show error page by error code
 *
 * @param code -> string error code
 */
function showErrorPage(code) {
    switch (code) {
        case 'no_internet_connection':
            // TODO change this
            $j('#notification_cat_image').attr('src', 'img/cat-notification.jpg');
            $j('#notification_text').html(errorCodeText.no_internet_connection.message);
            break;
        case '':
            // TODO add other error text and error image
            break;
    }
}

/**
 * Method for return quantity by ID product
 *
 * @param idProduct -> (int) id product
 * @returns {*} -> (int) or (boolean) number of quantity or false if product not available
 */
function getQuantityById(idProduct) {
    for (var i = 0; i < listOfAvailableProduct.deals_data.length; i++) {
        if (idProduct === listOfAvailableProduct.deals_data[i].id) {
            return listOfAvailableProduct.deals_data[i].quantity;
        }
    }

    return false;
}

/**
 * Method for update counter on cart icon (top-bar)
 */
function updateCounterOnCartIcon() {
    $j('#number_product_in_cart').html(numberProductInCart);
}

/**
 * Method When Customer wants reset your password
 */
function resetPassword() {
    window.open('https://www.sushizen.shop/', '_system');
}

/**
 * Method for position cat on menu
 */
function menuCatLogic() {
    // var menuHeight = $j('.menu-item-wrapper').height();
    // var catHeight = $j('.cat-menu-image').height();
    //
    // if ((menuHeight + catHeight) < screenHeight) {
    //     var tmp = screenHeight - (menuHeight + catHeight + 3);
    //     $j('#cat_menu').css('margin-top', tmp + 'px');
    // }
}

/**********************************************************************************************************************/
/*                                                  Get data from API                                                 */
/**********************************************************************************************************************/

/**
 * Function for get data of products
 */
function getProductData() {
    listOfAvailableProduct = _apiDealsByStore;
    numberOfProducts = listOfAvailableProduct.deals_data.length;
    topBarIndexer();
    createAvailableProductList();
}

/**
 * Function for get data information for about page
 */
function getAboutData() {
    allDataForAbout = _apiAboutData;
    setDataInAboutSection();
}

/**
 * Function for get data information for order confirmation page
 */
function getOrderConfirmationData() {
    // allDataForOrderConfirmation = orderConfirmationData;
    setDataOrderConfirmation();
}

/**
 * Function for get data information for terms and conditions page
 */
function getTermsAndConditionsData() {
    allDataForTermsAndConditions = _apiTermsAndConditionsData;
    setDataTermsAndConditions();
}

/**
 * Method for get data for pop up -> Max Quantity
 */
function getMaxQuantityPopUpData() {
    allErrorCodeText = errorCodeText;
    setDataMaxQuantityPopUp();
}

/**********************************************************************************************************************/
/*                                            View - Show data in application                                         */
/**********************************************************************************************************************/

/**
 * Function for create structure of available product
 */
function createAvailableProductList() {
    var tmp = '';
    for (var i = 0; i < listOfAvailableProduct.deals_data.length; i++) {

        if (i === 0) {
            tmp = ' active';
        } else {
            tmp = '';
        }

        var desc = stripHTML(listOfAvailableProduct.deals_data[i].description);

        $j('#deals_products_wrapper').append("<div class='deals-product-wrapper" + tmp + "' data-product-id='" + listOfAvailableProduct.deals_data[i].id + "'>" +
            "<div class='deals-page-image'>" +
            "<img class='deals-product-image' src='" + listOfAvailableProduct.deals_data[i].image + "'/>" +
            "</div>" +
            "<div class='deals-page-info'>" +
            "<div class='deals-page-info-price'>" +
            "<div class='deals-page-info-price-wrapper'>" +
            "<p class='product-name'>" + listOfAvailableProduct.deals_data[i].product_name + "</p>" +
            "<p class='product-price-currency'>CHF</p>" +
            "<p class='product-price'>" + listOfAvailableProduct.deals_data[i].price + "</p>" +
            "</div>" +
            "</div>" +
            "<div class='deals-page-info-description'>" +
            "<p class='product-description'>" + desc + "</p>" +
            "</div>" +
            "</div>" +
            "</div>"
        );
    }
}

/**
 * Function for create structure of about page
 */
function setDataInAboutSection() {
    $j('.about-paragraph-title').html(allDataForAbout.title);
    $j('.about-paragraph-content').html(allDataForAbout.content);
    $j('.about-page-login-button').html(allDataForAbout.button_text);
}

/**
 * Function for create structure for order confirmation
 */
function setDataOrderConfirmation() {
    var locationDataTmp = {};
    var limit = '';

    _apiAllLocationData.locations.forEach(function (value, index) {
        if (value.id === getLocalStorageData('id_default_store')) {
            locationDataTmp.name = value.name;
            locationDataTmp.address = value.street + " " + value.street_number + ",<br />" + value.npa + " " +value.city;
            destinationMap = value.street + " " + value.street_number + ", " + value.npa + " " +value.city;
            limit = value.pickup_limit;
        }
    });

    var tIme = limit.split(':');
    var textConf = orderConfirmationText1 + tIme[0] + 'h' + tIme[1] + orderConfirmationText2;

    $j('#order_conf_top_text').html(textConf);
    $j('#order_conf_pickup_name').html(locationDataTmp.name);
    $j('#order_conf_pickup_address').html(locationDataTmp.address);
}

/**
 * Function for create structure for order error
 */
function setDataOrderError() {
    var title = _apiNoteErrorData.error_during_payment.title;
    var text = _apiNoteErrorData.error_during_payment.message;

    $j('#order_error_title').html(title);
    $j('#order_error_text').html(text);
}

/**
 * Function for create structure for order error
 */
function setDataAllreadySold() {




}

/**
 * Function for create structure for terms and conditions
 */
function setDataTermsAndConditions() {
    $j('#condition_page_data').html(allDataForTermsAndConditions.content);
}

/**
 * Method for set data on pop up -> Max Muantity
 */
function setDataMaxQuantityPopUp() {
    $j('#notification_max_top_title').html(allErrorCodeText.error_max_quantity.title);
    $j('#notification_max_top_text').html(allErrorCodeText.error_max_quantity.message);
}

/**********************************************************************************************************************/
/*                                                     Count down                                                     */
/**********************************************************************************************************************/

var ctx = '';
var radius = '';
var secTimeH = '';
var secTimeM = '';

/**
 * Initialisation clock for Count Down page
 */
function initClock() {
    // var imgPar = document.getElementById("count-down_cat_image");

    var imgPar = $j(window).width();
    var canvas = document.getElementById("canvas");
    // imgPar.onload = function () {
        canvas.width = (imgPar / 3.7);
        canvas.height = (imgPar / 3.7);

        ctx = canvas.getContext("2d");
        radius = canvas.height / 2;
        ctx.translate(radius, radius);
        radius = radius * 0.90;

        var timme = getTimeForStartWorking();
        secTimeH = timme.h;
        secTimeM = timme.m;

        setInterval(drawClock, 1000);
    // };
}

/**
 * Method for draw Clock
 */
function drawClock() {
    if (checkIfTimeEnding()) {
        location.reload();
    } else {
        drawFace(ctx, radius);
        drawTimeTwo(ctx, radius);
        drawTime(ctx, radius);
    }
}

/**
 * Method for draw clock face
 *
 * @param ctx
 * @param radius
 */
function drawFace(ctx, radius) {
    // var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    // grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
    // grad.addColorStop(0, '#333');
    // grad.addColorStop(0.5, 'white');
    // grad.addColorStop(1, '#333');
    // ctx.strokeStyle = grad;
    // ctx.lineWidth = radius*0.1;
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
    // ctx.fillStyle = '#000';
    // ctx.fill();
}

/**
 * Method for draw current time
 *
 * @param ctx
 * @param radius
 */
function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    // hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
        (minute * Math.PI / (6 * 60)) +
        (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.095, '#000');
    // minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.095, '#000');
    // second
    // second=(second*Math.PI/30);
    // drawHand(ctx, second, radius*0.9, radius*0.03, '#000');

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.15, 0, 2 * Math.PI);
    ctx.fillStyle = '#000';
    ctx.fill();
}

/**
 * Method for draw hand
 *
 * @param ctx
 * @param pos
 * @param length
 * @param width
 * @param color
 */
function drawHand(ctx, pos, length, width, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

/**
 * Method for draw shop open time
 *
 * @param ctx
 * @param radius

 */
function drawTimeTwo(ctx, radius) {
    // var now = new Date();
    var hour = secTimeH;
    var minute = secTimeM;
    var second = 0;
    // hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
        (minute * Math.PI / (6 * 60)) +
        (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.095, '#bbb');
    // minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.095, '#bbb');
    // second
    //second=(second*Math.PI/30);
    //drawHand(ctx, second, radius*0.9, radius*0.03, '#bbb');
}

/**********************************************************************************************************************/
/*                                                     Create view creator                                            */
/**********************************************************************************************************************/

// Function for show notification with given img, text and next Action
function showNotificationByText(img, text, nextAction) {
    var imgUrl = 'img/' + img;
    $j.ajax({
        dataType: 'html',
        url: 'notification.html',
        success: function (data) {
            $j('#container').html(data);
            showHide('#basket', 'none');
            showHide('.number-of-item-wrapper', 'none');
            $j('#notification_cat_image').attr('src', imgUrl);
            $j('#notification_text').html(text);
            _nextActionUrl = nextAction;
        },
        error: function (data) {
            console.log('error = ' + data);
        }
    });
}

// Function for show notification with given img, text and next Action
function showNotificationByText(text, nextAction) {
    // var imgUrl = 'img/' + img;
    $j.ajax({
        dataType: 'html',
        url: 'notification_error.html',
        success: function (data) {
            $j('#container').html(data);
            showHide('#basket', 'none');
            showHide('.number-of-item-wrapper', 'none');
            // $j('#notification_cat_image').attr('src', imgUrl);
            $j('#notification_text').html(text);
            _nextActionUrl = nextAction;
        },
        error: function (data) {
            console.log('error = ' + data);
        }
    });
}

// Change User icon to basket
function changeUserAndBasket(obj) {
    var temp = $j('.top-right-icon-swap');
    if (obj) {
        temp.attr('src', 'img/cart_empty.svg');
        $j('#number_product_in_cart_wrap').show();
    } else {
        temp.attr('src', 'img/profile_on.svg');
        $j('#number_product_in_cart_wrap').hide();
    }
}

// Create Function For show all Locations
function drawAllLocation() {
    var forRet = '';
    var separator = 0;

    var tmpAllLocation = _apiAllLocationData.locations;
    var count = tmpAllLocation.length;

    if (count > 3) {
        separator = 3.5
    } else {
        separator = count;
    }

    for (var i = 0; i < count; i++) {
        // Show default image if image empty
        var imageUrl;
        if (tmpAllLocation[i].image === "") {
            imageUrl = 'http://www.tourniagara.com/wp-content/uploads/2014/10/default-img.gif';
        } else {
            imageUrl = tmpAllLocation[i].image;
        }

        var workDays = stripHTML(tmpAllLocation[i].work_days);

        var selected = '';
        if (tmpAllLocation[i].id == getLocalStorageData('id_default_store')) {
            selected = ' shop-selected';
        }

        forRet += '<div data-id="' + tmpAllLocation[i].id + '" class="select-shop-row' + selected + '" ' +
            'style="height: calc(100vh / ' + separator + ');background-image: linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(\'' + imageUrl + '\');">' +
            '<div class="one-shop-wrapper-text">' +
            '<p class="shop-list-name">' + tmpAllLocation[i].name + '</p>' +
            '<p class="shop-list-location top-name-margin">' + tmpAllLocation[i].street + ' ' + tmpAllLocation[i].street_number + '</p>' +
            '<p class="shop-list-location bot-name-margin">' + tmpAllLocation[i].npa + ' ' + tmpAllLocation[i].city + '</p>' +
            '<p class="shop-list-work-day">' + workDays + '</p>' +
            '</div></div>';
    }
    return forRet;
}

// Show Legal Page to User
function drawLegalPage() {
    $j('#legal_page_content').html(_apiLegalsPageData.content)
}

/**
 * Method for add product in cart by product id
 *
 * @param id -> id product
 */
function addProductInBasket(id) {
    // Check if existing in cart
    var i;
    var inCart = false;
    var indexProduct = null;
    for (i = 0; i < listProductInCart.length; i++) {
        if (listProductInCart[i].id === id) {
            inCart = true;
            indexProduct = i;
        }
    }

    if (inCart) {
        if ((listProductInCart[indexProduct].quantity + 1) <= getQuantityById(listProductInCart[indexProduct].id)) {
            // Update quantity
            listProductInCart[indexProduct].quantity++;
            numberProductInCart++;
        } else {
            // Pop Up max qty
            loadPage('notification_max_qty.html');
        }
    } else {
        // Add new item in cart
        for (i = 0; i < listOfAvailableProduct.deals_data.length; i++) {
            if (id === listOfAvailableProduct.deals_data[i].id) {
                var tmp = [];
                tmp['id'] = listOfAvailableProduct.deals_data[i].id;
                tmp['name'] = listOfAvailableProduct.deals_data[i].product_name;
                tmp['quantity'] = 1;
                tmp['price'] = listOfAvailableProduct.deals_data[i].price;
                listProductInCart.push(tmp);
                numberProductInCart++;
            }
        }
    }

    updateCounterOnCartIcon();
}

/**
 * Method for add Product to cart
 */
function addProductToBasket() {
    var idProduct = $j('.deals-product-wrapper.active').attr('data-product-id');
    addProductInBasket(idProduct);
}

/**
 * Method for update product in cart
 */
function updateProductInBasket() {
    for (var i = 0; i < listProductInCart.length; i++) {
        $j('#cart_product_wrapper').append("<div class='cart-product-row-wrapper'>" +
            "<div class='cart-product-name-wrapper'>" +
            "<p class='cart-product-name-text'>" + listProductInCart[i].name + "</p>" +
            "</div>" +
            "<div class='cart-product-price-wrapper'>" +
            "<p class='cart-product-price-text'>" + listProductInCart[i].price + "</p>" +
            "</div>" +
            "<div class='cart-product-qty'>" +
            "<p class='cart-product-qty-text'>" + listProductInCart[i].quantity + "</p>" +
            "<p class='cart-product-qty-multi'>x</p>" +
            "</div>" +
            "</div>"
        );
    }
}

/**
 * Method for get All Data from Api
 */
function getAllDataFromApi() {
    var isStoreSelected = getLocalStorageData('id_default_store');
    __getDealsGet(null, isStoreSelected, null);
    if (isStoreSelected != null) {
        setTimeout(function () {
            var isStoreAv = isStoreAvailable(isStoreSelected);

            if (isStoreAv) {
                // Working time
                if (isLocationOpen()) {
                    if (_apiDealsByStore != null) {
                        // Go to start
                        loadPage('success_start.html');
                    } else {
                        //Shop is empty
                        _nextActionUrl = "shop_select.html";
                        loadPage('empty_shop.html');
                        // showNotificationByText("cat-notification.jpg", "Shop is empty", "shop_select.html");
                    }
                } else {
                    loadPage('count_down.html');
                }
            } else {
                // Shop is not available anymore choose a new one
                // Go to Shop Select page
                // loadPage('shop_select.html');
                showNotificationByText("cat-notification.jpg", _apiNoteErrorData.error_order_shop_is_closed.message, "shop_select.html");
            }
        }, 3000);
    } else {
        //Go to Shop Select page
        loadPage('shop_select.html');
    }
}