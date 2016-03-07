$(function () {
    var APP_ID = 'kid_b1fXIUVgkb',
        APP_SECRET = '82f8fbc0488b42fab45f364e7391d7e8';

    loadCountries();

    $('#add-country').on('click', function (){
        addCountry();
    });

    function loadCountries() {
        $.ajax({
            method: "GET",
            headers: {
                Authorization: 'Basic dGVzdDoxMjM0'
            },
            url: "https://baas.kinvey.com/appdata/kid_b1fXIUVgkb/country",
        }).success(function (data) {
            for (var c in data) {
                var country = data[c],
                countryItem = $('<li></li>');
                // create edit and delete buttons
                var editButton = $('<button></button>');

                editButton.attr('id','edit');
                editButton.text('Edit country');


                countryItem.text(country.name);
                countryItem.appendTo($('#countries'));
                editButton.appendTo($('#countries'));

            }
        }).error(function (error) {
            console.log(error);
        })
    }

    function addCountry() {
        var countryObj = {
            name: $("#add-name").val()
        };

        $.ajax({
                method: "POST",
                headers: {
                    Authorization: 'Basic dGVzdDoxMjM0',
                    ContentType: 'application/json'
                },
                url: "https://baas.kinvey.com/appdata/kid_b1fXIUVgkb/country",
                data: countryObj
        }).success(function (data){
            var newCountry = data,
                countryLi = $('<li></li>');

            countryLi.text(newCountry.name);
            countryLi.appendTo($("#countries"));

        }).error(function (error){
            console.log(error);
        })
    }

    function deleteCountry () {
        var country = "";
    }
});


