document.addEventListener("DOMContentLoaded", function () {
    console.log("Invoice script loaded");

    const cart = JSON.parse(localStorage.getItem("purchases")) || [];
    console.log("Cart contents:", cart);

    const invoiceItems = document.getElementById("invoice-items");
    const invoiceTotal = document.getElementById("invoice-total");
    const invoiceDate = document.getElementById("invoice-date");

    if (!invoiceItems || !invoiceTotal || !invoiceDate) {
        console.error("Missing HTML elements");
        return;
    }

    const today = new Date();
    invoiceDate.textContent = today.toLocaleDateString();

    let total = 0;

    cart.forEach(item => {
        console.log("Processing item:", item);

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;

        const qty = parseInt(item.quantity);
        const price = parseFloat(item.price.replace("$", ""));
        const subtotal = qty * price;

        const qtyCell = document.createElement("td");
        qtyCell.textContent = qty;

        const priceCell = document.createElement("td");
        priceCell.textContent = `$${price.toFixed(2)}`;

        const subtotalCell = document.createElement("td");
        subtotalCell.textContent = `$${subtotal.toFixed(2)}`;

        total += subtotal;

        row.appendChild(nameCell);
        row.appendChild(qtyCell);
        row.appendChild(priceCell);
        row.appendChild(subtotalCell);

        invoiceItems.appendChild(row);
    });

    invoiceTotal.textContent = total.toFixed(2);
});