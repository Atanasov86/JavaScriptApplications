var app = app || {};

(function () {
    var router = Sammy(function () {
        var selector = '#container';
        var menuSelector = '#menu';
        
        var requester = app.requester.load('kid_W1QhjK4pJ-', '1f26e77390dc49c3bfc66b25495fdb13', 'https://baas.kinvey.com/');
        
        var userModel = app.userModel.load(requester);
        var lectureModel = app.lectureModel.load(requester);
        
        var userViewBag = app.userViewBag.load();
        var homeViewBag = app.homeViewBag.load();
        var lectureViewBag = app.lectureViewBag.load();
        
        var userController = app.userController.load(userViewBag, userModel);
        var homeController = app.homeController.load(homeViewBag);
        var lectureController = app.lectureController.load(lectureViewBag, lectureModel);
        
        this.before({except:{path:'#\/(login\/|register\/)?'}}, function() {
            if(!sessionStorage['sessionId']) {
                this.redirect('#/');
                return false;
            }
        });

        this.before(function() {
            if(!sessionStorage['sessionId']) {
                homeController.loadLoginMenu(menuSelector);
            } else {
                lectureController.loadHomeMenu(menuSelector);
            }
        });

        this.get('#/', function () {            
            homeController.loadWelcomePage(selector);
        });

        this.get('#/login/', function () {
            userController.loadLoginPage(selector);            
        });

        this.get('#/register/', function () {
            userController.loadRegisterPage(selector);
        });
        
        this.get('#/home/', function () {
            userController.loadWelcomeUserPage(selector);
        });
        
        this.get('#/calendar/list/', function () {
            lectureController.loadAllLecture(selector);
        });
        
        this.get('#/calendar/my/', function () {
            lectureController.loadMyLectures(selector);
        });

        this.get('#/calendar/add/', function () {
            lectureController.loadAddLecturePage(selector);
        });

        this.get('#/calendar/edit/:id', function () {
            lectureController.loadEditLecturePage(selector, this.params['id']);
        });

        this.get('#/calendar/delete/:id', function () {
            lectureController.loadDeleteLecturePage(selector, this.params['id']);
        });

        this.get('#/logout/', function () {
            userController.logout();
        });

        this.bind('login', function (ev, data) {
            userController.login(data);
        });

        this.bind('register', function (ev, data) {
            userController.register(data);
        });
        
        this.bind('add-lecture', function (ev, data) {
            lectureController.addLecture(data);
        });

        this.bind('showEditLecture', function (ev, data) {
            lectureController.loadEditLecturePage(selector, data);
        });

        this.bind('edit-lecture', function (ev, data) {
            lectureController.editLecture(data);
        });

        this.bind('showDeleteLecture', function (ev, data) {
            lectureController.loadDeleteLecturePage(selector, data)
        });

        this.bind('delete-lecture', function (ev, data) {
            lectureController.deleteLecture(data);
        });

        this.bind('redirectUrl', function(ev, data) {
            this.redirect(data.url);
        });
    });

    router.run('#/');
})();
