// Use passive listeners for better scroll performance
const passiveSupported = () => {
    let passive = false;
    try {
        const options = Object.defineProperty({}, 'passive', {
            get: function() { passive = true; }
        });
        window.addEventListener('test', null, options);
        window.removeEventListener('test', null, options);
    } catch(err) {}
    return passive;
}

const passiveListener = passiveSupported() ? { passive: true } : false;

// Initialize menu functionality
const initMenu = () => {
    const menuButton = document.getElementById('menuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuButton && mobileMenu) {
        const toggleMenu = (show) => {
            mobileMenu.style.display = show ? 'block' : 'none';
            if (show) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        };

        menuButton.addEventListener('click', () => {
            const isVisible = mobileMenu.style.display === 'block';
            toggleMenu(!isVisible);
        }, passiveListener);
        
        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (event.target !== menuButton && !menuButton.contains(event.target) && 
                event.target !== mobileMenu && !mobileMenu.contains(event.target)) {
                toggleMenu(false);
            }
        }, passiveListener);
    }
};

// Initialize modal functionality
const initModal = () => {
    const contactButton = document.getElementById('contactButton');
    const contactModal = document.getElementById('contactModal');
    const closeModal = document.getElementById('closeModal');
    
    if (contactButton && contactModal && closeModal) {
        const toggleModal = (show) => {
            if (show) {
                contactModal.style.display = 'flex';
                // Use setTimeout to trigger animation after display change
                setTimeout(() => {
                    contactModal.classList.add('visible');
                }, 10);
                document.body.style.overflow = 'hidden';
            } else {
                contactModal.classList.remove('visible');
                // Wait for animation to complete before hiding
                setTimeout(() => {
                    contactModal.style.display = 'none';
                    document.body.style.overflow = '';
                }, 300);
            }
        };

        // Use CSS transitions instead of direct style manipulation
        contactButton.classList.add('hover:scale-110', 'hover:shadow-lg', 'transition-transform', 'duration-200');
        
        // Event listeners with passive option where applicable
        contactButton.addEventListener('click', () => toggleModal(true), passiveListener);
        closeModal.addEventListener('click', () => toggleModal(false), passiveListener);
        
        // Close modal when clicking outside
        contactModal.addEventListener('click', (event) => {
            if (event.target === contactModal) {
                toggleModal(false);
            }
        }, passiveListener);
    }
};

// Initialize scroll animations
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Add staggered animation to cards
    document.querySelectorAll('.feature-card, .testimonial-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
};

// Quote form (get-a-quote.html): enforce "check at least one" checkbox groups.
// HTML5 `required` cannot express "at least one of these checkboxes" across a
// same-name group (it would force every box checked), so this is a manual gate
// that blocks submit + shows a visible message until satisfied.
const initQuoteFormValidation = () => {
    const quoteForm = document.forms['get-a-quote'];
    if (!quoteForm) return;

    const checkboxGroups = [
        { name: 'services[]', groupId: 'servicesGroup', errorId: 'servicesGroupError' },
        { name: 'coverage_needs[]', groupId: 'coverageNeedsGroup', errorId: 'coverageNeedsGroupError' }
    ];

    quoteForm.addEventListener('submit', (event) => {
        let blocked = false;

        checkboxGroups.forEach(({ name, groupId, errorId }) => {
            const group = document.getElementById(groupId);
            const errorEl = document.getElementById(errorId);
            if (!group || !errorEl) return;

            const checked = group.querySelectorAll(`input[name="${name}"]:checked`).length;
            if (checked === 0) {
                errorEl.style.display = 'block';
                errorEl.classList.remove('hidden');
                blocked = true;
            } else {
                errorEl.style.display = 'none';
                errorEl.classList.add('hidden');
            }
        });

        if (blocked) {
            event.preventDefault();
            // Scroll to the first visible error so it isn't missed on long forms.
            const firstError = quoteForm.querySelector('[id$="GroupError"]:not(.hidden)');
            if (firstError && firstError.scrollIntoView) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // Clear an error as soon as the visitor fixes it, without waiting for re-submit.
    checkboxGroups.forEach(({ name, groupId, errorId }) => {
        const group = document.getElementById(groupId);
        const errorEl = document.getElementById(errorId);
        if (!group || !errorEl) return;
        group.addEventListener('change', () => {
            const checked = group.querySelectorAll(`input[name="${name}"]:checked`).length;
            if (checked > 0) {
                errorEl.style.display = 'none';
                errorEl.classList.add('hidden');
            }
        });
    });
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initModal();
    initScrollAnimations();
    initQuoteFormValidation();
});
