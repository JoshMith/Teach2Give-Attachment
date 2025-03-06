let booksData = [];
let cart = [];
let totalPrice = 0;

async function fetchBooks() {
    try {
        const response = await fetch("http://localhost:3000/books");
        booksData = await response.json();
        displayBooks(booksData);
        populateYearFilter(); // Populate year filter dynamically
    } catch (error) {
        console.error("Error Fetching Data:", error);
    }
}

function displayBooks(filteredBooks) {
    const bookDetails = document.getElementById("bookDetails");
    bookDetails.innerHTML = "";

    filteredBooks.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        bookDiv.innerHTML = `
        <h2>${book.title}</h2>
        <img src="${book.image}" alt="${book.title}" width="100">
        <p id="warningMsg">${book.pages > 500 ? "Warning: This book has over 500 pages" : ""}</p>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Genre:</strong> ${book.genre}</p>
        <p><strong>Year:</strong> ${book.year}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>Publisher:</strong> ${book.publisher}</p>
        <p><strong>Price:</strong> $${book.price.toFixed(2)}</p>
        <p><strong>Description:</strong> ${book.description}</p> 
        <button class="buy" data-id="${book.id}" data-title="${book.title}" data-price="${book.price}" data-icon="${book.image}">Buy Now</button>
        `;

        bookDetails.appendChild(bookDiv);
    });

    document.querySelectorAll(".buy").forEach(button => {
        button.addEventListener("click", addToCart);
    });
}

function addToCart(event) {
    const button = event.target;
    const bookId = button.getAttribute("data-id");
    const bookTitle = button.getAttribute("data-title");
    const bookPrice = parseFloat(button.getAttribute("data-price"));
    const bookIcon = button.getAttribute("data-icon");

    cart.push({ image: bookIcon, id: bookId, title: bookTitle, price: bookPrice });
    document.getElementById("cartCount").innerText = cart.length;
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartContent = document.getElementById("cartContent");
    const totalPriceElement = document.getElementById("totalPrice");

    if (cart.length === 0) {
        cartContent.innerHTML = "<p>Your cart is empty</p>";
        totalPrice = 0;
    } else {
        cartContent.innerHTML = ""; // Clear previous content

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="${item.image}" class="cart-img" alt="${item.title}">
                <p>${item.title} - $${item.price.toFixed(2)}</p>
                <button class="remove" data-index="${index}">Remove</button>
            `;

            cartContent.appendChild(cartItem);
        });

        totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    }

    totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;

    // Add event listeners to "Remove" buttons
    document.querySelectorAll(".remove").forEach(button => {
        button.addEventListener("click", removeFromCart);
    });
}

// Function to remove book from cart
function removeFromCart(event) {
    const index = event.target.getAttribute("data-index");
    cart.splice(index, 1); // Remove book from cart array
    document.getElementById("cartCount").innerText = cart.length; // Update cart count
    updateCartDisplay(); // Update cart modal display
}

// Modal functionality
var modal = document.getElementById("myModal");
var btn = document.getElementById("cartButton");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Genre filtering
document.getElementById("filterDropdown").addEventListener("change", filterBooks);

document.getElementById("yearFilter").addEventListener("change", filterBooks);

function filterBooks() {
    const selectedGenre = document.getElementById("filterDropdown").value;
    const selectedYearRange = document.getElementById("yearFilter").value;
    
    let filteredBooks = booksData;

    if (selectedGenre !== "all") {
        filteredBooks = filteredBooks.filter(book => book.genre.toLowerCase() === selectedGenre.toLowerCase());
    }
    
    if (selectedYearRange !== "all") {
        const [start, end] = selectedYearRange.split("-").map(Number);
        filteredBooks = filteredBooks.filter(book => book.year >= start && book.year <= end);
    }
    
    displayBooks(filteredBooks);
}

// Populate Year Filter dynamically
function populateYearFilter() {
    const yearFilter = document.getElementById("yearFilter");
    yearFilter.innerHTML = '<option value="all">All Years</option>';
    
    const yearIntervals = [
        { start: 1800, end: 1900 },
        { start: 1901, end: 1940 },
        { start: 1941, end: 1960 },
        { start: 1961, end: 1980 },
        { start: 1981, end: 2000 },
        { start: 2001, end: 2025 }
    ];
    
    yearIntervals.forEach(interval => {
        const option = document.createElement("option");
        option.value = `${interval.start}-${interval.end}`;
        option.textContent = `${interval.start}-${interval.end}`;
        yearFilter.appendChild(option);
    });
}

// Fetch books when the page loads
document.addEventListener("DOMContentLoaded", fetchBooks);
