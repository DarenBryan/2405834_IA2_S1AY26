//loads the data in the cart from local storage and displays it on the Cart & product Pages
function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-container");

    cartContainer.innerHTML = "";
    let subtotal = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<h2>Your cart is empty.</h2>";
        return subtotal;
    } else {
        cart.forEach(item => {
            let itemDiv = document.createElement("div");
            itemDiv.className = "product-card";
            itemDiv.innerHTML = `
            <img src="${item.picture}" alt="${item.name}" class="product-img">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: ${item.quantity}</p> 
        `;
            cartContainer.appendChild(itemDiv);
            subtotal += item.quantity * parseFloat(item.price.replace('$', ''));
        });
    }
    return subtotal;
}

//Calculates and Displays the Subtotal, Tax, Discount, and Total amounts on the Cart & Checkout Pages
function display(subtotal) {
    const taxRate = 0.15;
    const discountRate = 0.10;

    let Tax = subtotal * taxRate;
    let discount = subtotal * discountRate;
    let Total = subtotal + Tax - discount;

    document.getElementById("Subtotal").textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    document.getElementById("TotalTax").textContent = `Tax: $${Tax.toFixed(2)}`;
    document.getElementById("TotalDiscount").textContent = `Discount: $${discount.toFixed(2)}`;
    document.getElementById("Total").textContent = `Total: $${Total.toFixed(2)}`;
}

//Ensures the DOM is fully loaded before executing scripts
document.addEventListener("DOMContentLoaded", function () {
    let subtotal = loadCartItems();
    display(subtotal);

    const clearCartBtn = document.getElementById("clear-cart-button");
    if (clearCartBtn) {
        clearCartBtn.addEventListener("click", function () {
            localStorage.removeItem("cart");

            let subtotal = loadCartItems();
            display(subtotal);
        });
    }

    const backToShopBtn = document.getElementById("back-to-shop-button");
    if (backToShopBtn) {
        backToShopBtn.addEventListener("click", function () {
            window.open("Products.html", "_self");
        });
    }

    const toCheckoutBtn = document.getElementById("to-checkout");
    if (toCheckoutBtn) {
        toCheckoutBtn.addEventListener("click", function () {
            window.open("Checkout.html", "_self");
        });
    }
});

//Opens the Cart from the checkout page when 'Back to Cart' button is clicked
const backToCartBtn = document.getElementById("back-to-Cart");
if (backToCartBtn) {
    backToCartBtn.addEventListener("click", function (e) {
        e.preventDefault();
        window.open("Cart.html", "_self");
    });
}

//Clears the checkout form when 'Clear' button is clicked
const clearFormBtn = document.getElementById("Clear");
if (clearFormBtn) {
    clearFormBtn.addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("checkout-form").reset();
    });
}

//Handles the submission of the checkout form: validating inputs, removing cart data, and redirecting to Products page
const checkoutForm = document.getElementById("checkout-form");
const submitBtn = document.getElementById("submit");
const cart = localStorage.getItem("cart");
if (submitBtn && checkoutForm) {
    submitBtn.addEventListener("click", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;
        const city = document.getElementById("city").value;
        const state = document.getElementById("state").value;
        const zip = document.getElementById("zip").value;

        if (!name || !address || !city || !state || !zip) {
            alert("Please fill in all required fields.");
            return;
        }

        if (!cart || JSON.parse(cart).length === 0) {
            alert("Your cart is empty. Please add items to your cart before checking out.");
            return;
        } else {
            alert("Order submitted successfully!");
            localStorage.removeItem("cart");

            checkoutForm.reset();
            window.open("Products.html", "_self");
            let subtotal = loadCartItems();
            display(subtotal);
        }
    });
}
