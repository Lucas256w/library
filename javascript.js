const addBook = document.querySelector('#add-book-button');
const dialog = document.querySelector('dialog');
const submitBtn = document.querySelector('#submit-button');
const cancelBtn = document.querySelector('#cancel-button');

addBook.addEventListener('click', () => {
    dialog.showModal()
});

cancelBtn.addEventListener('click', e => {
    e.preventDefault()
    dialog.close()
});

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// function addBookToLirary() {

// }

// function diplayBooks {
//     for ( i = 0; i < myLibrary.length; i++)
// }

