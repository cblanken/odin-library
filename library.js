// Simple Library App

let library = [];

function Book(id, title, author=null, pageCount=null, isRead=false, series=null) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.isRead = isRead;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pageCount} pages, has ${this.isRead ? "" : "not"}been read}`;  
}

function addBookToLibrary(book) {
    library.push(book);
}

function displayLibrary(lib) {
    for (let i in library) {
        console.log(library[i].info());
    }
}


// Sample library
const b1 = new Book(1, "The Hobbit", "J.R.R. Tolkien", 227, true);
const b2 = new Book(2, "The Fellowship of the Ring", "J.R.R. Tolkien", 371, true);
const b3 = new Book(3, "The Silmarillian", "J.R.R. Tolkien", 408, false);

addBookToLibrary(b1);
addBookToLibrary(b2);
addBookToLibrary(b3);
