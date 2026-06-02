<!DOCTYPE html>
<html lang="en">
<head>
    <!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/69a9729982ed261c407919e2/1jiuufav3';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script-->
    <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17663135822"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-17663135822');
</script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BookHaven - Find Your Next Favorite Book</title>
    <meta name="description" content="Discover your next favorite book at BookHaven - a curated collection of fiction, non-fiction, bestsellers, and new releases with personalized recommendations.">
    
    <!-- External Libraries -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Custom Styles -->
    <link rel="stylesheet" href="css/style.css">
    
    <!-- Tailwind Custom Config -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'primary': '#1e3a5f', // Navy
                        'secondary': '#d4af37', // Gold
                        'warm-gray': {
                            50: '#fafaf9',
                            100: '#f5f5f4',
                            200: '#e7e5e4',
                            300: '#d6d3d1',
                            400: '#a8a29e',
                            500: '#78716c',
                            600: '#57534e',
                            700: '#44403c',
                            800: '#292524',
                            900: '#1c1917',
                        }
                    },
                    fontFamily: {
                        'serif': ['Playfair Display', 'serif'],
                        'sans': ['Inter', 'sans-serif'],
                    },
                    animation: {
                        'fade-in': 'fadeIn 0.6s ease-in-out',
                        'slide-up': 'slideUp 0.8s ease-out',
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-warm-gray-50 font-sans text-warm-gray-800">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <div class="flex items-center">
                    <a href="#" class="flex items-center space-x-2">
                        <i class="fas fa-book-open text-2xl text-primary"></i>
                        <span class="font-serif text-2xl font-bold text-primary">BookHaven</span>
                    </a>
                </div>
                
                <!-- Desktop Navigation -->
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-4">
                        <a href="#" class="nav-link px-3 py-2 rounded-md text-sm font-medium text-warm-gray-700 hover:text-primary hover:bg-warm-gray-100 transition-colors">Home</a>
                        <div class="relative group">
                            <button class="nav-link px-3 py-2 rounded-md text-sm font-medium text-warm-gray-700 hover:text-primary hover:bg-warm-gray-100 transition-colors flex items-center">
                                Categories <i class="fas fa-chevron-down ml-1 text-xs"></i>
                            </button>
                            <div class="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div class="py-1">
                                    <a href="categories.html?category=fiction" class="block px-4 py-2 text-sm text-warm-gray-700 hover:bg-warm-gray-100 hover:text-primary">Fiction</a>
                                    <a href="categories.html?category=non-fiction" class="block px-4 py-2 text-sm text-warm-gray-700 hover:bg-warm-gray-100 hover:text-primary">Non-Fiction</a>
                                    <a href="categories.html?category=childrens" class="block px-4 py-2 text-sm text-warm-gray-700 hover:bg-warm-gray-100 hover:text-primary">Children's Books</a>
                                    <a href="categories.html?category=bestsellers" class="block px-4 py-2 text-sm text-warm-gray-700 hover:bg-warm-gray-100 hover:text-primary">Bestsellers</a>
                                    <a href="categories.html?category=new-releases" class="block px-4 py-2 text-sm text-warm-gray-700 hover:bg-warm-gray-100 hover:text-primary">New Releases</a>
                                </div>
                            </div>
                        </div>
                        <a href="offers.html" class="nav-link px-3 py-2 rounded-md text-sm font-medium text-warm-gray-700 hover:text-primary hover:bg-warm-gray-100 transition-colors">Offers</a>
                        <a href="blog.html" class="nav-link px-3 py-2 rounded-md text-sm font-medium text-warm-gray-700 hover:text-primary hover:bg-warm-gray-100 transition-colors">Blog</a>
                        <a href="about.html" class="nav-link px-3 py-2 rounded-md text-sm font-medium text-warm-gray-700 hover:text-primary hover:bg-warm-gray-100 transition-colors">About</a>
                        <a href="contact.html" class="nav-link px-3 py-2 rounded-md text-sm font-medium text-warm-gray-700 hover:text-primary hover:bg-warm-gray-100 transition-colors">Contact</a>
                    </div>
                </div>
                
                <!-- Search and Cart -->
                <div class="flex items-center space-x-4">
                    <!-- Search -->
                    <div class="relative">
                        <button class="search-toggle p-2 text-warm-gray-600 hover:text-primary transition-colors">
                            <i class="fas fa-search"></i>
                        </button>
                        <div class="search-popup absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border p-4 opacity-0 invisible transition-all duration-300 z-50">
                            <div class="flex">
                                <input type="text" id="search-input" placeholder="Search by title, author, or genre..." class="flex-1 px-3 py-2 border border-warm-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                                <button class="search-btn px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary-dark transition-colors">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                            <div id="search-results" class="mt-3 max-h-60 overflow-y-auto"></div>
                        </div>
                    </div>
                    
                    <!-- Cart -->
                    <div class="relative">
                        <button class="cart-toggle p-2 text-warm-gray-600 hover:text-primary transition-colors relative">
                            <i class="fas fa-shopping-cart"></i>
                            <span id="cart-count" class="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center hidden">0</span>
                        </button>
                        <div class="cart-popup absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border opacity-0 invisible transition-all duration-300 z-50">
                            <div class="p-4 border-b">
                                <h3 class="font-semibold text-lg">Shopping Cart</h3>
                            </div>
                            <div id="cart-items" class="p-4 max-h-60 overflow-y-auto">
                                <p class="text-warm-gray-500 text-center py-8">Your cart is empty</p>
                            </div>
                            <div class="p-4 border-t">
                                <div class="flex justify-between items-center mb-3">
                                    <span class="font-semibold">Total: </span>
                                    <span id="cart-total" class="font-bold text-lg">₹0.00</span>
                                </div>
                                <button class="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors disabled:bg-warm-gray-300" disabled>
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Mobile menu button -->
                    <div class="md:hidden">
                        <button class="mobile-menu-toggle p-2 text-warm-gray-600 hover:text-primary">
                            <i class="fas fa-bars"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Mobile Navigation -->
        <div class="mobile-menu hidden md:hidden bg-white border-t">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <a href="#" class="block px-3 py-2 text-warm-gray-700 hover:text-primary hover:bg-warm-gray-100">Home</a>
                <a href="categories.html?category=fiction" class="block px-3 py-2 text-warm-gray-700 hover:text-primary hover:bg-warm-gray-100">Fiction</a>
                <a href="categories.html?category=non-fiction" class="block px-3 py-2 text-warm-gray-700 hover:text-primary hover:bg-warm-gray-100">Non-Fiction</a>
                <a href="categories.html?category=childrens" class="block px-3 py-2 text-warm-gray-700 hover:text-primary hover:bg-warm-gray-100">Children's Books</a>
                <a href="categories.html?category=bestsellers" class="block px-3 py-2 text-warm-gray-700 hover:text-primary hover:bg-warm-gray-100">Bestsellers</a>
                <a href="categories.html?category=new-releases" class="block px-3 py-2 text-warm-gray-700 hover:text-primary hover:bg-warm-gray-100">New Releases</a>
                <a href="offers.html" class="block px-3 py-2 text-warm-gray-700 hover:text-primary hover:bg-warm-gray-100">Offers</a>
                <a href="blog.html" class="block px-3 py-2 text-warm-gray-700 hover:text-primary hover:bg-warm-gray-100">Blog</a>
                <a href="about.html" class="block px-3 py-2 text-warm-gray-700 hover:text-primary hover:bg-warm-gray-100">About</a>
                <a href="contact.html" class="block px-3 py-2 text-warm-gray-700 hover:text-primary hover:bg-warm-gray-100">Contact</a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary via-primary-dark to-warm-gray-800 text-white overflow-hidden">
        <div class="absolute inset-0 bg-black opacity-20"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div class="animate-fade-in">
                    <h1 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        Find Your Next <span class="text-secondary">Favorite Book</span>
                    </h1>
                    <p class="text-lg md:text-xl mb-8 text-warm-gray-200 leading-relaxed">
                        Discover a world of stories, knowledge, and inspiration. From timeless classics to contemporary bestsellers, your perfect book is waiting to be found.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4">
                        <button class="browse-books-btn bg-secondary text-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-500 hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                            <i class="fas fa-book mr-2"></i>Start Browsing
                        </button>
                        <button class="newsletter-signup-btn border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-all duration-200">
                            <i class="fas fa-envelope mr-2"></i>Join Newsletter
                        </button>
                    </div>
                </div>
                <div class="animate-slide-up">
                    <div class="relative">
                        <div class="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
                            <div class="grid grid-cols-2 gap-4">
                                <div class="book-showcase bg-white bg-opacity-20 rounded-lg h-40 flex items-center justify-center">
                                    <i class="fas fa-book text-4xl text-secondary"></i>
                                </div>
                                <div class="book-showcase bg-white bg-opacity-20 rounded-lg h-40 flex items-center justify-center">
                                    <i class="fas fa-bookmark text-4xl text-secondary"></i>
                                </div>
                                <div class="book-showcase bg-white bg-opacity-20 rounded-lg h-40 flex items-center justify-center col-span-2">
                                    <div class="text-center">
                                        <i class="fas fa-star text-3xl text-secondary mb-2"></i>
                                        <p class="font-serif text-lg">Curated Collections</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="absolute -top-4 -right-4 bg-secondary text-primary rounded-full p-3 animate-pulse">
                            <i class="fas fa-heart text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Floating Elements -->
        <div class="absolute top-20 left-10 opacity-30 animate-pulse">
            <i class="fas fa-quote-left text-3xl text-secondary"></i>
        </div>
        <div class="absolute bottom-20 right-10 opacity-30 animate-pulse">
            <i class="fas fa-feather text-2xl text-secondary"></i>
        </div>
    </section>

    <!-- Quick Search Section -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">Browse by Category</h2>
                <p class="text-lg text-warm-gray-600 max-w-2xl mx-auto">Explore our carefully curated collections to find exactly what you're looking for</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <a href="categories.html?category=fiction" class="category-card group bg-warm-gray-50 rounded-xl p-6 text-center hover:bg-primary hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <i class="fas fa-magic text-4xl text-primary group-hover:text-secondary mb-4"></i>
                    <h3 class="font-semibold text-lg mb-2">Fiction</h3>
                    <p class="text-sm text-warm-gray-600 group-hover:text-warm-gray-200">Novels & Stories</p>
                </a>
                <a href="categories.html?category=non-fiction" class="category-card group bg-warm-gray-50 rounded-xl p-6 text-center hover:bg-primary hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <i class="fas fa-lightbulb text-4xl text-primary group-hover:text-secondary mb-4"></i>
                    <h3 class="font-semibold text-lg mb-2">Non-Fiction</h3>
                    <p class="text-sm text-warm-gray-600 group-hover:text-warm-gray-200">Knowledge & Learning</p>
                </a>
                <a href="categories.html?category=childrens" class="category-card group bg-warm-gray-50 rounded-xl p-6 text-center hover:bg-primary hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <i class="fas fa-child text-4xl text-primary group-hover:text-secondary mb-4"></i>
                    <h3 class="font-semibold text-lg mb-2">Children's</h3>
                    <p class="text-sm text-warm-gray-600 group-hover:text-warm-gray-200">Young Readers</p>
                </a>
                <a href="categories.html?category=bestsellers" class="category-card group bg-warm-gray-50 rounded-xl p-6 text-center hover:bg-primary hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <i class="fas fa-trophy text-4xl text-primary group-hover:text-secondary mb-4"></i>
                    <h3 class="font-semibold text-lg mb-2">Bestsellers</h3>
                    <p class="text-sm text-warm-gray-600 group-hover:text-warm-gray-200">Popular Picks</p>
                </a>
                <a href="categories.html?category=new-releases" class="category-card group bg-warm-gray-50 rounded-xl p-6 text-center hover:bg-primary hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <i class="fas fa-star text-4xl text-primary group-hover:text-secondary mb-4"></i>
                    <h3 class="font-semibold text-lg mb-2">New Releases</h3>
                    <p class="text-sm text-warm-gray-600 group-hover:text-warm-gray-200">Latest Arrivals</p>
                </a>
            </div>
        </div>
    </section>

    <!-- Featured Books Section -->
    <section class="py-16 bg-warm-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">Featured Books</h2>
                <p class="text-lg text-warm-gray-600 max-w-2xl mx-auto">Handpicked selections from our expert book curators</p>
            </div>
            <div id="featured-books" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Books will be dynamically loaded here -->
            </div>
            <div class="text-center mt-12">
                <a href="categories.html" class="inline-flex items-center bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transform hover:scale-105 transition-all duration-200">
                    <span>View All Books</span>
                    <i class="fas fa-arrow-right ml-2"></i>
                </a>
            </div>
        </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-16 bg-primary text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <i class="fas fa-envelope text-4xl text-secondary mb-6"></i>
            <h2 class="font-serif text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
            <p class="text-lg text-warm-gray-200 mb-8 max-w-2xl mx-auto">
                Get the latest book recommendations, exclusive offers, and literary news delivered to your inbox.
            </p>
            <div class="max-w-md mx-auto">
                <div class="flex">
                    <input type="email" id="newsletter-email" placeholder="Enter your email address" class="flex-1 px-4 py-3 rounded-l-lg text-warm-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary">
                    <button id="newsletter-submit" class="bg-secondary text-primary px-6 py-3 rounded-r-lg font-semibold hover:bg-yellow-500 transition-colors">
                        Subscribe
                    </button>
                </div>
                <p class="text-sm text-warm-gray-300 mt-2">No spam, unsubscribe anytime</p>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-warm-gray-900 text-warm-gray-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <!-- Company Info -->
                <div class="col-span-1 md:col-span-2">
                    <div class="flex items-center space-x-2 mb-4">
                        <i class="fas fa-book-open text-2xl text-secondary"></i>
                        <span class="font-serif text-2xl font-bold text-white">BookHaven</span>
                    </div>
                    <p class="text-warm-gray-400 mb-4 max-w-md">
                        Your trusted companion for discovering remarkable books. We believe every reader deserves to find their perfect next story.
                    </p>
                    <div class="flex space-x-4">
                        <a href="#" class="text-warm-gray-400 hover:text-secondary transition-colors">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="text-warm-gray-400 hover:text-secondary transition-colors">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="text-warm-gray-400 hover:text-secondary transition-colors">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="text-warm-gray-400 hover:text-secondary transition-colors">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
                
                <!-- Quick Links -->
                <div>
                    <h3 class="text-white font-semibold mb-4">Quick Links</h3>
                    <ul class="space-y-2">
                        <li><a href="about.html" class="hover:text-secondary transition-colors">About Us</a></li>
                        <li><a href="contact.html" class="hover:text-secondary transition-colors">Contact</a></li>
                        <li><a href="offers.html" class="hover:text-secondary transition-colors">Special Offers</a></li>
                        <li><a href="blog.html" class="hover:text-secondary transition-colors">Book Blog</a></li>
                        <li><a href="#" class="hover:text-secondary transition-colors">Book Club</a></li>
                    </ul>
                </div>
                
                <!-- Contact Info -->
                <div>
                    <h3 class="text-white font-semibold mb-4">Contact Info</h3>
                    <div class="space-y-2">
                        <p class="flex items-center">
                            <i class="fas fa-phone mr-2"></i>
                            <span>+91 98765 43210</span>
                        </p>
                        <p class="flex items-center">
                            <i class="fas fa-envelope mr-2"></i>
                            <span>hello@bookhaven.com</span>
                        </p>
                        <p class="flex items-center">
                            <i class="fas fa-map-marker-alt mr-2"></i>
                            <span>123 Book Street, Literary District</span>
                        </p>
                        <p class="text-sm text-warm-gray-400">
                            Mon - Sat: 9:00 AM - 8:00 PM<br>
                            Sun: 10:00 AM - 6:00 PM
                        </p>
                    </div>
                </div>
            </div>
            
            <div class="border-t border-warm-gray-700 mt-8 pt-8 text-center">
                <p class="text-warm-gray-400">
                    © 2024 BookHaven. All rights reserved. Made with <i class="fas fa-heart text-red-500"></i> for book lovers.
                </p>
            </div>
        </div>
    </footer>

    <!-- JavaScript -->
    <script src="js/main.js"></script>
</body>
</html>
