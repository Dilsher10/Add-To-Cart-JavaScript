let cart = [];

const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const product = e.target.closest(".product");
        const productId = product.getAttribute("data-id");
        const productName = product.querySelector("h3").textContent;
        const productPrice = parseFloat(product.querySelector("p").textContent.replace("$", ""));

        const existingItem = cart.find((item) => item.id === productId);
        if (existingItem) {
            alert('Item exist in cart');
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        updateCart();
    })
})




function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('total-price');

    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement("div");
        cartItemDiv.textContent = `${item.name} - $${(item.price * item.quantity).toFixed(2)} x `;

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity;
        quantityInput.min = 1;


        quantityInput.addEventListener('change', () => {
            const newQuantity = quantityInput.value;
            item.quantity = newQuantity;
            updateCart();
        })

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            cart.splice(index, 1);
            updateCart()
        });


        cartItemDiv.appendChild(quantityInput);
        cartItemDiv.appendChild(deleteButton);
        cartItemsContainer.appendChild(cartItemDiv);
        totalPrice += item.price * item.quantity;
    });
    cartTotalPrice.textContent = totalPrice.toFixed(2);
}





function clearCart() {
    cart = [];
    updateCart();
}

const clearCartButton = document.getElementById('clear-cart');
clearCartButton.addEventListener("click", clearCart);