document.addEventListener('DOMContentLoaded', function() {
    const cartContents = document.getElementById('cart-contents');
    const cartTotal = document.getElementById('cart-total');
    const saveForLaterButton = document.getElementById('save-for-later');
    const checkoutButton = document.getElementById('checkout-button');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function displayCart() {
        if (cart.length === 0) {
            cartContents.innerHTML = '<tr><td colspan="5">Your cart is empty.</td></tr>';
            cartTotal.innerHTML = '';
        } else {
            let html = '';
            let total = 0;
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                html += `
                    <tr>
                        <td>${item.name}</td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td>
                            <button class="quantity-btn" data-index="${index}" data-action="decrease">-</button>
                            ${item.quantity}
                            <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
                        </td>
                        <td>$${itemTotal.toFixed(2)}</td>
                        <td>
                            <button class="remove-btn" data-index="${index}">Remove</button>
                        </td>
                    </tr>
                `;
                total += itemTotal;
            });
            cartContents.innerHTML = html;
            cartTotal.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
        }
    }

    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    function updateQuantity(index, action) {
        const item = cart[index];
        if (action === 'increase' && item.quantity < item.stock) {
            item.quantity++;
        } else if (action === 'decrease' && item.quantity > 1) {
            item.quantity--;
        }
        updateCart();
    }

    cartContents.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-btn')) {
            const index = e.target.dataset.index;
            removeFromCart(index);
        } else if (e.target.classList.contains('quantity-btn')) {
            const index = e.target.dataset.index;
            const action = e.target.dataset.action;
            updateQuantity(index, action);
        }
    });

    saveForLaterButton.addEventListener('click', function() {
        alert('Cart saved for later!');
        // Implement actual "save for later" functionality here
    });

    checkoutButton.addEventListener('click', function() {
        alert('Proceeding to checkout... (This is a placeholder)');
        // Implement the checkout process here
    });

    displayCart();
});
