// Blog functionality for BookHaven
class BlogManager {
    constructor() {
        this.currentCategory = 'all';
        this.currentSort = 'newest';
        this.currentPage = 1;
        this.postsPerPage = 6;
        this.init();
    }

    init() {
        this.loadFeaturedPost();
        this.loadBlogPosts();
        this.setupEventListeners();
        this.setupNewsletterSignup();
    }

    setupEventListeners() {
        // Category filters
        const filterButtons = document.querySelectorAll('.blog-filter');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.setActiveFilter(e.target);
                this.currentCategory = e.target.dataset.category;
                this.currentPage = 1;
                this.loadBlogPosts();
            });
        });

        // Sort dropdown
        const sortSelect = document.getElementById('blog-sort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.currentPage = 1;
                this.loadBlogPosts();
            });
        }

        // Load more button
        const loadMoreBtn = document.getElementById('load-more-posts');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.currentPage++;
                this.loadBlogPosts(true); // append mode
            });
        }
    }

    setupNewsletterSignup() {
        const blogNewsletterForm = document.getElementById('blog-newsletter-submit');
        const emailInput = document.getElementById('blog-newsletter-email');

        if (blogNewsletterForm && emailInput) {
            blogNewsletterForm.addEventListener('click', async (e) => {
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
                    blogNewsletterForm.click();
                }
            });
        }
    }

    setActiveFilter(activeButton) {
        // Remove active class from all buttons
        document.querySelectorAll('.blog-filter').forEach(btn => {
            btn.classList.remove('active', 'bg-primary', 'text-white');
            btn.classList.add('bg-warm-gray-200', 'text-warm-gray-700');
        });

        // Add active class to clicked button
        activeButton.classList.add('active', 'bg-primary', 'text-white');
        activeButton.classList.remove('bg-warm-gray-200', 'text-warm-gray-700');
    }

    async loadFeaturedPost() {
        try {
            const response = await fetch('tables/blog_posts?limit=1&is_featured=true');
            const data = await response.json();
            
            if (data && data.data && data.data.length > 0) {
                this.displayFeaturedPost(data.data[0]);
            }
        } catch (error) {
            console.error('Error loading featured post:', error);
        }
    }

    displayFeaturedPost(post) {
        const container = document.getElementById('featured-post');
        if (!container) return;

        const categoryBadge = this.getCategoryBadge(post.category);

        container.innerHTML = `
            <article class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div class="grid grid-cols-1 lg:grid-cols-2">
                    <div class="relative">
                        <img src="${post.featured_image}" alt="${post.title}" class="w-full h-64 lg:h-full object-cover">
                        <div class="absolute top-4 left-4">
                            ${categoryBadge}
                        </div>
                        <div class="absolute bottom-4 right-4 bg-secondary text-primary px-3 py-1 rounded-full text-sm font-semibold">
                            Featured
                        </div>
                    </div>
                    <div class="p-8 lg:p-12">
                        <div class="flex items-center text-sm text-warm-gray-600 mb-4">
                            <i class="fas fa-user mr-2"></i>
                            <span>${post.author}</span>
                            <span class="mx-2">•</span>
                            <i class="fas fa-clock mr-2"></i>
                            <span>${post.read_time} min read</span>
                            <span class="mx-2">•</span>
                            <i class="fas fa-eye mr-2"></i>
                            <span>${post.views_count} views</span>
                        </div>
                        <h2 class="font-serif text-3xl font-bold text-primary mb-4 leading-tight">${post.title}</h2>
                        <p class="text-warm-gray-700 text-lg mb-6 leading-relaxed">${post.excerpt}</p>
                        <button onclick="this.readFullPost('${post.slug}')" class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transform hover:scale-105 transition-all duration-200">
                            Read Full Article <i class="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    async loadBlogPosts(append = false) {
        try {
            let url = `tables/blog_posts?page=${this.currentPage}&limit=${this.postsPerPage}&sort=${this.currentSort}`;
            
            if (this.currentCategory !== 'all') {
                url += `&category=${this.currentCategory}`;
            }

            const response = await fetch(url);
            const data = await response.json();
            
            if (data && data.data) {
                this.displayBlogPosts(data.data, append);
                this.updateLoadMoreButton(data.total, this.currentPage, this.postsPerPage);
            }
        } catch (error) {
            console.error('Error loading blog posts:', error);
        }
    }

    displayBlogPosts(posts, append = false) {
        const container = document.getElementById('blog-posts');
        if (!container) return;

        if (!append) {
            container.innerHTML = '';
        }

        if (posts.length === 0 && !append) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-search text-4xl text-warm-gray-400 mb-4"></i>
                    <p class="text-xl text-warm-gray-600">No articles found for this category.</p>
                    <p class="text-warm-gray-500 mt-2">Try selecting a different category or check back later for new content.</p>
                </div>
            `;
            return;
        }

        const postsHTML = posts.map(post => this.createBlogPostCard(post)).join('');
        container.insertAdjacentHTML('beforeend', postsHTML);
    }

    createBlogPostCard(post) {
        const categoryBadge = this.getCategoryBadge(post.category);
        const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return `
            <article class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer group" onclick="this.readFullPost('${post.slug}')">
                <div class="relative">
                    <img src="${post.featured_image}" alt="${post.title}" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300">
                    <div class="absolute top-3 left-3">
                        ${categoryBadge}
                    </div>
                </div>
                <div class="p-6">
                    <div class="flex items-center text-sm text-warm-gray-600 mb-3">
                        <i class="fas fa-user mr-2"></i>
                        <span>${post.author}</span>
                        <span class="mx-2">•</span>
                        <span>${formattedDate}</span>
                    </div>
                    <h3 class="font-serif text-xl font-semibold text-primary mb-3 line-clamp-2 group-hover:text-secondary transition-colors">${post.title}</h3>
                    <p class="text-warm-gray-700 mb-4 line-clamp-3">${post.excerpt}</p>
                    <div class="flex justify-between items-center">
                        <div class="flex items-center text-sm text-warm-gray-600">
                            <i class="fas fa-clock mr-1"></i>
                            <span>${post.read_time} min</span>
                            <span class="mx-2">•</span>
                            <i class="fas fa-eye mr-1"></i>
                            <span>${post.views_count}</span>
                        </div>
                        <span class="text-primary font-semibold group-hover:text-secondary transition-colors">
                            Read More <i class="fas fa-arrow-right ml-1"></i>
                        </span>
                    </div>
                </div>
            </article>
        `;
    }

    getCategoryBadge(category) {
        const badges = {
            'book-reviews': '<span class="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Book Reviews</span>',
            'reading-recommendations': '<span class="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Recommendations</span>',
            'author-interviews': '<span class="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Author Interviews</span>',
            'literary-news': '<span class="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Literary News</span>',
            'book-club': '<span class="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Book Club</span>'
        };
        return badges[category] || '<span class="bg-warm-gray-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Article</span>';
    }

    updateLoadMoreButton(total, currentPage, postsPerPage) {
        const loadMoreBtn = document.getElementById('load-more-posts');
        if (!loadMoreBtn) return;

        const hasMorePosts = (currentPage * postsPerPage) < total;
        
        if (hasMorePosts) {
            loadMoreBtn.style.display = 'block';
            loadMoreBtn.textContent = 'Load More Articles';
        } else {
            loadMoreBtn.style.display = 'none';
        }
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
                    preferences: ['blog-updates', 'new-books', 'recommendations'],
                    is_active: true,
                    subscription_date: new Date().toISOString()
                })
            });

            if (response.ok) {
                this.showNotification('Successfully subscribed to our blog newsletter!', 'success');
                document.getElementById('blog-newsletter-email').value = '';
            } else {
                throw new Error('Subscription failed');
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            this.showNotification('Failed to subscribe. Please try again.', 'error');
        }
    }

    readFullPost(slug) {
        // In a real application, this would navigate to a detailed post page
        this.showNotification('Full article view coming soon! For now, enjoy the preview.', 'info');
    }

    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
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
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize blog manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('blog.html')) {
        new BlogManager();
    }
});

// Global function for inline event handlers
window.readFullPost = function(slug) {
    // In a real application, this would navigate to a detailed post page
    alert('Full article view coming soon! For now, enjoy the preview.');
};