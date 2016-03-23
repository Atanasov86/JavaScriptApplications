var app = app || {};

app.userController = (function () {
    function UserController(viewBag, model) {
        this.viewBag = viewBag;
        this.model = model;
    }
    
    UserController.prototype.loadLoginPage = function (selector) {
        this.viewBag.showLoginPage(selector);
    };
    
    UserController.prototype.loadRegisterPage = function (selector) {
        this.viewBag.showRegisterPage(selector);
    };
    
    UserController.prototype.loadWelcomeUserPage = function (selector) {
        this.viewBag.showWelcomeUserPage(selector);
    };

    UserController.prototype.login = function (data) {
        return this.model.login(data)
            .then(function (success) {
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['userId'] = success._id;

                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/home/'});
                    Noty.success("Login successful.")
                });
            }, function () {
                var errMsg = JSON.parse(error.responseText);
                Noty.error(errMsg.error);
            });
    };

    UserController.prototype.register = function(data) {
        return this.model.register(data)
            .then(function(success) {
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['userId'] = success._id;

                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/home/'});
                    Noty.success("Successfully register.")
                });
            }, function (error) {
                Sammy(function () {
                    this.trigger('redirectUrl', {url:'#/register/'})
                });
                var errMsg = JSON.parse(error.responseText);
                Noty.error(errMsg.error);
            });
    };

    UserController.prototype.logout = function() {
        this.model.logout()
            .then(function() {
                sessionStorage.clear();

                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/'});
                    Noty.success("Successfully logout.")
                });
            })
    };

    return {
        load: function (viewBag, model) {
            return new UserController(viewBag, model);
        }
    }
})();
