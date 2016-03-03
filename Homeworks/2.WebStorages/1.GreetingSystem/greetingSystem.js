(function () {

    $(function (){
        if(localStorage.getItem('name')) {
            var name = localStorage.getItem('name'),
                greeting;

            // remove input field for existing user
            $('#greeting-form').children().remove();

            //create greeting for existing user
            greeting = $('<h3></h3>')
            greeting.text('Welcome ' + name);
            $('#greeting-form').append(greeting);
        }

        //set name to localStorage
        $('#set-name').on('click', function (){
            var currentName = $('#name').val();
            localStorage.setItem('name', currentName);
            location.reload();
        })
    });

    function incrementLoads() {

        // Session storage counter
        if (!sessionStorage.getItem('sessionVisitCounter')) {
            sessionStorage.setItem('sessionVisitCounter', 0);
        }
        var sessionVisitCount = parseInt(sessionStorage.getItem('sessionVisitCounter'));
        sessionVisitCount += 1;
        sessionStorage.setItem('sessionVisitCounter', sessionVisitCount);
        $('#sessionCountDiv').text('Session visit count: ' + sessionVisitCount);

        //Local storage counter
        if (!localStorage.getItem('localVisitCounter')) {
            localStorage.setItem('localVisitCounter', 0);
        }
        var localVisitCount = parseInt(localStorage.getItem('localVisitCounter'));
        localVisitCount++;
        localStorage.setItem('localVisitCounter', localVisitCount);
        $('#localCountDiv').text('Local storage visit count: ' + localVisitCount);
    }

    $(function () {
        incrementLoads();
    });

})();