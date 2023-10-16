const addBook = document.querySelector('#add-book-button');
const dialog = document.querySelector('dialog');
const submitBtn = document.querySelector('#submit-button');
const cancelBtn = document.querySelector('#cancel-button');
const bookTitle_input = document.querySelector('#book-title-input');
const author_input = document.querySelector('#author-input');
const pages_input = document.querySelector('#pages-input');
const read_input = document.querySelector('#read-checkbox');
const bookContainer = document.querySelector('#books-container');

addBook.addEventListener('click', () => {
    dialog.showModal();
});

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const book = new Book(bookTitle_input.value, author_input.value, pages_input.value, read_input.checked)
    addBookToLirary(book);
    displayBooks();
    dialog.close()
});

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close();
});

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

function addBookToLirary(book) {
    myLibrary.push(book)
};

function displayBooks() {
    for (const book of myLibrary) {
        const card = document.createElement('div');
        card.classList.add('card');
        if (book.read) {
            reading_status = 'Read'
            reading_status_class = 'read'
        } else {
            reading_status = 'Not read'
            reading_status_class = 'not-read'
        }
        
        card.innerHTML = `
            <div class="book-title">${book.title}</div>
            <div class="author">${book.author}</div>
            <div class="pages">${book.pages} pages</div>
            <button class="${reading_status_class}">${reading_status}</button>
            <button class="remove">Remove</button>
        `;
        
        bookContainer.appendChild(card);
    }
    
};


