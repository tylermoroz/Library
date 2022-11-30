let myLibrary = [];
let libraryQueue = [];
const body = document.getElementById("body");
const formDiv = document.getElementById("form-div");
const bookForm = document.getElementById("book-form");
const newBookBtn = document.getElementById("new-book-button");
const addBookBtn = document.getElementById("add-book");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function displayLibrary() {
    for(let i = 0; i < libraryQueue.length; i++){
        const addBook = document.createElement("div");
        const addTitle = document.createElement("p");
        const addAuthor = document.createElement("p");
        addBook.style.border = "1px solid black";
        addBook.style.width = "200px";
        addTitle.textContent = libraryQueue[i].title;
        addAuthor.textContent = libraryQueue[i].author;
        body.appendChild(addBook);
        addBook.appendChild(addTitle);
        addBook.appendChild(addAuthor);
    }
}

function displayForm() {
    formDiv.style.display = "block";
}

newBookBtn.addEventListener('click', displayForm);

function displayBook(event) {
    event.preventDefault()
    const book = new Book();
    book.title = document.getElementById("title").value; 
    book.author = document.getElementById("author").value; 
    book.pages = document.getElementById("pages").value; 
    book.read = document.getElementById("read").value; 
    myLibrary.push(book);
    libraryQueue.push(book);
    bookForm.reset();
    displayLibrary();
    libraryQueue.length = 0;
    console.log(myLibrary);
}

addBookBtn.addEventListener('click', displayBook);