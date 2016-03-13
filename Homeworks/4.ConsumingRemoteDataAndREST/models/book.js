var Book = (function (){

    function Book (id, title, author, isbn){
        this._id = id;
        this._title = title;
        this._author = author;
        this._isbn = isbn;
        this.tags = [];
    }

    return Book;
})();