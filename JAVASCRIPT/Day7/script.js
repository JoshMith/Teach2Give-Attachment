document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");

    // Fetch products from json-server
    fetch("http://localhost:3000/products")
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                // Create product card
                const productCard = document.createElement("div");
                productCard.classList.add("product");

                // Populate card with data
                productCard.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                    <p><strong>Category:</strong> ${product.category}</p>
                    <p><strong>Stock:</strong> ${product.stock}</p>
                `;

                // Append to the container
                productList.appendChild(productCard);
            });
        })
        .catch(error => console.error("Error fetching products:", error));
});
