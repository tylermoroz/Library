let myLibrary = [];
let libraryQueue = [];
const libraryDiv = document.getElementById("library-div");
const formDiv = document.getElementById("form-div");
const bookForm = document.getElementById("book-form");
const newBookBtn = document.getElementById("new-book-button");
const addBookBtn = document.getElementById("add-book");
const body = document.getElementById("body");
let bookIndex;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function displayLibrary(book) {
    let addBook = document.createElement("div");
    let addTitle = document.createElement("p");
    let addAuthor = document.createElement("p");
    let deleteBtn = document.createElement("button");
    let readStatusBtn = document.createElement("button");

    for(let i = 0; i < libraryQueue.length; i++){ 
        addBook.classList.add("book-class");
        addTitle.textContent = libraryQueue[i].title;
        addAuthor.textContent = libraryQueue[i].author;
        deleteBtn.textContent = "DELETE";
        if(book.read == true) {
            book.read = true;
            readStatusBtn.textContent = "READ";
        } else {
            book.read = false;
            readStatusBtn.textContent = "NOT READ";
        }
    }

    libraryDiv.appendChild(addBook);
    addBook.appendChild(addTitle);
    addBook.appendChild(addAuthor);
    addBook.appendChild(deleteBtn);
    addBook.appendChild(readStatusBtn);

    deleteBtn.addEventListener('click', function() {
        addBook.remove();
        myLibrary.splice(book['bookIndex'], 1);
        for(const book of myLibrary){
            book['bookIndex'] = myLibrary.indexOf(book);
        }
    })

    readStatusBtn.addEventListener('click', function() {
        if(book.read == false) {
            book.read = true;
            readStatusBtn.textContent = "READ";
        } else {
            book.read = false;
            readStatusBtn.textContent = "NOT READ";
        }
    });

}

function displayForm() {
    formDiv.style.display = "block";
    body.style.gridTemplateColumns = "300px 1fr";
    body.style.gridTemplateRows = "200px 1fr";
    if(newBookBtn.textContent == "NEW BOOK"){
        newBookBtn.textContent = "CLOSE";
    } else if (newBookBtn.textContent == "CLOSE") {
        newBookBtn.textContent = "NEW BOOK";
        formDiv.style.display = "none";
        body.style.gridTemplateColumns = "100px 1fr";
        body.style.gridTemplateRows = "50px 1fr";
    }
}

newBookBtn.addEventListener('click', displayForm);

function displayBook(event) {
    event.preventDefault()
    let book = new Book();
    book.title = document.getElementById("title").value; 
    book.author = document.getElementById("author").value; 
    book.pages = document.getElementById("pages").value; 
    book.read = document.getElementById("read").checked; 
    myLibrary.push(book);
    book['bookIndex'] = myLibrary.indexOf(book);
    libraryQueue.push(book);
    bookForm.reset();
    displayLibrary(book);
    libraryQueue.length = 0;
    console.log(myLibrary);
}

addBookBtn.addEventListener('click', displayBook);