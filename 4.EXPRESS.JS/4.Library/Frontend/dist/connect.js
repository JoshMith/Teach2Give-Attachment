"use strict";
// const API_URL = "http://localhost:3000/api/v1";
// // Interface Definitions
// interface Book {
//     book_id: number;
//     title: string;
//     author: string;
// }
// interface Borrower {
//     borrower_id: number;
//     user_id: number;
//     book_id: number;
//     status: string;
// }
// // Function to fetch and display books
// const fetchBooks = async () => {
//     try {
//         const response = await fetch(`${API_URL}/books`);
//         const books: Book[] = await response.json();
//         const booksList = document.getElementById("books-list");
//         if (booksList) {
//             booksList.innerHTML = ""; // Clear before adding new data
//             books.forEach(book => {
//                 const bookDiv = document.createElement("div");
//                 bookDiv.className = "book-card";
//                 bookDiv.innerHTML = `
//                     <h3>${book.title}</h3>
//                     <p>Author: ${book.author}</p>
//                     <button onclick="borrowBook(${book.book_id})">Borrow</button>
//                 `;
//                 booksList.appendChild(bookDiv);
//             });
//         }
//     } catch (error) {
//         console.error("Error fetching books:", error);
//     }
// };
// // Function to borrow a book
// const borrowBook = async (bookId: number) => {
//     try {
//         const response = await fetch(`${API_URL}/borrowers`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 user_id: 2,  // Example borrower ID
//                 book_id: bookId,
//                 librarian_id: 1  // Example librarian ID
//             })
//         });
//         if (response.ok) {
//             alert("Book borrowed successfully!");
//             fetchBooks();
//         } else {
//             alert("Error borrowing book!");
//         }
//     } catch (error) {
//         console.error("Error borrowing book:", error);
//     }
// };
// // Function to fetch and display borrowed books
// const fetchBorrowedBooks = async () => {
//     try {
//         const response = await fetch(`${API_URL}/borrowers`);
//         const borrowedBooks: Borrower[] = await response.json();
//         const borrowedList = document.getElementById("borrowed-books-list");
//         if (borrowedList) {
//             borrowedList.innerHTML = "";
//             borrowedBooks.forEach(borrow => {
//                 const borrowDiv = document.createElement("div");
//                 borrowDiv.className = "borrowed-card";
//                 borrowDiv.innerHTML = `
//                     <p>Borrower ID: ${borrow.user_id}</p>
//                     <p>Book ID: ${borrow.book_id}</p>
//                     <p>Status: ${borrow.status}</p>
//                 `;
//                 borrowedList.appendChild(borrowDiv);
//             });
//         }
//     } catch (error) {
//         console.error("Error fetching borrowed books:", error);
//     }
// };
// // Run functions based on page
// document.addEventListener("DOMContentLoaded", () => {
//     if (document.getElementById("books-list")) {
//         fetchBooks();
//     }
//     if (document.getElementById("borrowed-books-list")) {
//         fetchBorrowedBooks();
//     }
// });
//# sourceMappingURL=connect.js.map