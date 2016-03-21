(function () {
    var router = Sammy(function () {
        var selector = '#wrapper';

        this.get('#/Bob', function () {
            $.get('bob.html', function (template) {
                $(selector).html(template);
            })
        });

        this.get('#/Sam', function () {
            var $greeting = $('<h2>Hello, Sam</h2>');
            $(selector).append($greeting);
        })
    });

    router.run('index')
})();
