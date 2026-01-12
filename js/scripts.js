
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

    document.querySelectorAll('[data-lang-placeholder-pt]').forEach(element => {
        const placeholderText = element.getAttribute(`data-lang-placeholder-${lang}`);
        if (placeholderText) {
            element.placeholder = placeholderText;
        }
    });

    // Save preference
    localStorage.setItem('language', lang);
}

languageToggle.addEventListener('click', () => toggleLanguageMenu(languageOptions));
languageToggleMobile.addEventListener('click', () => toggleLanguageMenu(languageOptionsMobile));

document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', function () {
        const lang = this.getAttribute('data-lang');
        setLanguage(lang);
        languageOptions.classList.remove('show');
        languageOptionsMobile.classList.remove('show');
    });
});

// Close language menu when clicking outside
document.addEventListener('click', function (event) {
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

window.addEventListener('load', checkVisibility);

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

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, textarea');
    const formStatus = document.getElementById('form-status');
    const submitSpinner = document.getElementById('submit-spinner');

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

const programmingSymbolsContainer = document.querySelector('.programming-symbols-background');

if (programmingSymbolsContainer) {
    console.log("Container de símbolos de programação encontrado!");
} else {
    console.error("ERRO: Container de símbolos de programação NÃO encontrado!");
}

const programmingSymbols = [
    '<i class="fab fa-js"></i>',
    '<i class="fab fa-react"></i>',
    '<i class="fab fa-html5"></i>',
    '<i class="fab fa-css3-alt"></i>',
    '<i class="fab fa-node-js"></i>',
    '<i class="fab fa-git-alt"></i>',
    '<i class="fab fa-npm"></i>',
    '<i class="fab fa-java"></i>',
    '<i class="fab fa-python"></i>',
    '<i class="fab fa-php"></i>',
    '<i class="fab fa-bootstrap"></i>',
    '<i class="fab fa-aws"></i>',
    '<i class="fab fa-docker"></i>',
    '<i class="fab fa-angular"></i>',
    '<i class="fab fa-windows"></i>',
    '<i class="fa-solid fa-database"></i>',
    '<i class="fa-solid fa-code"></i>',
    '<i class="fab fa-github"></i>',
    '<i class="fab fa-node"></i>',
    '<i class="fab fa-figma"></i>'
];

let maxSymbols = 35;
let spawnIntervalId;

function createSymbol() {
    const symbolElement = document.createElement('div');
    symbolElement.classList.add('programming-symbol');
    symbolElement.innerHTML = programmingSymbols[Math.floor(Math.random() * programmingSymbols.length)];

    const containerWidth = programmingSymbolsContainer.offsetWidth;
    const containerHeight = programmingSymbolsContainer.offsetHeight;

    const startEdge = Math.floor(Math.random() * 4);
    let startX, startY, endX, endY;

    switch (startEdge) {
        case 0:
            startX = Math.random() * containerWidth;
            startY = -50;
            endX = Math.random() * containerWidth;
            endY = containerHeight + 50;
            break;
        case 1:
            startX = containerWidth + 50;
            startY = Math.random() * containerHeight;
            endX = -50;
            endY = Math.random() * containerHeight;
            break;
        case 2:
            startX = Math.random() * containerWidth;
            startY = containerHeight + 50;
            endX = Math.random() * containerWidth;
            endY = -50;
            break;
        case 3:
            startX = -50;
            startY = Math.random() * containerHeight;
            endX = containerWidth + 50;
            endY = Math.random() * containerHeight;
            break;
    }

    symbolElement.style.left = `${startX}px`;
    symbolElement.style.top = `${startY}px`;

    let baseFontSize = window.innerWidth < 768 ? 0.8 : 1.5;
    const fontSize = Math.random() * (baseFontSize + 2.5 - baseFontSize) + baseFontSize;
    symbolElement.style.fontSize = `${fontSize}rem`;

    const opacity = Math.random() * (0.15 - 0.05) + 0.05;
    symbolElement.style.opacity = opacity;

    symbolElement.style.setProperty('--dx', `${endX - startX}px`);
    symbolElement.style.setProperty('--dy', `${endY - startY}px`);

    const animationDuration = Math.random() * (30 - 20) + 20;
    symbolElement.style.animation = `moveSymbol ${animationDuration}s linear infinite`;

    programmingSymbolsContainer.appendChild(symbolElement);

    symbolElement.addEventListener('animationend', () => {
        symbolElement.remove();
    });
}

function spawnSymbols() {
    if (programmingSymbolsContainer.children.length < maxSymbols) {
        createSymbol();
    }
    let minSpawnTime = window.innerWidth < 768 ? 2000 : 1000;
    let maxSpawnTime = window.innerWidth < 768 ? 5000 : 3000;

    spawnIntervalId = setTimeout(spawnSymbols, Math.random() * (maxSpawnTime - minSpawnTime) + minSpawnTime);
}

function updateAnimationOnResize() {
    clearTimeout(spawnIntervalId);
    programmingSymbolsContainer.innerHTML = '';

    if (window.innerWidth < 768) {
        maxSymbols = 10;
        for (let i = 0; i < 3; i++) {
            createSymbol();
        }
    } else {
        maxSymbols = 25;
        for (let i = 0; i < 5; i++) {
            createSymbol();
        }
    }
    spawnSymbols();
}

window.addEventListener('load', updateAnimationOnResize);

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateAnimationOnResize, 250);
});
const projectGrid = document.getElementById('projects-grid');
const projectItems = document.querySelectorAll('.project-item');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageIndicator = document.getElementById('page-indicator');

let currentPage = 1;
const itemsPerPage = 3;

function showPage(page) {
    const totalPages = Math.ceil(projectItems.length / itemsPerPage);

    // Validate page bounds
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    currentPage = page;

    // Calculate start and end index
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Show/Hide items
    projectItems.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
            item.classList.remove('hidden');
            // Re-apply fade-in animation if needed, or ensure it's visible
            item.style.display = '';
        } else {
            item.classList.add('hidden');
            item.style.display = 'none';
        }
    });

    // Update UI Controls
    if (pageIndicator) {
        // Find current language to translate "Page X of Y" if needed (simplified for now)
        pageIndicator.textContent = `${currentPage} / ${totalPages}`;
    }

    if (prevPageBtn) prevPageBtn.disabled = currentPage === 1;
    if (nextPageBtn) nextPageBtn.disabled = currentPage === totalPages;
}

if (projectGrid && projectItems.length > 0) {
    // Initial Render
    showPage(1);

    // Event Listeners
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', () => {
            showPage(currentPage - 1);
            projectGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', () => {
            showPage(currentPage + 1);
            projectGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
}

