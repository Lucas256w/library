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


let myLibrary = [];

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
    while (bookContainer.firstChild) {
        bookContainer.removeChild(bookContainer.firstChild);
    }
    for (const book of myLibrary) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data_book_num', myLibrary.indexOf(book))
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
            <button class="read-or-not ${reading_status_class}">${reading_status}</button>
            <button class="remove">Remove</button>
        `;
        
        bookContainer.appendChild(card);
    }

    const removeBook = document.querySelectorAll('.remove');
    removeBook.forEach(button => {
        button.addEventListener('click', (e) =>{
                const container = e.target.closest('.card')
                if (container) {
                    const bookId = Number(container.getAttribute('data_book_num'));
                    myLibrary.splice(bookId, 1)
                    container.remove();
                }
                displayBooks();
        })
    });
    
    const read_button = document.querySelectorAll('.read-or-not');
    read_button.forEach(button => {
        button.addEventListener('click', (e) => {
            const container = e.target.closest('.card')
            const bookId = Number(container.getAttribute('data_book_num'));
            if (button.classList.contains('read')){
                button.classList.remove('read')
                button.classList.add('not-read')
                button.textContent = 'Not Read'
                myLibrary[bookId].read = false;
            } else {
                button.classList.remove('not-read')
                button.classList.add('read')
                button.textContent = 'Read'
                myLibrary[bookId].read = true
            }
        })
    })
};


