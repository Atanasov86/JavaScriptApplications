var app = app || {};

app.bookRequester = (function () {
    function BookRequester() {
        this.serviceUrl = app.requester.baseUrl +
            'appdata/' +
            app.requester.appId +
            '/book';
    }

    BookRequester.prototype.listAllBooks = function () {
        var defer = Q.defer();
        app.requester.makeRequest('GET', this.serviceUrl, null, true)
            .then(function (books) {
                defer.resolve(books);
            }, function (error) {
                console.log(error.responseText);
                defer.reject(error);
            }).done();

        return defer.promise;
    };

    BookRequester.prototype.createBook = function (title, author, isbn) {
        var defer = Q.defer();

        var data = {
            title: title,
            author: author,
            isbn: isbn
        };

        app.requester.makeRequest('POST', this.serviceUrl, data, true)
            .then(function (book) {
                defer.resolve(book);
            }, function (error) {
                defer.reject(error)
            }).done();

        return defer.promise;
    };

    BookRequester.prototype.getBookById = function (id){
        var defer = Q.defer();
        var requestUrl = this.serviceUrl + "/" + id;
        app.requester.makeRequest("GET", requestUrl, null, true)
            .then(function (book){
                defer.resolve(book);
            }, function (error){
                defer.reject(error);
            });

        return defer.promise;
    };

    BookRequester.prototype.deleteBook = function (id) {
        var defer = Q.defer();
        var requestUrl = this.serviceUrl + "/" + id;
        app.requester.makeRequest("DELETE", requestUrl, null, true)
            .then(function (success){
                defer.resolve(success);
            }, function (error){
                defer.reject(error);
            });

        return defer.promise;
    };

    BookRequester.prototype.updateBook = function (id, data) {
        var defer = Q.defer();
        var requestUrl = this.serviceUrl + "/" + id;

        app.requester.makeRequest("PUT", requestUrl, data, true)
            .then(function (success){
                defer.resolve(success);
            }, function (error){
                defer.reject(error);
            });

        return defer.promise;
    };

    return BookRequester;

})();
