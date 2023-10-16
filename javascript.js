const addBook = document.querySelector('#add-book-button');
const dialog = document.querySelector('dialog');
const submitBtn = document.querySelector('#submit-button');
const cancelBtn = document.querySelector('#cancel-button');
let bookTitle_input = document.querySelector('#book-title-input');
let author_input = document.querySelector('#author-input');
let pages_input = document.querySelector('#pages-input');
let read_input = document.querySelector('#read-checkbox');
const bookContainer = document.querySelector('#books-container');
const duplicateErrorMessage = document.querySelector('#duplicate-book-error')

// STORES ALL BOOK IN ARRAY
let myLibrary = [];

// add book button plays modal
addBook.addEventListener('click', () => {
    dialog.showModal();
});

// upload book, dont and show error if book title already exist
submitBtn.addEventListener('click', (e) => {
    if (bookTitle_input.value == '' || author_input.value == '' || pages_input.value ==''){
        return
    }
    e.preventDefault();
    for (let books of myLibrary) {
        if (bookTitle_input.value == books.title) {
            duplicateErrorMessage.style.display = 'block';
            return
        } else {
            duplicateErrorMessage.style.display = 'none';
        }
    }

    const book = new Book(bookTitle_input.value, author_input.value, pages_input.value, read_input.checked)
    
    resetInputs()
    addBookToLirary(book);
    displayBooks();
    dialog.close()
});


// Exits out of modal, doesn't upload anythin
cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resetInputs()
    duplicateErrorMessage.style.display = 'none';
    dialog.close();
});


// Book object function
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

// append book to storage
function addBookToLirary(book) {
    myLibrary.push(book)
};

function resetInputs() {
    bookTitle_input.value = '';
    author_input.value = '';
    pages_input.value = '';
    read_input.checked = false;
}


// shows all books in array in the diplay container
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
            <div class="book-title">"${book.title}"</div>
            <div class="author">${book.author}</div>
            <div class="pages">${book.pages} pages</div>
            <button class="read-or-not ${reading_status_class}">${reading_status}</button>
            <button class="remove">Remove</button>
        `;
        
        bookContainer.appendChild(card);
    }


    // remove button settings, deletes ook object fro array on visibily on the web
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
    
    // read or not button toggle, also makes sure to update book object 'read' boolean
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


