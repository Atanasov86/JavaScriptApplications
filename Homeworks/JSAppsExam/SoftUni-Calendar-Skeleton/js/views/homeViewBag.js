var app = app || {};

app.homeViewBag = (function () {
    function showWelcomePage (selector) {
        $.get('templates/welcome-guest.html', function (template) {
            $(selector).html(template);
        })
    }

    function showLoginMenu(selector) {
        $.get('templates/menu-login.html', function (template) {
            $(selector).html(template);
        })
    }

    return {
        load: function (){
            return {
                showWelcomePage: showWelcomePage,
                showLoginMenu: showLoginMenu
            }

        }
    }
})();
