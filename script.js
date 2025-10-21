// Marketplace Application JavaScript

// Sample product data
const products = [
    {
        id: 1,
        title: "Wireless Bluetooth Headphones",
        category: "electronics",
        price: 89.99,
        rating: 4.5,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
        inStock: true
    },
    {
        id: 2,
        title: "Premium Cotton T-Shirt",
        category: "clothing",
        price: 24.99,
        rating: 4.2,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
        description: "Soft, comfortable cotton t-shirt perfect for everyday wear.",
        inStock: true
    },
    {
        id: 3,
        title: "Smart Home Security Camera",
        category: "electronics",
        price: 149.99,
        rating: 4.7,
        reviews: 203,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        description: "HD security camera with night vision and mobile app control.",
        inStock: true
    },
    {
        id: 4,
        title: "Organic Gardening Tools Set",
        category: "home",
        price: 45.99,
        rating: 4.4,
        reviews: 67,
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
        description: "Complete set of eco-friendly gardening tools for your garden.",
        inStock: true
    },
    {
        id: 5,
        title: "Running Shoes - Athletic",
        category: "sports",
        price: 129.99,
        rating: 4.6,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
        description: "Comfortable running shoes with advanced cushioning technology.",
        inStock: true
    },
    {
        id: 6,
        title: "JavaScript Programming Book",
        category: "books",
        price: 39.99,
        rating: 4.8,
        reviews: 94,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
        description: "Comprehensive guide to modern JavaScript development.",
        inStock: true
    },
    {
        id: 7,
        title: "Designer Handbag",
        category: "clothing",
        price: 199.99,
        rating: 4.3,
        reviews: 112,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
        description: "Elegant leather handbag perfect for any occasion.",
        inStock: true
    },
    {
        id: 8,
        title: "Smart Fitness Watch",
        category: "electronics",
        price: 299.99,
        rating: 4.9,
        reviews: 267,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        description: "Advanced fitness tracking with heart rate monitor and GPS.",
        inStock: true
    },
    {
        id: 9,
        title: "Indoor Plant Collection",
        category: "home",
        price: 34.99,
        rating: 4.1,
        reviews: 43,
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
        description: "Beautiful collection of air-purifying indoor plants.",
        inStock: true
    },
    {
        id: 10,
        title: "Yoga Mat - Premium",
        category: "sports",
        price: 59.99,
        rating: 4.5,
        reviews: 78,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
        description: "Non-slip yoga mat with excellent cushioning and durability.",
        inStock: true
    },
    {
        id: 11,
        title: "Python Programming Guide",
        category: "books",
        price: 44.99,
        rating: 4.7,
        reviews: 123,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
        description: "Complete guide to Python programming from beginner to advanced.",
        inStock: true
    },
    {
        id: 12,
        title: "Denim Jacket - Classic",
        category: "clothing",
        price: 79.99,
        rating: 4.4,
        reviews: 87,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
        description: "Timeless denim jacket with a comfortable fit and classic style.",
        inStock: true
    }
];

// Application state
let currentProducts = [...products];
let cart = [];
let favorites = [];
let currentCategory = 'all';
let currentSort = 'featured';
let currentPriceFilter = 'all';
let displayedProducts = 8;

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const cartCount = document.getElementById('cartCount');
const favoritesCount = document.getElementById('favoritesCount');
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const productModal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    setupEventListeners();
    loadCartFromStorage();
    loadFavoritesFromStorage();
    updateCartCount();
    updateFavoritesCount();
});

// Event listeners setup
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    
    // Category navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleCategoryChange);
    });
    
    // Filters
    document.getElementById('priceFilter').addEventListener('change', handlePriceFilter);
    document.getElementById('sortFilter').addEventListener('change', handleSort);
    document.getElementById('clearFilters').addEventListener('click', clearFilters);
    
    // Cart functionality
    document.getElementById('cartBtn').addEventListener('click', toggleCart);
    document.getElementById('closeCart').addEventListener('click', closeCart);
    
    // Favorites functionality
    document.getElementById('favoritesBtn').addEventListener('click', toggleFavorites);
    
    // Modal functionality
    document.getElementById('closeModal').addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        if (event.target === productModal) {
            closeModal();
        }
    });
    
    // Load more products
    loadMoreBtn.addEventListener('click', loadMoreProducts);
    
    // CTA button
    document.querySelector('.cta-btn').addEventListener('click', function() {
        document.querySelector('.main').scrollIntoView({ behavior: 'smooth' });
    });
}

// Render products
function renderProducts() {
    productsGrid.innerHTML = '';
    
    if (currentProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    const productsToShow = currentProducts.slice(0, displayedProducts);
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // Show/hide load more button
    loadMoreBtn.style.display = displayedProducts >= currentProducts.length ? 'none' : 'block';
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-category">${product.category}</p>
            <div class="product-rating">
                <div class="stars">
                    ${generateStars(product.rating)}
                </div>
                <span class="rating-text">(${product.reviews})</span>
            </div>
            <div class="product-price">$${product.price}</div>
            <div class="product-actions">
                <button class="btn btn-primary" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="btn btn-secondary" onclick="toggleFavorite(${product.id})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
    `;
    
    card.addEventListener('click', function(e) {
        if (!e.target.closest('.product-actions')) {
            showProductModal(product);
        }
    });
    
    return card;
}

// Generate star rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Search functionality
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    
    currentProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    
    applyFilters();
}

// Category change handler
function handleCategoryChange(e) {
    e.preventDefault();
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    e.target.classList.add('active');
    
    currentCategory = e.target.dataset.category;
    applyFilters();
}

// Price filter handler
function handlePriceFilter(e) {
    currentPriceFilter = e.target.value;
    applyFilters();
}

// Sort handler
function handleSort(e) {
    currentSort = e.target.value;
    applySort();
}

// Apply filters
function applyFilters() {
    let filtered = [...products];
    
    // Apply category filter
    if (currentCategory !== 'all') {
        filtered = filtered.filter(product => product.category === currentCategory);
    }
    
    // Apply search filter
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(product => 
            product.title.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply price filter
    if (currentPriceFilter !== 'all') {
        const [min, max] = currentPriceFilter.split('-').map(price => 
            price.includes('+') ? Infinity : parseFloat(price)
        );
        filtered = filtered.filter(product => {
            if (max === Infinity) {
                return product.price >= min;
            }
            return product.price >= min && product.price <= max;
        });
    }
    
    currentProducts = filtered;
    displayedProducts = 8;
    applySort();
}

// Apply sorting
function applySort() {
    switch (currentSort) {
        case 'price-low':
            currentProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            currentProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            currentProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            currentProducts.sort((a, b) => b.id - a.id);
            break;
        default:
            // Keep original order for 'featured'
            break;
    }
    
    renderProducts();
}

// Clear filters
function clearFilters() {
    currentCategory = 'all';
    currentPriceFilter = 'all';
    currentSort = 'featured';
    searchInput.value = '';
    
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    document.querySelector('[data-category="all"]').classList.add('active');
    
    document.getElementById('priceFilter').value = 'all';
    document.getElementById('sortFilter').value = 'featured';
    
    applyFilters();
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCartToStorage();
    showNotification(`${product.title} added to cart!`);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    saveCartToStorage();
    renderCart();
}

// Update cart quantity
function updateCartQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCartToStorage();
            renderCart();
            updateCartCount();
        }
    }
}

// Toggle favorite
function toggleFavorite(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const index = favorites.indexOf(productId);
    if (index > -1) {
        favorites.splice(index, 1);
        showNotification(`${product.title} removed from favorites`);
    } else {
        favorites.push(productId);
        showNotification(`${product.title} added to favorites`);
    }
    
    updateFavoritesCount();
    saveFavoritesToStorage();
}

// Toggle cart sidebar
function toggleCart() {
    cartSidebar.classList.toggle('open');
    if (cartSidebar.classList.contains('open')) {
        renderCart();
    }
}

// Close cart sidebar
function closeCart() {
    cartSidebar.classList.remove('open');
}

// Toggle favorites (placeholder for future implementation)
function toggleFavorites() {
    showNotification('Favorites feature coming soon!');
}

// Render cart
function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started</p>
            </div>
        `;
        cartTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toFixed(2);
}

// Show product modal
function showProductModal(product) {
    modalBody.innerHTML = `
        <div class="modal-product">
            <img src="${product.image}" alt="${product.title}" class="modal-image">
            <div class="modal-info">
                <h2>${product.title}</h2>
                <div class="product-rating">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
                </div>
                <div class="modal-price">$${product.price}</div>
                <p class="modal-description">${product.description}</p>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id}); closeModal();">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn btn-secondary" onclick="toggleFavorite(${product.id})">
                        <i class="fas fa-heart"></i> Add to Favorites
                    </button>
                </div>
            </div>
        </div>
    `;
    
    productModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close product modal
function closeModal() {
    productModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Load more products
function loadMoreProducts() {
    displayedProducts += 8;
    renderProducts();
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Update favorites count
function updateFavoritesCount() {
    favoritesCount.textContent = favorites.length;
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Local storage functions
function saveCartToStorage() {
    localStorage.setItem('marketplace_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('marketplace_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function saveFavoritesToStorage() {
    localStorage.setItem('marketplace_favorites', JSON.stringify(favorites));
}

function loadFavoritesFromStorage() {
    const savedFavorites = localStorage.getItem('marketplace_favorites');
    if (savedFavorites) {
        favorites = JSON.parse(savedFavorites);
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
