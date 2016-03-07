(function () {
    $(function () {
        var data = {
            name : 'Greece'
        };

        $.ajax({
            method: "POST",
            headers: {
                Authorization: 'Basic dGVzdDoxMjM0',
                ContentType: 'application/json'
            },
            url: "https://baas.kinvey.com/appdata/kid_b1fXIUVgkb/country",
            data: data
        }).success(function () {

        }).error(function () {
            alert('Cannot load countries.');
        }).done();
    })

})();
