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

    for(let i = 0; i < libraryQueue.length; i++){ 
        addBook.style.border = "1px solid black";
        addBook.style.width = "200px";
        addTitle.textContent = libraryQueue[i].title;
        addAuthor.textContent = libraryQueue[i].author;
        deleteBtn.textContent = "DELETE";
    }

    libraryDiv.appendChild(addBook);
    addBook.appendChild(addTitle);
    addBook.appendChild(addAuthor);
    addBook.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', function(){
        addBook.remove();
        myLibrary.splice(book['bookIndex'], 1);
        for(const book of myLibrary){
            book['bookIndex'] = myLibrary.indexOf(book);
        }
    })

}

function displayForm() {
    formDiv.style.display = "block";
    body.style.gridTemplateColumns = "300px 1fr";
}

newBookBtn.addEventListener('click', displayForm);

function displayBook(event) {
    event.preventDefault()
    let book = new Book();
    book.title = document.getElementById("title").value; 
    book.author = document.getElementById("author").value; 
    book.pages = document.getElementById("pages").value; 
    book.read = document.getElementById("read").value; 
    myLibrary.push(book);
    book['bookIndex'] = myLibrary.indexOf(book);
    libraryQueue.push(book);
    bookForm.reset();
    displayLibrary(book);
    libraryQueue.length = 0;
    console.log(myLibrary);
}

addBookBtn.addEventListener('click', displayBook);