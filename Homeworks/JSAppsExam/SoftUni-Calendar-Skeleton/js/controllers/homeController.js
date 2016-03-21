var app = app || {};

app.homeController = (function () {
    function HomeController(viewBag, model) {
        this.viewBag = viewBag;
        this.model = model;
    }

    HomeController.prototype.loadWelcomePage = function (selector) {
        this.viewBag.showWelcomePage(selector);
    };
    
    HomeController.prototype.loadLoginMenu = function (selector) {
        this.viewBag.showLoginMenu(selector);
    };

    return {
        load: function (viewBag, model) {
            return new HomeController(viewBag, model);
        }
    }
})();
