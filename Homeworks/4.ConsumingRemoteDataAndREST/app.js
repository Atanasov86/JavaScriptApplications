var app = app || {};

(function () {
    var APP_ID = 'kid_bkOn8O3fJW',
        APP_SECRET = '51a5beff3ebc40c9b82b7272dd38c8b1';

    app.requester.config(APP_ID, APP_SECRET);
    var userRequester = new app.UserRequester();
    var bookRequester = new app.bookRequester();

    // login user in app
    userRequester.login('admin', 'admin')
        .then(function () {
            bookRequester.listAllBooks()
                .then(function (books){
                    books.forEach(function (book){
                        addBookToDom(book);
                    })
                }, function (error){
                    console.log(error);
                });
        }, function (error) {
            console.log(error.responseText);
        });


    $("#add-book").on('click', addBook);

    function addBook() {
        var title = $('#book-name').val(),
        author = $('#author').val(),
        isbn = $('#isbn').val();

        bookRequester.createBook(title, author, isbn)
            .then(function (book){
                addBookToDom(book);
            }, function (error){
                console.log(error);
            });
    }

    function addBookToDom(book) {
        var row = $('<tr/>');
        var currentBook = new Book(book._id, book.title, book.author, book.isbn);
        row.attr('data-id', book._id);

        for (var prop in currentBook) {
            var cell = $('<td>').addClass(prop);
            if (prop !== '_id') {
                cell.text(currentBook[prop]);
                row.append(cell);
            }
        }

        //create buttons for edit/delete book and attach event listeners
        var buttonsTd = $('<td id="edit-delete">');
        var editButton = $('<button id="edit-button" class="btn btn-primary">Edit</button>');
        editButton.on('click', function (){
            var currentRow = editButton.parent().parent();
            $('#edit-form').fadeToggle('medium', function() {
                if ($(this).is(':visible'))
                    $(this).css('display','inline-block');
            });

            var bookId = currentRow.attr('data-id');
            bookRequester.getBookById(bookId)
                .then(function (book){
                    $('#edit-name').val(book.title);
                    $('#edit-author').val(book.author);
                    $('#edit-isbn').val(book.isbn);
                }, function (error){
                    console.log(error);
                });

            $('#save-book').on('click', function (){
                var title = $('#edit-name').val(),
                    author = $('#edit-author').val(),
                    isbn = $('#edit-isbn').val();

                var data = {
                    title: title,
                    author: author,
                    isbn: isbn
                };

                bookRequester.updateBook(bookId,data)
                    .then(function (book){
                        currentRow.find('._title').html(data.title);
                        currentRow.find('._author').html(data.author);
                        currentRow.find('._isbn').html(data.isbn);
                    }, function (error) {
                        console.log(error);
                    })
            });
        });

        var deleteButton = $('<button id="delete-button" class="btn btn-primary">Delete</button>');
        deleteButton.on('click', function () {
            var currentRow = deleteButton.parent().parent();
            var bookId = currentRow.attr('data-id');

            //makes delete request to kinvey. If request is success remove from DOM.
            bookRequester.deleteBook(bookId)
                .then(function (){
                    currentRow.remove();
                }, function (error){
                    console.log(error);
                });

        });
        buttonsTd.append(editButton).append(deleteButton);
        row.append(buttonsTd);
        $('tbody').append(row);
    }

    function loadEditForm (button){

    }
})();