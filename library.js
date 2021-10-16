// Simple library app

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

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

const LibraryFactory = (id, name, books=[]) => {
    // Initialize display elements
    const container = document.createElement("div");
    container.classList.toggle("library");
    $("main").appendChild(container);

    const addBookCard = (book) => {
        const card = document.createElement("section"); 
        card.classList.toggle("book-card");

        // Associate card element with book id
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

        container.appendChild(card);
    };

    const removeBookById = (book) => {
        const index = books.findIndex(x => x.id === book.id);
        try {
            if (index) {
                books.splice(index);
            }
            else {
                alert(`${books[index]} could not be found in the library.`);
            }
        } 
        catch (e) {
            console.error(e);
            alert(`${books[index]} could not be deleted from the library.`);
        }
    };

    const addBook = (book) => {
        const id = books.find(x => x.id === book.id);
        if (id === undefined) {
            books.push(book);
            addBookCard(book);
        } else {
            alert(`Book with id=${book.id} already exists. Book was not added`);
        }
    };

    return {id, name, addBook, removeBookById, addBookCard}
};

function logLibrary(lib) {
    for (let i in library) {
        console.log(library[i].info());
    }
}


// Sample library
const b1 = new Book(1, "The Hobbit", "J.R.R. Tolkien", 227, true);
const b2 = new Book(2, "The Fellowship of the Ring", "J.R.R. Tolkien", 371, true);
const b3 = new Book(3, "The Silmarillian", "J.R.R. Tolkien", 408, false);
const b4 = new Book(4, "The Silmarillian", "J.R.R. Tolkien", 408, false);
const b5 = new Book(5, "The Silmarillian", "J.R.R. Tolkien", 408, false);
const b6 = new Book(6, "The Silmarillian", "J.R.R. Tolkien", 408, false);

lib1 = LibraryFactory(1, "Home");
lib1.addBook(b1);
lib1.addBook(b2);
lib1.addBook(b3);
lib1.addBook(b4);
lib1.addBook(b5);
lib1.addBook(b6);

