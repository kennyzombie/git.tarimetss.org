document.addEventListener('DOMContentLoaded', () => {
    const addBookForm = document.getElementById('addBookForm');
    const bookList = document.getElementById('bookList');

    // Function to load and display books from local storage
    function loadBooks() {
        let books = JSON.parse(localStorage.getItem('books')) || [];
        bookList.innerHTML = '';
        books.forEach((book, index) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerHTML = `
                <strong>${book.title}</strong> by ${book.author} (${book.year}) 
                <button class="btn btn-danger btn-sm float-end" onclick="deleteBook(${index})">Delete</button>
            `;
            bookList.appendChild(li);
        });
    }

    // Add a new book to local storage
    addBookForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const year = document.getElementById('year').value;

        let books = JSON.parse(localStorage.getItem('books')) || [];
        books.push({ title, author, year });
        localStorage.setItem('books', JSON.stringify(books));

        // Reset form and reload the books list
        addBookForm.reset();
        loadBooks();
    });

    // Delete a book from local storage
    window.deleteBook = function(index) {
        let books = JSON.parse(localStorage.getItem('books')) || [];
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
        loadBooks();
    };

    // Initial load of books
    loadBooks();
});
