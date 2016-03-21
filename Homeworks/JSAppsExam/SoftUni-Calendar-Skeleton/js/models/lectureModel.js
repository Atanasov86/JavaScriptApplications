var app = app || {};

app.lectureModel = (function () {
    function LectureModel(requester) {
        this.requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/lectures/';
    }

    LectureModel.prototype.listAllLectures = function () {
        return this.requester.get(this.serviceUrl, true);
    };

    LectureModel.prototype.listLectureByCreator = function (lecturer) {
        var requestUrl = this.serviceUrl + '?query={"lecturer":"' + lecturer + '"}';
        return this.requester.get(requestUrl, true);
    };

    LectureModel.prototype.addLecture = function (data) {
        return this.requester.post(this.serviceUrl, data, true);
    };

    LectureModel.prototype.editLecture = function (lectureId, data) {
        var requestUrl = this.serviceUrl + lectureId;
        return this.requester.put(requestUrl, data, true);
    };

    LectureModel.prototype.deleteLecture = function (lectureId) {
        var requestUrl = this.serviceUrl + lectureId;
        return this.requester.delete(requestUrl, true);
    };
    
    return {
        load: function (requester){
            return new LectureModel(requester)
        }
    }
})();
