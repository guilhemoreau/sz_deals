var app = {
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('online', this.onOnline, false);
        document.addEventListener('offline', this.onOffline, false);
    },
    onDeviceReady: function () {
        StatusBar.overlaysWebView(false);
        StatusBar.backgroundColorByHexString("#000");
        StatusBar.hide();
    },
    onOnline: function () {
        isDeviceConnectOnInternet = true;
    },
    onOffline: function () {
        isDeviceConnectOnInternet = false;
        loadPage('notification.html');
    }
};
