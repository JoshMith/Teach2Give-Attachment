"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Initialize cart state
let cartItems = [];
let isCartOpen = false;
const fetchBooks = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (params = {}) {
    try {
        const queryParams = new URLSearchParams(params).toString();
        const url = `http://localhost:3000/api/books${queryParams ? `?${queryParams}` : ""}`;
        console.log("Fetching from URL:", url);
        const response = yield fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch books: ${response.status}`);
        }
        const data = yield response.json();
        console.log("Received data:", data);
        return data;
    }
    catch (error) {
        console.error("Error fetching books:", error);
        return []; // Return empty array if fetch fails
    }
});
const displayBooks = (books) => {
    const productList = document.getElementById("product-list");
    if (!productList)
        return;
    productList.innerHTML = books
        .map((book) => `
      <div class="book-details">
        <img src=${book.image} alt=${book.title}/>
        <h2>${book.title}</h2>
        <p class="author">by ${book.author}</p>
        <span class="genre">${book.genre}</span>
        <div class="book-metadata">
          <p><span>Published:</span> ${book.year}</p>
          <p><span>Pages:</span> ${book.pages}</p>
          <p><span>Publisher:</span> ${book.publisher}</p>
          <p><span>Price:</span> ${book.price}</p>
          <button class="buy" data-id="${book.id}">Buy Now</button>
        </div>
      </div>
    `)
        .join("");
    // Add event listeners to buy buttons after displaying books
    addBuyButtonListeners(books);
};
// Add event listener for buy buttons - FIXED: Pass books array to maintain reference
const addBuyButtonListeners = (books) => {
    const buyButtons = document.querySelectorAll('.buy');
    buyButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const bookId = Number(button.getAttribute('data-id'));
            // Find the book by ID instead of index
            const bookIndex = books.findIndex(book => book.id === bookId);
            if (bookIndex !== -1) {
                addToCart(books[bookIndex]);
            }
        });
    });
};
// Function to add a book to cart - FIXED: Take direct book object instead of index
const addToCart = (selectedBook) => {
    try {
        if (!selectedBook) {
            console.error("Book not found");
            return;
        }
        // Check if item already exists in cart
        const existingItemIndex = cartItems.findIndex(item => item.id === selectedBook.id);
        if (existingItemIndex > -1) {
            // Increment quantity if already in cart
            cartItems[existingItemIndex].quantity += 1;
        }
        else {
            // Add new item to cart with quantity 1
            cartItems.push(Object.assign(Object.assign({}, selectedBook), { quantity: 1 }));
        }
        console.log("Cart updated:", cartItems);
        // Update cart UI
        updateCartCount();
        updateCartItems();
        // Show confirmation to user
        showToast(`${selectedBook.title} added to cart!`);
        // Optionally open the cart
        openCart();
    }
    catch (error) {
        console.error("Error adding to cart:", error);
    }
};
// Function to update cart count display
const updateCartCount = () => {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems.toString();
        console.log("Updated cart count:", totalItems);
    }
    else {
        console.warn("Cart count element not found");
    }
};
// Function to update cart items display - FIXED: Better error handling
const updateCartItems = () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    if (!cartItemsContainer) {
        console.error("Cart container not found!");
        return;
    }
    console.log("Updating cart items, current items:", cartItems);
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        updateCartTotal(0);
        return;
    }
    let totalPrice = 0;
    cartItemsContainer.innerHTML = cartItems
        .map(item => {
        // Check if the item is valid
        if (!item || !item.id || !item.title || !item.author) {
            console.error("Invalid item in cart:", item);
            return '';
        }
        if (!item.price) {
            console.error("Item price is missing", item);
            return '';
        }
        // Properly parse the price string to get a number
        const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        const itemTotal = priceValue * item.quantity;
        totalPrice += itemTotal;
        return `
          <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-info">
              <h3>${item.title}</h3>
              <p>by ${item.author}</p>
              <p>Price: ${item.price}</p>
            </div>
            <div class="cart-item-actions">
              <div class="quantity-controls">
                <button class="decrease-quantity">-</button>
                <span class="item-quantity">${item.quantity}</span>
                <button class="increase-quantity">+</button>
              </div>
              <button class="remove-item">Remove</button>
            </div>
          </div>
        `;
    })
        .join('');
    console.log("Cart HTML updated");
    // After updating the DOM, reattach event listeners
    addCartItemEventListeners();
    updateCartTotal(totalPrice);
};
// Function to add event listeners to cart item buttons
const addCartItemEventListeners = () => {
    console.log("Adding cart item event listeners");
    // Increase quantity buttons
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            if (cartItem) {
                const itemId = Number(cartItem.getAttribute('data-id'));
                increaseQuantity(itemId);
            }
        });
    });
    // Decrease quantity buttons
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            if (cartItem) {
                const itemId = Number(cartItem.getAttribute('data-id'));
                decreaseQuantity(itemId);
            }
        });
    });
    // Remove item buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            if (cartItem) {
                const itemId = Number(cartItem.getAttribute('data-id'));
                removeFromCart(itemId);
            }
        });
    });
};
// Function to increase item quantity
const increaseQuantity = (itemId) => {
    console.log("Increasing quantity for item:", itemId);
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
        cartItems[itemIndex].quantity += 1;
        updateCartItems();
        updateCartCount();
    }
};
// Function to decrease item quantity
const decreaseQuantity = (itemId) => {
    console.log("Decreasing quantity for item:", itemId);
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
        if (cartItems[itemIndex].quantity > 1) {
            cartItems[itemIndex].quantity -= 1;
        }
        else {
            // Remove item if quantity would be 0
            cartItems.splice(itemIndex, 1);
        }
        updateCartItems();
        updateCartCount();
    }
};
// Function to remove an item from cart
const removeFromCart = (itemId) => {
    console.log("Removing item from cart:", itemId);
    cartItems = cartItems.filter(item => item.id !== itemId);
    updateCartItems();
    updateCartCount();
};
// Function to update the cart total price
const updateCartTotal = (total) => {
    const cartTotal = document.querySelector('.cart-total span:last-child');
    if (cartTotal) {
        cartTotal.textContent = `$${total.toFixed(2)}`;
        console.log("Updated cart total:", total);
    }
    else {
        console.warn("Cart total element not found");
    }
};
// Function to show a toast notification
const showToast = (message) => {
    // Create toast element if it doesn't exist
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }
    // Set message and show toast
    toast.textContent = message;
    toast.classList.add('show');
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
};
// Function to open cart
const openCart = () => {
    const cartDiv = document.querySelector('.cart-div');
    const cartOverlay = document.querySelector('.cart-overlay');
    if (cartDiv && cartOverlay) {
        cartDiv.classList.add('open');
        cartOverlay.classList.add('show');
        isCartOpen = true;
        console.log("Cart opened");
    }
    else {
        console.warn("Cart elements not found");
    }
};
// Function to close cart
const closeCart = () => {
    const cartDiv = document.querySelector('.cart-div');
    const cartOverlay = document.querySelector('.cart-overlay');
    if (cartDiv && cartOverlay) {
        cartDiv.classList.remove('open');
        cartOverlay.classList.remove('show');
        isCartOpen = false;
        console.log("Cart closed");
    }
};
function handleFilter() {
    var _a, _b, _c, _d;
    const params = {};
    const selectedGenre = (_a = document.getElementById("search")) === null || _a === void 0 ? void 0 : _a.value;
    const publishYear = (_b = document.getElementById("year")) === null || _b === void 0 ? void 0 : _b.value;
    const pagesNumber = (_c = document.getElementById("minPages")) === null || _c === void 0 ? void 0 : _c.value;
    const sortBy = (_d = document.getElementById("sort")) === null || _d === void 0 ? void 0 : _d.value;
    if (selectedGenre) {
        params.genre = selectedGenre;
    }
    if (publishYear) {
        params.year = publishYear;
    }
    if (pagesNumber) {
        params.pages = pagesNumber;
    }
    if (sortBy) {
        params.sort = sortBy;
    }
    console.log("Filter parameters:", params);
    return params;
}
// Fetch and display books on page load
const loadBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield fetchBooks();
    console.log("Loaded books:", books);
    displayBooks(books);
});
// Initialize the cart and event listeners when the page loads
document.addEventListener('DOMContentLoaded', () => {
    var _a, _b, _c, _d, _e;
    console.log("DOM loaded, initializing cart");
    // Initialize empty cart
    updateCartItems();
    updateCartCount();
    // Load all books initially
    loadBooks();
    // Set up cart toggle functionality
    (_a = document.querySelector('.cart-icon-container')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        if (isCartOpen) {
            closeCart();
        }
        else {
            openCart();
        }
    });
    // Close cart button event
    (_b = document.querySelector('.close-cart')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', closeCart);
    // Cart overlay click to close cart
    (_c = document.querySelector('.cart-overlay')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', closeCart);
    // Checkout button event
    (_d = document.querySelector('.checkout-btn')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
        if (cartItems.length === 0) {
            showToast('Your cart is empty!');
            return;
        }
        // In a real application, this would redirect to checkout page
        showToast('Proceeding to checkout...');
        // For demo purposes, just clear the cart
        setTimeout(() => {
            cartItems = [];
            updateCartItems();
            updateCartCount();
            closeCart();
            showToast('Thank you for your purchase!');
        }, 1500);
    });
    // Search button event
    (_e = document.getElementById("searchBtn")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        const filterParams = handleFilter();
        console.log("Filter params:", filterParams);
        const filteredBooks = yield fetchBooks(filterParams);
        displayBooks(filteredBooks);
    }));
});
// Select the button element by ID
const toggleFormButton = document.getElementById('toggle-form-button');
// Select the form element by ID
const form = document.getElementById('post-form');
// Ensure the form is initially hidden
if (form) {
    form.style.display = 'none'; // Ensure form is hidden by default
}
// Add an event listener to toggle form visibility
toggleFormButton === null || toggleFormButton === void 0 ? void 0 : toggleFormButton.addEventListener('click', () => {
    // Toggle form visibility when the button is clicked
    if (form.style.display === 'block') {
        form.style.display = 'none';
    }
    else {
        form.style.display = 'block';
    }
});
//# sourceMappingURL=server2.js.map