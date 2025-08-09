// Espera o documento HTML ser completamente carregado antes de rodar o script
document.addEventListener('DOMContentLoaded', function() {

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
        }
    }
    navLinks.forEach(link => {
        link.addEventListener('click', switchTab);
    });

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

    // Função para abrir a imagem de forma simples (sem animação)
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
        fullImg.src = galleryImages[currentImageIndex].src;
        fullImg.alt = galleryImages[currentImageIndex].alt;
    };

    const showPrevImage = () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        fullImg.src = galleryImages[currentImageIndex].src;
        fullImg.alt = galleryImages[currentImageIndex].alt;
    };

    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);

});