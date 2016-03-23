var app = app || {};

app.userViewBag = (function () {
    function showLoginPage(selector) {
        $.get('templates/login.html', function (template) {
            $(selector).html(template);
            $('#login-button').on('click', function () {
                var username = $('#username').val(),
                    password = $('#password').val();
                    
                
                var data = {
                    username: username,
                    password: password
                };
                
                Sammy(function() {
                    this.trigger('login', data);
                })
            })
        })
    }
    
    function showWelcomeUserPage(selector, data) {
        $.get('templates/welcome-user.html', function (template){
            data = {
                username: sessionStorage['username']
            };
            
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);
        });        
    }
    
    function showRegisterPage(selector) {
        $.get('templates/register.html', function (template) {
            $(selector).html(template);
            $('#register-button').on('click', function () {
                var username = $('#username').val(),
                    password = $('#password').val(),
                    confirmPassword = $('#confirm-password').val();

                if (password !== confirmPassword){
                    Sammy(function () {
                        this.trigger('redirectUrl' ,{url: '#/register/'});
                        Noty.error("Password must be same like confirm password.")
                    });

                } else {
                    var data = {
                        username: username,
                        password: password
                    };

                    Sammy(function() {
                        this.trigger('register', data);
                    })
                }
            });

        })
    }

    return {
        load: function (){
            return {
                showLoginPage: showLoginPage,
                showRegisterPage: showRegisterPage,
                showWelcomeUserPage: showWelcomeUserPage
            }
        }
    }
})();
