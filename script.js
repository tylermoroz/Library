const bookShelf = document.querySelector('.books-tab');
const addBookButton =  document.getElementById('bookButton');
const buttonTab = document.querySelector('.button-tab');
const formElement = document.getElementById('formElement');
let addBook;
let addAuthor;
let deleteButton;
let readButton;
let bookIndex;
let selectedValue;

let myLibrary = [];
let libraryQueue = [];

class Book {
    constructor( title, author, pageCount ) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
    }

    readYet() {
        const radioBtns = document.querySelectorAll('input[name="read"]');
        
        for(const radio of radioBtns){
            if(radio.checked){
                selectedValue = radio.value;
                break;
            }
        }
    }

}


addBookButton.addEventListener('click', function() {
    let book = new Book();
    book.title = document.getElementById("title").value;
    book.author = document.getElementById("author").value;
    book.pageCount = document.getElementById("pages").value;
    book.readYet();
    book.readStatus = selectedValue;
    myLibrary.push(book);
    book['bookIndex'] = myLibrary.indexOf(book);
    libraryQueue.push(book);
    displayBooks(book);
    storeBook();
    formElement.reset();
    libraryQueue.length = 0;
})


function displayBooks(book){
    let addBook = document.createElement('div');
    let addAuthor = document.createElement('p');
    let deleteButton = document.createElement('button');
    let readButton = document.createElement('button');

    addBook.classList.add('book-div');
    
    deleteButton.textContent = `Delete`;
    readButton.textContent = selectedValue;
    readButton.dataset.status = selectedValue;
    
    
    for(let i = 0; i < libraryQueue.length; i++){ 
        addBook.textContent = `"${libraryQueue[i]['title']}"`;
        addAuthor.textContent = `-${libraryQueue[i]['author']}`;
                
    }

    bookShelf.appendChild(addBook);
    addBook.appendChild(addAuthor);
    addBook.appendChild(deleteButton);
    addBook.appendChild(readButton);


    deleteButton.addEventListener('click', function(){ 
        addBook.remove();
        myLibrary.splice(book['bookIndex'], 1);
        for(const book of myLibrary){
            book['bookIndex'] = myLibrary.indexOf(book);
        }
        localStorage.removeItem("Books");
        storeBook();
    })

    readButton.addEventListener('click', function(){
        if(readButton.dataset.status === "Read"){
            readButton.dataset.status = "Not Read";
            readButton.textContent = "Not Read";
        } else if (readButton.dataset.status === "Not Read"){
            readButton.dataset.status = "Read";
            readButton.textContent = "Read";
        }
        book.readStatus = readButton.dataset.status;
        localStorage.removeItem('Books');
        storeBook();
    })
}

window.addEventListener('load', function(){
    let retrieveLibrary = localStorage.getItem("Books");
    let storedBooks = JSON.parse(retrieveLibrary);
    for(let i = 0; i < storedBooks.length; i++){
        let book = new Book();
        book.title = storedBooks[i].title
        book.author = storedBooks[i].author
        book.pageCount = storedBooks[i].pageCount;
        selectedValue = storedBooks[i].readStatus;
        book.readStatus = selectedValue;
        myLibrary.push(book);
        book['bookIndex'] = myLibrary.indexOf(book);
        libraryQueue.push(book);
        displayBooks(book);
        libraryQueue.length = 0;
    }
})

function storeBook(){
    localStorage.setItem("Books", JSON.stringify(myLibrary));
}

