
// // Genre & Year Filtering
// const genreFilter = document.getElementById("filterDropdown") as HTMLSelectElement;
// const yearFilter = document.getElementById("yearFilter") as HTMLSelectElement;

// genreFilter.addEventListener("change", filterBooks);
// yearFilter.addEventListener("change", filterBooks);

// function filterBooks(): void {
//     const selectedGenre = genreFilter.value;
//     const selectedYearRange = yearFilter.value;
    
//     let filteredBooks = booksData;

//     if (selectedGenre !== "all") {
//         filteredBooks = filteredBooks.filter(book => book.genre.toLowerCase() === selectedGenre.toLowerCase());
//     }
    
//     if (selectedYearRange !== "all") {
//         const [start, end] = selectedYearRange.split("-").map(Number);
//         filteredBooks = filteredBooks.filter(book => book.year >= start && book.year <= end);
//     }
    
//     displayBooks(filteredBooks);
// }