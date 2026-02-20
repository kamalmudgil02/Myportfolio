// ===================================
// Theme Toggle Functionality
// ===================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ===================================
// Mobile Menu Toggle
// ===================================
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Navbar Background on Scroll
// ===================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'var(--bg-primary)';
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.background = 'var(--glass-bg)';
        navbar.style.boxShadow = 'none';
    }
});

// ===================================
// Advanced Intersection Observer for Scroll Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

// Main scroll animation observer
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.classList.add('fade-in');
    scrollObserver.observe(section);
});

// ===================================
// About Section Animations
// ===================================
const aboutText = document.querySelector('.about-text');
const aboutVisual = document.querySelector('.about-visual');

if (aboutText && aboutVisual) {
    aboutText.classList.add('fade-in-left');
    aboutVisual.classList.add('fade-in-right');
    scrollObserver.observe(aboutText);
    scrollObserver.observe(aboutVisual);

    // Stagger about highlights
    const highlights = document.querySelectorAll('.highlight-item');
    highlights.forEach((item, index) => {
        item.classList.add('fade-in-up', `stagger-${index + 1}`);
        scrollObserver.observe(item);
    });
}

// ===================================
// Skills Section Animations
// ===================================
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach((category, index) => {
    category.classList.add('scale-in', `stagger-${(index % 3) + 1}`);
    scrollObserver.observe(category);
});

// Enhanced Skill Bar Animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.setProperty('--progress-width', `${progress}%`);
                    bar.classList.add('animate');
                }, index * 100); // Stagger each bar by 100ms
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// ===================================
// Projects Section Animations
// ===================================
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            projectObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

projectCards.forEach(card => {
    projectObserver.observe(card);
});

// ===================================
// Experience Section Timeline Animation
// ===================================
const experienceCards = document.querySelectorAll('.experience-card');
const experienceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            experienceObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

experienceCards.forEach(card => {
    experienceObserver.observe(card);
});

// ===================================
// Certifications Animation
// ===================================
const certItems = document.querySelectorAll('.cert-item');
certItems.forEach((item, index) => {
    item.classList.add('fade-in-up', `stagger-${index + 1}`);
    scrollObserver.observe(item);
});

// ===================================
// Roadmap Cards Staggered Animation
// ===================================
const roadmapCards = document.querySelectorAll('.roadmap-card');
const roadmapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(roadmapCards).indexOf(entry.target);
            setTimeout(() => {
                entry.target.classList.add('reveal');
            }, index * 100); // Stagger by 100ms
            roadmapObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

roadmapCards.forEach(card => {
    roadmapObserver.observe(card);
});

// ===================================
// Contact Cards Animation
// ===================================
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach((card, index) => {
    card.classList.add('scale-in', `stagger-${(index % 4) + 1}`);
    scrollObserver.observe(card);
});

// ===================================
// Hero Stats Counter Animation
// ===================================
const heroStats = document.querySelectorAll('.stat-item');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');

            // Animate the number counting up
            const numberElement = entry.target.querySelector('h3');
            const finalNumber = parseInt(numberElement.textContent);
            let currentNumber = 0;
            const increment = finalNumber / 30; // 30 frames

            const counter = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    numberElement.textContent = finalNumber + '+';
                    clearInterval(counter);
                } else {
                    numberElement.textContent = Math.floor(currentNumber) + '+';
                }
            }, 50);

            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

heroStats.forEach(stat => {
    statsObserver.observe(stat);
});

// ===================================
// Active Navigation Link Highlighting
// ===================================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Typing Effect for Hero Title (Optional Enhancement)
// ===================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ===================================
// Initialize Animations on Page Load
// ===================================
window.addEventListener('load', () => {
    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');

    // Trigger initial animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';

        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ===================================
// Scroll to Top Button (Optional)
// ===================================
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-blue);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-lg);
    transition: all var(--transition-normal);
    z-index: 999;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'translateY(-5px)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'translateY(0)';
});

// ===================================
// Projects Carousel Functionality
// ===================================
const carousel = document.querySelector('.projects-carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');

if (carousel && prevBtn && nextBtn && dots.length > 0) {
    let currentIndex = 0;
    const totalCards = document.querySelectorAll('.project-card').length;

    // Touch/Mouse swipe variables
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let startTransform = 0;

    // Update carousel position
    function updateCarousel(animate = true) {
        if (!animate) {
            carousel.style.transition = 'none';
        } else {
            carousel.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }

        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(calc(${offset}% - ${currentIndex * 24}px))`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        // Reset transition after animation
        if (!animate) {
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            }, 50);
        }
    }

    // Navigate to specific slide
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, totalCards - 1));
        updateCarousel();
    }

    // Previous slide
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    // Next slide
    function nextSlide() {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            updateCarousel();
        }
    }

    // Button event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Touch/Mouse events for swipe
    function getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }

    function dragStart(e) {
        isDragging = true;
        startX = getPositionX(e);

        // Get current transform value
        const transform = window.getComputedStyle(carousel).transform;
        if (transform !== 'none') {
            const matrix = new DOMMatrix(transform);
            startTransform = matrix.m41;
        } else {
            startTransform = 0;
        }

        carousel.style.cursor = 'grabbing';
        carousel.style.transition = 'none';
    }

    function drag(e) {
        if (!isDragging) return;

        e.preventDefault();
        currentX = getPositionX(e);
        const diff = currentX - startX;

        // Apply drag with resistance at edges
        let newTransform = startTransform + diff;
        const maxTransform = 0;
        const minTransform = -(totalCards - 1) * carousel.offsetWidth - (totalCards - 1) * 24;

        // Add resistance at edges
        if (newTransform > maxTransform) {
            newTransform = maxTransform + (newTransform - maxTransform) * 0.3;
        } else if (newTransform < minTransform) {
            newTransform = minTransform + (newTransform - minTransform) * 0.3;
        }

        carousel.style.transform = `translateX(${newTransform}px)`;
    }

    function dragEnd(e) {
        if (!isDragging) return;

        isDragging = false;
        carousel.style.cursor = 'grab';

        const diff = currentX - startX;
        const threshold = carousel.offsetWidth * 0.2; // 20% of card width

        if (Math.abs(diff) > threshold) {
            if (diff > 0 && currentIndex > 0) {
                prevSlide();
            } else if (diff < 0 && currentIndex < totalCards - 1) {
                nextSlide();
            } else {
                updateCarousel();
            }
        } else {
            updateCarousel();
        }
    }

    // Mouse events
    carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('mousemove', drag);
    carousel.addEventListener('mouseup', dragEnd);
    carousel.addEventListener('mouseleave', dragEnd);

    // Touch events
    carousel.addEventListener('touchstart', dragStart, { passive: true });
    carousel.addEventListener('touchmove', drag, { passive: false });
    carousel.addEventListener('touchend', dragEnd);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Prevent text selection while dragging
    carousel.addEventListener('dragstart', (e) => e.preventDefault());

    // Set initial cursor
    carousel.style.cursor = 'grab';

    // Initialize
    updateCarousel(false);
}

// ===================================
// Certifications Carousel
// ===================================
(function initCertCarousel() {
    const carousel = document.getElementById('certCarousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.cert-slide');
    const totalEl = document.getElementById('certTotal');
    const currentEl = document.getElementById('certCurrent');
    const dotsContainer = document.getElementById('certDots');
    const prevBtn = document.getElementById('certPrev');
    const nextBtn = document.getElementById('certNext');

    const total = slides.length;
    let current = 0;
    let startX = 0;
    let isDragging = false;
    let dragOffset = 0;

    if (totalEl) totalEl.textContent = total;

    // Build dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'cert-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Certificate ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    });

    function updateUI() {
        carousel.style.transform = `translateX(-${current * 100}%)`;
        if (currentEl) currentEl.textContent = current + 1;
        dotsContainer.querySelectorAll('.cert-dot').forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });
        if (prevBtn) prevBtn.disabled = false;
        if (nextBtn) nextBtn.disabled = false;
    }

    function goTo(index) {
        current = (index + total) % total;
        updateUI();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    // Touch drag
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    }, { passive: true });

    // Mouse drag
    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        carousel.style.transition = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        dragOffset = e.clientX - startX;
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        carousel.style.transition = '';
        if (Math.abs(dragOffset) > 50) goTo(dragOffset < 0 ? current + 1 : current - 1);
        else updateUI();
        dragOffset = 0;
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        const section = document.getElementById('experience');
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            if (e.key === 'ArrowRight') goTo(current + 1);
            if (e.key === 'ArrowLeft') goTo(current - 1);
        }
    });

    updateUI();
})();

// ===================================
// Console Message (Optional Easter Egg)
// ===================================
console.log('%c👋 Hello! Welcome to my portfolio', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out my GitHub!', 'color: #64748b; font-size: 14px;');
