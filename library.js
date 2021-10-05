// Simple library app

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let library = [];
const libContainer = $("#library");

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
    const card = document.createElement("section"); 
    card.classList.toggle("book-card");

    // Associate card element with 
    card.dataset.id = book.id;

    const title = document.createElement("div"); 
    title.classList.toggle("title");
    title.textContent = book.title;
    card.appendChild(title);

    const author = document.createElement("div"); 
    author.classList.toggle("author");
    author.textContent = `by ${book.author}`;
    card.appendChild(author);

    const series = document.createElement("div"); 
    series.classList.toggle("series");
    series.textContent = book.series;
    card.appendChild(series);

    const pages = document.createElement("div"); 
    pages.classList.toggle("pages");
    pages.textContent = `${book.pageCount} pages`;
    card.appendChild(pages);

    const readStatus = document.createElement("div");
    readStatus.classList.toggle("read-status");
    card.appendChild(readStatus);

    const readStatusToggle = document.createElement("input");
    readStatusToggle.setAttribute("type", "checkbox");
    readStatusToggle.classList.toggle("read-status-toggle");
    readStatus.appendChild(readStatusToggle);
    readStatusToggle.checked = book.isRead; 
    readStatusToggle.addEventListener("change", function () {
        book.isRead = !book.isRead;
        readStatusLabel.textContent = `${book.isRead ? "Completed" : "Not completed"}`;
    });

    const readStatusLabel = document.createElement("label"); 
    readStatusLabel.setAttribute("for", `book${book.id}`);
    readStatusLabel.classList.toggle("read-status-label");
    readStatusLabel.textContent = `${book.isRead ? "Completed" : "Not completed"}`;
    readStatus.appendChild(readStatusLabel);

    const deleteBookBtn = document.createElement("button")
    deleteBookBtn.classList.toggle("del-button");

    libContainer.appendChild(card);
}

function logLibrary(lib) {
    for (let i in library) {
        console.log(library[i].info());
    }
}


// Sample library
const b1 = new Book(1, "The Hobbit", "J.R.R. Tolkien", 227, true);
const b2 = new Book(2, "The Fellowship of the Ring", "J.R.R. Tolkien", 371, true);
const b3 = new Book(3, "The Silmarillian", "J.R.R. Tolkien", 408, false);
const b4 = new Book(3, "The Silmarillian", "J.R.R. Tolkien", 408, false);
const b5 = new Book(3, "The Silmarillian", "J.R.R. Tolkien", 408, false);
const b6 = new Book(3, "The Silmarillian", "J.R.R. Tolkien", 408, false);

addBookToLibrary(b1);
addBookToLibrary(b2);
addBookToLibrary(b3);
addBookToLibrary(b4);
addBookToLibrary(b5);
addBookToLibrary(b6);

