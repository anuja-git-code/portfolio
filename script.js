// Typing Effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    element.style.borderRight = '2px solid #fff';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.style.borderRight = 'none';
        }
    }
    type();
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.getElementById('typing');
    const text = "Hi, I'm Anuja";
    typeWriter(typingElement, text);
});

// Dark Mode Toggle
const modeToggle = document.getElementById('mode-toggle');
modeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    modeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDark);
});

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    modeToggle.textContent = '☀️';
}

// Smooth Scrolling with Offset
function smoothScrollToElement(elementId) {
    const element = document.getElementById(elementId);
    const navbar = document.getElementById('navbar');
    const offset = navbar ? navbar.offsetHeight + 20 : 0;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

document.querySelectorAll('#navbar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        smoothScrollToElement(targetId);
        history.replaceState(null, '', `#${targetId}`);
    });
});

// Handle initial hash on page load
if (window.location.hash) {
    setTimeout(() => {
        const targetId = window.location.hash.substring(1);
        smoothScrollToElement(targetId);
    }, 100);
}

// Expandable Table Rows
document.querySelectorAll('.expandable-row').forEach(row => {
    row.addEventListener('click', function() {
        const nextRow = this.nextElementSibling;
        if (nextRow && nextRow.classList.contains('details-row')) {
            nextRow.style.display = nextRow.style.display === 'table-row' ? 'none' : 'table-row';
        }
    });
});

// Project Details Toggle
function toggleProjectDetails(projectId) {
    const details = document.getElementById(`project-details-${projectId}`);
    const button = details.previousElementSibling.querySelector('.project-btn');

    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
        button.textContent = 'Hide Details';
    } else {
        details.style.display = 'none';
        button.textContent = 'View Details';
    }
}

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Certificate Modal
const modal = document.getElementById('image-modal');
const modalImg = document.querySelector('.image-modal-img');
const modalClose = document.querySelector('.image-modal-close');
const backdrop = document.querySelector('.image-modal-backdrop');

function openModal(src, alt) {
    modalImg.src = src;
    modalImg.alt = alt;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
        modalImg.src = '';
        modalImg.alt = '';
    }, 300);
}

modalClose.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
    }
});

// Certificate Expand/Collapse Functionality
document.querySelectorAll('.certificate-img').forEach(img => {
    img.addEventListener('click', function() {
        // Remove expanded class from all other certificates
        document.querySelectorAll('.certificate-item.expanded').forEach(item => {
            if (item !== this.parentElement) {
                item.classList.remove('expanded');
            }
        });

        // Toggle expanded class on clicked certificate
        this.parentElement.classList.toggle('expanded');
    });
});

// Close expanded certificate when clicking outside or on close button
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('certificate-item') && e.target.classList.contains('expanded')) {
        e.target.classList.remove('expanded');
    } else if (e.target.textContent === '×') {
        e.target.parentElement.classList.remove('expanded');
    }
});

// Close expanded certificate on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.certificate-item.expanded').forEach(item => {
            item.classList.remove('expanded');
        });
    }
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-fill');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.style.width || '0%';
        }
    });
}, observerOptions);

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .certificate-item, .contact-card, .skill-category');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

animateOnScroll();

// Form submission (if needed in future)
function handleFormSubmission(event) {
    event.preventDefault();
    // Add form handling logic here
    alert('Thank you for your message! I\'ll get back to you soon.');
}

// Add any additional interactive features here