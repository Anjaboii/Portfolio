// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const header = document.getElementById('header');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const moonIcon = themeToggle.querySelector('.fa-moon');
const sunIcon = themeToggle.querySelector('.fa-sun');
const htmlElement = document.documentElement;

// Check for saved user preference or use system preference
const savedTheme = localStorage.getItem('theme') || 
                 (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (savedTheme === 'dark') {
    htmlElement.setAttribute('data-theme', 'dark');
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'inline-block';
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const isDark = htmlElement.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        htmlElement.removeAttribute('data-theme');
        moonIcon.style.display = 'inline-block';
        sunIcon.style.display = 'none';
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'inline-block';
        localStorage.setItem('theme', 'dark');
    }
});

// Initialize all project image sliders
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const slider = card.querySelector('.image-slider');
        const slides = card.querySelectorAll('.slide');
        const prevBtn = card.querySelector('.slider-arrow.prev');
        const nextBtn = card.querySelector('.slider-arrow.next');
        const indicatorsContainer = card.querySelector('.slider-indicators');
        let currentIndex = 0;
        
        // Create indicators
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('slider-indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
        
        const indicators = card.querySelectorAll('.slider-indicator');
        
        // Update slider display
        function updateSlider() {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentIndex);
            });
            
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Navigation functions
        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        }
        
        // Button events
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Touch/swipe events
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
        
        function handleSwipe() {
            const swipeThreshold = 50; // Minimum swipe distance in pixels
            
            if (touchEndX < touchStartX - swipeThreshold) {
                nextSlide(); // Swiped left
            } else if (touchEndX > touchStartX + swipeThreshold) {
                prevSlide(); // Swiped right
            }
        }
        
        // Keyboard navigation for the focused slider
        slider.setAttribute('tabindex', '0');
        slider.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            }
        });
    });
});