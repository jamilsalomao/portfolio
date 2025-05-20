
// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');

// Check for saved theme preference or use system preference
if (localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

// Language Toggle
const languageToggle = document.getElementById('language-toggle');
const languageOptions = document.getElementById('language-options');
const languageToggleMobile = document.getElementById('language-toggle-mobile');
const languageOptionsMobile = document.getElementById('language-options-mobile');
const currentLanguage = document.getElementById('current-language');
const currentLanguageMobile = document.getElementById('current-language-mobile');

// Check for saved language preference or default to Portuguese
const savedLanguage = localStorage.getItem('language') || 'pt';
setLanguage(savedLanguage);

function toggleLanguageMenu(menu) {
    menu.classList.toggle('show');
}

function setLanguage(lang) {
    // Update language display
    currentLanguage.textContent = lang.toUpperCase();
    currentLanguageMobile.textContent = lang.toUpperCase();
    
    // Hide all language elements
    document.querySelectorAll('[class^="lang-"]').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Show selected language elements
    document.querySelectorAll(`.lang-${lang}`).forEach(el => {
        el.classList.remove('hidden');
    });
    
    // Save preference
    localStorage.setItem('language', lang);
}

languageToggle.addEventListener('click', () => toggleLanguageMenu(languageOptions));
languageToggleMobile.addEventListener('click', () => toggleLanguageMenu(languageOptionsMobile));

document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        setLanguage(lang);
        languageOptions.classList.remove('show');
        languageOptionsMobile.classList.remove('show');
    });
});

// Close language menu when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.language-selector')) {
        languageOptions.classList.remove('show');
        languageOptionsMobile.classList.remove('show');
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Header background change on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        header.classList.add('bg-blue-800', 'dark:bg-gray-900', 'shadow-md', 'py-2');
        header.classList.remove('bg-transparent', 'py-4');
    } else {
        header.classList.remove('bg-blue-800', 'dark:bg-gray-900', 'shadow-md', 'py-2');
        header.classList.add('bg-transparent', 'py-4');
    }
});

// Scroll animations
function checkVisibility() {
    const elements = document.querySelectorAll('.hidden-element');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if (position.top < windowHeight * 0.9) {
            element.classList.add('show-element');
        }
    });
}

// Initial check on page load
window.addEventListener('load', checkVisibility);

// Check on scroll
window.addEventListener('scroll', checkVisibility);

// // Project filtering
// const projectFilters = document.querySelectorAll('.project-filter');
// const projectItems = document.querySelectorAll('.project-item');

// projectFilters.forEach(filter => {
//     filter.addEventListener('click', function() {
//         // Remove active class from all filters
//         projectFilters.forEach(f => f.classList.remove('active', 'bg-blue-600', 'text-white'));
        
//         // Add active class to clicked filter
//         this.classList.add('active', 'bg-blue-600', 'text-white');
        
//         const filterValue = this.getAttribute('data-filter');
        
//         projectItems.forEach(item => {
//             if (filterValue === 'all') {
//                 item.style.display = 'block';
//             } else {
//                 const categories = item.getAttribute('data-category').split(',');
//                 if (categories.includes(filterValue)) {
//                     item.style.display = 'block';
//                 } else {
//                     item.style.display = 'none';
//                 }
//             }
//         });
//     });
// });

// Enhanced Form Validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, textarea');
    const formStatus = document.getElementById('form-status');
    const submitSpinner = document.getElementById('submit-spinner');
    
    // Validate individual input
    function validateInput(input) {
        const errorFeedback = input.nextElementSibling;
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous error
        errorFeedback.classList.add('hidden');
        input.classList.remove('border-red-500');
        
        // Check if empty
        if (!input.value.trim()) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório';
        } 
        // Email validation
        else if (input.type === 'email' && !isValidEmail(input.value)) {
            isValid = false;
            errorMessage = 'Por favor, insira um endereço de email válido';
        }
        // Name validation (at least 2 characters)
        else if (input.id === 'name' && input.value.trim().length < 2) {
            isValid = false;
            errorMessage = 'O nome deve ter pelo menos 2 caracteres';
        }
        // Message validation (at least 10 characters)
        else if (input.id === 'message' && input.value.trim().length < 10) {
            isValid = false;
            errorMessage = 'A mensagem deve ter pelo menos 10 caracteres';
        }
        
        // Show error if invalid
        if (!isValid) {
            errorFeedback.textContent = errorMessage;
            errorFeedback.classList.remove('hidden');
            input.classList.add('border-red-500');
        }
        
        return isValid;
    }
    
    // Validate on input
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });
        
        input.addEventListener('input', () => {
            // Remove error styling as user types
            const errorFeedback = input.nextElementSibling;
            errorFeedback.classList.add('hidden');
            input.classList.remove('border-red-500');
        });
    });
    
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isFormValid = true;
    formInputs.forEach(input => {
        if (!validateInput(input)) {
            isFormValid = false;
        }
    });

    if (isFormValid) {
        submitSpinner.classList.remove('hidden');

        const templateParams = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value,
            date: new Date().toLocaleString('pt-BR')
        };

        emailjs.send('service_zv47lwe', 'template_tnofewk', templateParams)
            .then(() => {
                formStatus.textContent = 'Mensagem enviada com sucesso!';
                formStatus.classList.remove('hidden', 'bg-red-500');
                formStatus.classList.add('bg-green-600');

                // ENVIA EMAIL DE CONFIRMAÇÃO PARA O REMETENTE
        emailjs.send('service_zv47lwe', 'template_l04l6fl', templateParams);

                contactForm.reset();
                setTimeout(() => formStatus.classList.add('hidden'), 5000);
            }, (error) => {
                formStatus.textContent = 'Erro ao enviar mensagem. Tente novamente.';
                formStatus.classList.remove('hidden', 'bg-green-600');
                formStatus.classList.add('bg-red-500');
            })
            .finally(() => {
                submitSpinner.classList.add('hidden');
            });
    }
});

}

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^=""]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});