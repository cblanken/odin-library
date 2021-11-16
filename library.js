// Simple library app

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

class Book {
    constructor (id, title, author=null, pageCount=null, isRead=false, series=null) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.isRead = isRead;
        this.series = series;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pageCount} pages, has ${this.isRead ? "" : "not"}been read}`;  
    }
}

const LibraryFactory = (id, name, books=[]) => {
    // Type checks
    if (Array.isArray(books) === false) {
        books = [];
        console.log(`Library: ${name} was not given a valid array. Reset to empty`);
    }

    // Initialize display elements
    const container = document.createElement("div");
    container.classList.toggle("library");
    $("main").appendChild(container);

    // Add book button
    const addBookButton = document.createElement("button");
    addBookButton.classList.toggle("add-book-button");
    addBookButton.textContent = "+"; 

    addBookButton.addEventListener("click", () => {
        const modal = $("#add-book-popup");
        modal.classList.toggle("reveal-modal");
    });
    $("body").appendChild(addBookButton);

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
        deleteBookBtn.innerHTML = `<i class="far fa-trash-alt"></i>`;
        deleteBookBtn.addEventListener("click", () => {
            removeBook(book); 
        });
        card.appendChild(deleteBookBtn);
        
        container.appendChild(card);
    };

    const removeBook = (book) => {
        const index = books.findIndex(x => x.id === book.id);
        try {
            if (index != undefined) {
                books.splice(index, 1);
                // Select book card by id and delete
                const card = $(`.book-card[data-id="${book.id}"]`)
                card.remove();
                removeBookFromLocalStorage(book);
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
        const newBook = books.find(x => x.id === book.id);
        if (newBook === undefined) {
            books.push(book);
            addBookCard(book);
            addBookToLocalStorage(book);
        } else {
            alert(`Book with id=${book.id} already exists. Book was not added`);
        }
    };

    const addBookToLocalStorage = (book) => {
        let storage = JSON.parse(window.localStorage.getItem("books")) ?? [];
        storage.push(book);
        window.localStorage.setItem("books", JSON.stringify(books));
    }
    
    const removeBookFromLocalStorage = (book) => {
        let storage = JSON.parse(window.localStorage.getItem("books"));
        const i = storage.findIndex((x) => { x.id === book.id; });
        storage.splice(i);
        window.localStorage.setItem("books", JSON.stringify(books));
    }

    // Add cards for any provided books 
    books.forEach(book => addBookCard(book));

    return {id, name, books, addBook, removeBook, addBookCard}
};

function logLibrary(lib) {
    for (let i in library) {
        console.log(library[i].info());
    }
}

function generateAvailableIndex(books) {
    // Find available index
    let index = 0;
    do {
        // Regenerate index until one unused is found
        index = Math.floor(Math.random() * 99999);
    } while (books.find((x) => { x.id === index; }) !== undefined)

    return index;
}

window.addEventListener("message", (event) => {
    // TODO add origin check for security
    //if (event.origin !== "./popupBookForm.html")
        //return;
    if (event.data.action === "add") {
        let book = new Book(
            id = generateAvailableIndex(lib.books),
            title = event.data.name,
            author = event.data.authors, 
            pageCount = event.data.pageCount,
            isRead = event.data.completionStatus,
            series = event.data.series
        );

        lib.addBook(book);
    }
    // Hide popup
    $("#add-book-popup").classList.toggle("reveal-modal");
}, false);


// Initialize library instance
let books = window.localStorage.getItem("books");
if (books) {
    console.log("Books found in local storage. Loading books into library...");
    books = JSON.parse(books);
} else {
    console.log("No books found in local storage. Loading empty library...");
    books = []; 
}

const lib = LibraryFactory(1, "Home", books);


