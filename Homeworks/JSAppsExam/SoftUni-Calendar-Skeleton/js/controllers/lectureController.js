var app = app || {};

app.lectureController = (function () {
    function LectureController(viewBag, model) {
        this.viewBag = viewBag;
        this.model = model;
    }

    LectureController.prototype.loadDeleteLecturePage = function (selector, data) {
        this.viewBag.showDeleteLecturePage(selector, data);
    };


    LectureController.prototype.loadEditLecturePage = function (selector, data) {
        this.viewBag.showEditLecturePage(selector, data);
    };

    LectureController.prototype.loadAddLecturePage = function (selector) {
        this.viewBag.showAddLecturePage(selector);
    };
    
    LectureController.prototype.loadHomeMenu = function (selector) {
        this.viewBag.showHomeMenu(selector);
    };

    LectureController.prototype.loadAllLecture = function (selector) {
        var _this = this;
        this.model.listAllLectures()
            .then(function (data) {
                var result = [];

                data.forEach(function (lecture) {
                    result.push({
                        title: lecture.title,
                        start: lecture.start,
                        end: lecture.end,
                        lecturer: lecture.lecturer,
                        _id: lecture._id
                    });
                });
                _this.viewBag.showAllLectures(selector, result);
            }, function (error) {
                var errorMsg = JSON.parse(error.responseText);
                Noty.error(errorMsg.error);
            })
    };

    LectureController.prototype.loadMyLectures = function (selector) {
        var _this = this;
        var lecturer = sessionStorage['username'];
        this.model.listLectureByCreator(lecturer)
            .then(function (data) {
                var result = [];

                data.forEach(function (lecture) {
                    result.push({
                        title: lecture.title,
                        start: lecture.start,
                        end: lecture.end,
                        lecturer: lecture.lecturer,
                        _id: lecture._id
                    });
                });
                _this.viewBag.showMyLectures(selector, result);
            }, function (error) {
                var errorMsg = JSON.parse(error.responseText);
                Noty.error(errorMsg.error);
            });


    };
    
    LectureController.prototype.editLecture = function (data) {
        this.model.editLecture(data.id, data)
            .then(function () {
                Noty.success('Lecture successfully edited.');
                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/calendar/my/'});
                });
            }, function (error) {
                var errorMsg = JSON.parse(error.responseText);
                Noty.error(errorMsg.error);
            });
    };

    LectureController.prototype.deleteLecture = function (lectureId) {
        this.model.deleteLecture(lectureId)
            .then(function () {
                Noty.success('Lecture successfully deleted.');
                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/calendar/my/'});
                });
            }, function (error) {
                var errorMsg = JSON.parse(error.responseText);
                Noty.error(errorMsg.error);
            });
    };
    

    LectureController.prototype.addLecture = function (data) {
        var result = {
            title: data.title,
            start: data.start,
            end: data.end,
            lecturer: sessionStorage['username']
        };

        this.model.addLecture(result)
            .then(function () {
                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/calendar/my/'});
                    Noty.success("Lecture successful added.")
                });
            }, function (error) {
                var errorMsg = JSON.parse(error.responseText);
                Noty.error(errorMsg.error);
            });
    };

    return {
        load: function (viewBag, model) {
            return new LectureController(viewBag, model);
        }
    }
})();
