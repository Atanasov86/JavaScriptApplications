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
    
    UserController.prototype.loadWelcomeUserPage = function (selector, menuSelector) {
        this.viewBag.showWelcomeUserPage(selector, menuSelector);
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
                Noty.error("Not existing user or wrong password.");
            });
    };

    UserController.prototype.register = function(data) {
        return this.model.register(data)
            .then(function(success) {
                console.log(success);
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['userId'] = success._id;

                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/home/'});
                    Noty.success("Successfully register.")
                });
            }, function () {
                Noty.error("Username is already exist.");
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
