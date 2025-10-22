// BookHaven - Main JavaScript File
class BookStore {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('bookstore_cart')) || [];
        this.searchResults = [];
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadFeaturedBooks();
        this.updateCartUI();
        this.setupMobileMenu();
        this.setupSearchFunctionality();
        this.setupCartFunctionality();
        this.setupNewsletterSignup();
    }

    setupEventListeners() {
        // Navigation
        const browseButton = document.querySelector('.browse-books-btn');
        if (browseButton) {
            browseButton.addEventListener('click', () => {
                window.location.href = 'categories.html';
            });
        }

        const newsletterButton = document.querySelector('.newsletter-signup-btn');
        if (newsletterButton) {
            newsletterButton.addEventListener('click', () => {
                document.getElementById('newsletter-email')?.focus();
            });
        }

        // Mobile menu
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
        }
    }

    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (mobileToggle && mobileMenu) {
            mobileToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                }
            });
        }
    }

    setupSearchFunctionality() {
        const searchToggle = document.querySelector('.search-toggle');
        const searchPopup = document.querySelector('.search-popup');
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.querySelector('.search-btn');

        if (searchToggle && searchPopup) {
            searchToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                searchPopup.classList.toggle('active');
                if (searchPopup.classList.contains('active')) {
                    searchInput?.focus();
                }
            });

            // Close search popup when clicking outside
            document.addEventListener('click', (e) => {
                if (!searchPopup.contains(e.target) && !searchToggle.contains(e.target)) {
                    searchPopup.classList.remove('active');
                }
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(e.target.value);
                }
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const query = searchInput?.value || '';
                this.performSearch(query);
            });
        }
    }

    setupCartFunctionality() {
        const cartToggle = document.querySelector('.cart-toggle');
        const cartPopup = document.querySelector('.cart-popup');

        if (cartToggle && cartPopup) {
            cartToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                cartPopup.classList.toggle('active');
            });

            // Close cart popup when clicking outside
            document.addEventListener('click', (e) => {
                if (!cartPopup.contains(e.target) && !cartToggle.contains(e.target)) {
                    cartPopup.classList.remove('active');
                }
            });
        }
    }

    setupNewsletterSignup() {
        const newsletterForm = document.getElementById('newsletter-submit');
        const emailInput = document.getElementById('newsletter-email');

        if (newsletterForm && emailInput) {
            newsletterForm.addEventListener('click', async (e) => {
                e.preventDefault();
                const email = emailInput.value.trim();
                
                if (this.validateEmail(email)) {
                    await this.subscribeToNewsletter(email);
                } else {
                    this.showNotification('Please enter a valid email address', 'error');
                }
            });

            emailInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    newsletterForm.click();
                }
            });
        }
    }

    async loadFeaturedBooks() {
        try {
            const response = await fetch('tables/books?limit=4');
            const data = await response.json();
            
            if (data && data.data) {
                this.displayFeaturedBooks(data.data.filter(book => book.is_featured));
            }
        } catch (error) {
            console.error('Error loading featured books:', error);
            this.showNotification('Unable to load featured books', 'error');
        }
    }

    displayFeaturedBooks(books) {
        const container = document.getElementById('featured-books');
        if (!container || !books.length) return;

        container.innerHTML = books.map(book => this.createBookCard(book)).join('');
        
        // Setup add to cart buttons
        container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookId = e.target.dataset.bookId;
                this.addToCart(bookId);
            });
        });
    }

    createBookCard(book) {
        const discountPercent = book.original_price > book.price ? 
            Math.round(((book.original_price - book.price) / book.original_price) * 100) : 0;

        return `
            <div class="book-card animate-fade-in">
                <div class="relative">
                    <img src="${book.cover_image}" alt="${book.title}" class="book-cover">
                    ${book.is_bestseller ? '<div class="badge badge-bestseller absolute top-2 left-2">Bestseller</div>' : ''}
                    ${book.is_new_release ? '<div class="badge badge-new absolute top-2 right-2">New</div>' : ''}
                    ${discountPercent > 0 ? `<div class="badge badge-sale absolute top-8 right-2">${discountPercent}% OFF</div>` : ''}
                </div>
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">by ${book.author}</p>
                    <p class="book-description">${this.truncateText(book.description, 100)}</p>
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-2">
                            <span class="book-price">₹${book.price}</span>
                            ${book.original_price > book.price ? 
                                `<span class="text-sm text-warm-gray-500 line-through">₹${book.original_price}</span>` : ''}
                        </div>
                        <div class="flex items-center space-x-1">
                            <div class="flex text-yellow-400">
                                ${this.renderStars(book.rating)}
                            </div>
                            <span class="text-sm text-warm-gray-600">(${book.reviews_count})</span>
                        </div>
                    </div>
                    <button class="add-to-cart-btn" data-book-id="${book.id}">
                        <i class="fas fa-cart-plus mr-2"></i>Add to Cart
                    </button>
                </div>
            </div>
        `;
    }

    async handleSearch(query) {
        if (query.length < 2) {
            this.clearSearchResults();
            return;
        }

        try {
            const response = await fetch(`tables/books?search=${encodeURIComponent(query)}&limit=5`);
            const data = await response.json();
            
            if (data && data.data) {
                this.displaySearchResults(data.data);
            }
        } catch (error) {
            console.error('Error searching books:', error);
        }
    }

    displaySearchResults(books) {
        const container = document.getElementById('search-results');
        if (!container) return;

        if (books.length === 0) {
            container.innerHTML = '<p class="text-warm-gray-500 text-center py-4">No books found</p>';
            return;
        }

        container.innerHTML = books.map(book => `
            <div class="search-result-item" onclick="window.location.href='book-details.html?id=${book.id}'">
                <img src="${book.cover_image}" alt="${book.title}" class="search-result-image">
                <div class="search-result-info">
                    <p class="search-result-title">${book.title}</p>
                    <p class="search-result-author">by ${book.author}</p>
                </div>
                <span class="font-bold text-primary">₹${book.price}</span>
            </div>
        `).join('');
    }

    clearSearchResults() {
        const container = document.getElementById('search-results');
        if (container) {
            container.innerHTML = '';
        }
    }

    performSearch(query) {
        if (query.trim()) {
            window.location.href = `categories.html?search=${encodeURIComponent(query)}`;
        }
    }

    addToCart(bookId) {
        // Find book from featured books or fetch from API
        this.fetchBookById(bookId).then(book => {
            if (book) {
                const existingItem = this.cart.find(item => item.id === bookId);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    this.cart.push({
                        id: book.id,
                        title: book.title,
                        author: book.author,
                        price: book.price,
                        cover_image: book.cover_image,
                        quantity: 1
                    });
                }
                
                this.saveCart();
                this.updateCartUI();
                this.showNotification(`"${book.title}" added to cart!`, 'success');
            }
        });
    }

    async fetchBookById(bookId) {
        try {
            const response = await fetch(`tables/books/${bookId}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching book:', error);
            return null;
        }
    }

    removeFromCart(bookId) {
        this.cart = this.cart.filter(item => item.id !== bookId);
        this.saveCart();
        this.updateCartUI();
        this.showNotification('Item removed from cart', 'info');
    }

    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        if (cartCount) {
            if (totalItems > 0) {
                cartCount.textContent = totalItems;
                cartCount.classList.remove('hidden');
            } else {
                cartCount.classList.add('hidden');
            }
        }

        if (cartItems) {
            if (this.cart.length === 0) {
                cartItems.innerHTML = '<p class="text-warm-gray-500 text-center py-8">Your cart is empty</p>';
            } else {
                cartItems.innerHTML = this.cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.cover_image}" alt="${item.title}" class="cart-item-image">
                        <div class="cart-item-info">
                            <p class="cart-item-title">${item.title}</p>
                            <p class="cart-item-author">by ${item.author}</p>
                        </div>
                        <div class="text-right">
                            <p class="cart-item-price">₹${item.price}</p>
                            <p class="text-xs text-warm-gray-600">Qty: ${item.quantity}</p>
                        </div>
                        <button class="cart-item-remove" onclick="bookStore.removeFromCart('${item.id}')">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `).join('');
            }
        }

        if (cartTotal) {
            cartTotal.textContent = `₹${totalPrice.toFixed(2)}`;
        }

        // Update checkout button
        const checkoutBtn = document.querySelector('.cart-popup button');
        if (checkoutBtn) {
            checkoutBtn.disabled = this.cart.length === 0;
            checkoutBtn.classList.toggle('disabled:bg-warm-gray-300', this.cart.length === 0);
        }
    }

    saveCart() {
        localStorage.setItem('bookstore_cart', JSON.stringify(this.cart));
    }

    async subscribeToNewsletter(email) {
        try {
            const response = await fetch('tables/newsletters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    preferences: ['new-books', 'offers', 'recommendations'],
                    is_active: true,
                    subscription_date: new Date().toISOString()
                })
            });

            if (response.ok) {
                this.showNotification('Successfully subscribed to newsletter!', 'success');
                document.getElementById('newsletter-email').value = '';
            } else {
                throw new Error('Subscription failed');
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            this.showNotification('Failed to subscribe. Please try again.', 'error');
        }
    }

    // Utility Functions
    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    truncateText(text, length) {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }

        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }

        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white transform translate-x-full transition-transform duration-300 ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 
            type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
        }`;
        
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    toggleMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const icon = document.querySelector('.mobile-menu-toggle i');
        
        if (mobileMenu) {
            mobileMenu.classList.toggle('active');
        }
        
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    }
}

// Page-specific functionality
class CategoryPage {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.currentFilters = {};
        this.sortBy = 'title';
        this.init();
    }

    init() {
        this.loadBooks();
        this.setupFilters();
        this.setupSorting();
        this.setupPagination();
    }

    async loadBooks() {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        const search = urlParams.get('search');
        
        let url = `tables/books?page=${this.currentPage}&limit=${this.itemsPerPage}&sort=${this.sortBy}`;
        
        if (category) {
            url += `&category=${category}`;
        }
        
        if (search) {
            url += `&search=${encodeURIComponent(search)}`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data && data.data) {
                this.displayBooks(data.data);
                this.updatePagination(data.total, data.page, data.limit);
            }
        } catch (error) {
            console.error('Error loading books:', error);
        }
    }

    displayBooks(books) {
        const container = document.getElementById('books-grid');
        if (!container) return;

        if (books.length === 0) {
            container.innerHTML = '<div class="col-span-full text-center py-12"><p class="text-xl text-warm-gray-600">No books found matching your criteria.</p></div>';
            return;
        }

        container.innerHTML = books.map(book => bookStore.createBookCard(book)).join('');
        
        // Setup add to cart buttons
        container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookId = e.target.dataset.bookId;
                bookStore.addToCart(bookId);
            });
        });
    }
}

// Initialize the application
let bookStore;
let categoryPage;

document.addEventListener('DOMContentLoaded', () => {
    bookStore = new BookStore();
    
    // Initialize page-specific functionality
    const path = window.location.pathname;
    if (path.includes('categories.html')) {
        categoryPage = new CategoryPage();
    }
});

// Global functions for inline event handlers
window.bookStore = bookStore;