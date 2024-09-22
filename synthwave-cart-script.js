// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update cart count
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
        console.log('Cart count updated:', totalItems);
    } else {
        console.error('Cart count element not found');
    }
}

// Function to add item to cart
function addToCart(productId) {
    console.log('Adding product to cart:', productId);
    const productElement = document.querySelector(`.product-item[data-id="${productId}"]`);
    if (!productElement) {
        console.error('Product element not found');
        return;
    }

    const product = {
        id: productId,
        name: productElement.dataset.name,
        price: parseFloat(productElement.dataset.price),
        quantity: 1
    };

    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    console.log('Current cart:', cart);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded. Initial cart:', cart);
    updateCartCount();
});