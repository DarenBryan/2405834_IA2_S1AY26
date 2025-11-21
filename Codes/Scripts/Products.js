//Saves the product data to local storage when "Add to Cart" button is clicked using an Array.
document.querySelectorAll(".addToCart").forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        try {
            const productCard = event.target.closest(".product-card");
            if (!productCard) {
                alert("Product information not found.");
                return;
            }

            const picture = productCard.querySelector(".product-img").src;
            const name = productCard.querySelector(".product-title").textContent;
            const description = productCard.querySelector(".product-description").textContent;
            const price = productCard.querySelector(".price").textContent;

            if (!picture || !name || !description || !price) {
                alert("Incomplete product information. Cannot add to cart.");
                return;
            }

            const productData = {
                picture: picture,
                name: name,
                description: description,
                price: price,
                id: name,
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existingProduct = cart.find(item => item.name === productData.name);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push(productData);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${productData.name} has been added to your cart.`);
        } catch (error) {
            console.log(error);
            alert("An error occurred while adding the product to the cart. Please try again later.", error);
        }
    });
});

//Navigates to the Cart page when "Cart" button is clicked.
document.getElementById("toCart").addEventListener("click", function() {
    window.open("Cart.html", "_self");
});