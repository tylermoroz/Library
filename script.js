let myLibrary = [];
let libraryQueue = [];
const libraryDiv = document.getElementById("library-div");
const formDiv = document.getElementById("form-div");
const bookForm = document.getElementById("book-form");
const newBookBtn = document.getElementById("new-book-button");
const addBookBtn = document.getElementById("add-book");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pageInput = document.getElementById("pages");
const body = document.getElementById("body");
let bookIndex;
newBookBtn.classList.add("button-class");
addBookBtn.classList.add("button-class");

const Book = (title, author, pages, read) => {
  return { title, author, pages, read };
};

const displayLibrary = (book) => {
  let addBook = document.createElement("div");
  let addTitle = document.createElement("p");
  let addAuthor = document.createElement("p");
  let deleteBtn = document.createElement("button");
  let readStatusBtn = document.createElement("button");

  for (let i = 0; i < libraryQueue.length; i++) {
    addBook.classList.add("book-class");
    addTitle.textContent = libraryQueue[i].title;
    addAuthor.textContent = libraryQueue[i].author;
    deleteBtn.textContent = "DELETE";
    deleteBtn.classList.add("button-class");
    readStatusBtn.classList.add("button-class");
    addTitle.classList.add("title-class");
    addAuthor.classList.add("author-class");

    if (book.read == true) {
      book.read = true;
      readStatusBtn.textContent = "Read";
      readStatusBtn.style.backgroundColor = "rgb(171, 252, 151)";
    } else {
      book.read = false;
      readStatusBtn.textContent = "Not Read";
      readStatusBtn.style.backgroundColor = "rgb(255, 120, 120)";
    }
  }

  libraryDiv.appendChild(addBook);
  addBook.appendChild(addTitle);
  addBook.appendChild(addAuthor);
  addBook.appendChild(deleteBtn);
  addBook.appendChild(readStatusBtn);

  deleteBtn.addEventListener("click", function () {
    addBook.remove();
    myLibrary.splice(book["bookIndex"], 1);
    for (const book of myLibrary) {
      book["bookIndex"] = myLibrary.indexOf(book);
    }
  });

  readStatusBtn.addEventListener("click", function () {
    if (book.read == false) {
      book.read = true;
      readStatusBtn.textContent = "Read";
      readStatusBtn.style.backgroundColor = "rgb(171, 252, 151)";
    } else {
      book.read = false;
      readStatusBtn.textContent = " Not Read";
      readStatusBtn.style.backgroundColor = "rgb(255, 120, 120)";
    }
  });
};

const displayForm = () => {
  formDiv.style.display = "block";
  if (newBookBtn.textContent == "NEW BOOK") {
    newBookBtn.textContent = "CLOSE";
  } else if (newBookBtn.textContent == "CLOSE") {
    newBookBtn.textContent = "NEW BOOK";
    formDiv.style.display = "none";
  }
};

newBookBtn.addEventListener("click", displayForm);

const displayBook = (event) => {
  event.preventDefault();
  let book = Book();
  book.title = document.getElementById("title").value;
  book.author = document.getElementById("author").value;
  book.pages = document.getElementById("pages").value;
  book.read = document.getElementById("read").checked;
  myLibrary.push(book);
  book["bookIndex"] = myLibrary.indexOf(book);
  libraryQueue.push(book);
  bookForm.reset();
  displayLibrary(book);
  libraryQueue.length = 0;
};

bookForm.addEventListener("submit", (event) => {
  if (titleInput.value.length < 1) {
    event.preventDefault();
  }
  if (authorInput.value.length < 1) {
    event.preventDefault();
  }
  if (pageInput.value.length < 1 || pageInput.value == 0) {
    event.preventDefault();
  }
  displayBook(event);
});
