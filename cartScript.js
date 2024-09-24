// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update cart count
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

// Function to update product display
function updateProductDisplay() {
    document.querySelectorAll('.product-item').forEach(item => {
        const productId = item.dataset.id;
        const stockCount = parseInt(item.dataset.stock);
        const cartItem = cart.find(i => i.id === productId);
        const inCartCount = cartItem ? cartItem.quantity : 0;
        
        item.querySelector('.stock-count').textContent = stockCount - inCartCount;
        
        const addToCartButton = item.querySelector('.add-to-cart');
        addToCartButton.disabled = inCartCount >= stockCount;
    });
}

// Function to add item to cart
function addToCart(productId) {
    const productElement = document.querySelector(`.product-item[data-id="${productId}"]`);
    if (!productElement) {
        console.error('Product element not found');
        return;
    }

    const stockCount = parseInt(productElement.dataset.stock);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity < stockCount) {
            existingItem.quantity += 1;
        } else {
            console.log('Cannot add more of this item. Stock limit reached.');
            return;
        }
    } else {
        const product = {
            id: productId,
            name: productElement.dataset.name,
            price: parseFloat(productElement.dataset.price),
            quantity: 1,
            stock: stockCount
        };
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateProductDisplay();
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    updateProductDisplay();

    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.closest('.product-item').dataset.id;
            addToCart(productId);
        });
    });
});
