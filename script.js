// Espera o documento HTML ser completamente carregado antes de rodar o script
document.addEventListener('DOMContentLoaded', function() {

    const mainHeader = document.getElementById('main-header');
    const brandLogo = document.querySelector('.brand-logo');
    const headerTexts = document.querySelectorAll('.header-text');

    // Adiciona a classe 'visible' ao header, logo e textos para iniciar a animação
    if (mainHeader) {
        setTimeout(() => {
            mainHeader.classList.add('visible');
        }, 100);
    }
    if (brandLogo) {
        setTimeout(() => {
            brandLogo.classList.add('visible');
        }, 300);
    }
    if (headerTexts.length > 0) {
        setTimeout(() => {
            headerTexts.forEach(text => text.classList.add('visible'));
        }, 500); // Atraso um pouco maior para que apareça por último
    }

    // --- Lógica de Navegação entre Seções ---
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    function switchTab(event) {
        event.preventDefault();

        const targetId = event.currentTarget.dataset.section;
        
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        event.currentTarget.classList.add('active');

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');

            // Adiciona a classe 'visible' aos elementos da seção ativa com um atraso
            const elementsToAnimate = targetSection.querySelectorAll('.section-title, .intro-text, .owner-info, .gallery-item, .partner-item, .contact-info');
            elementsToAnimate.forEach((element, index) => {
                setTimeout(() => element.classList.add('visible'), 100 * index); 
            });
        }
    }
    navLinks.forEach(link => {
        link.addEventListener('click', switchTab);
    });

    // Anima a primeira seção ao carregar a página
    const homeSection = document.getElementById('home-section');
    if (homeSection) {
        const initialElements = homeSection.querySelectorAll('.section-title, .intro-text, .owner-info');
        initialElements.forEach((element, index) => {
            setTimeout(() => element.classList.add('visible'), 100 * index);
        });
    }

    // --- Lógica da Galeria de Imagens (corrigido) ---
    const galleryImages = document.querySelectorAll('.gallery-item img');
    const overlay = document.getElementById('overlay');
    const fullImg = document.getElementById('full-img');
    const closeBtn = document.getElementById('close-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentImageIndex = 0;

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImageIndex = index;
            openImage(img.src, img.alt);
        });
    });

    const openImage = (src, alt) => {
        fullImg.src = src;
        fullImg.alt = alt;
        overlay.style.display = 'flex';
    };

    closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            overlay.style.display = 'none';
        }
    });

    const showNextImage = () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        fullImg.src = galleryImages [currentImageIndex].src;
        fullImg.alt = galleryImages [currentImageIndex].alt;
    };

    const showPrevImage = () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        fullImg.src = galleryImages [currentImageIndex].src;
        fullImg.alt = galleryImages [currentImageIndex].alt;
    };

    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);

});