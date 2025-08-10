
document.addEventListener('DOMContentLoaded', function() {

    const mainHeader = document.getElementById('main-header');
    const brandLogo = document.querySelector('.brand-logo');
    const headerTexts = document.querySelectorAll('.header-text');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const galleryImages = document.querySelectorAll('.gallery-item img');
    const videoItems = document.querySelectorAll('.video-item');
    const overlay = document.getElementById('overlay');
    const fullImg = document.getElementById('full-img');
    const closeBtn = document.getElementById('close-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentImageIndex = 0;



    // Animação de entrada do cabeçalho
    function animateHeader() {
        if (mainHeader) mainHeader.classList.add('visible');
        if (brandLogo) brandLogo.classList.add('visible');
        if (headerTexts.length > 0) headerTexts.forEach(text => text.classList.add('visible'));
    }



    // Lógica para alternar entre as seções
    function switchTab(event) {
        event.preventDefault();
        const targetId = event.currentTarget.dataset.section;

        navLinks.forEach(link => link.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));
        event.currentTarget.classList.add('active');

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            const elementsToAnimate = targetSection.querySelectorAll('.section-title, .intro-text, .owner-info, .gallery-item, .partner-item, .contact-info');
            elementsToAnimate.forEach((element, index) => {
                setTimeout(() => element.classList.add('visible'), 100 * index);
            });
        }
    }



    // Lógica da galeria de imagens e vídeos
    function openImage(src, alt) {
        fullImg.src = src;
        fullImg.alt = alt;
        fullImg.classList.remove('video-embed');
        overlay.style.display = 'flex';
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    }

    function openVideo(src) {
        fullImg.src = src;
        fullImg.alt = 'Vídeo do YouTube';
        fullImg.classList.add('video-embed');
        overlay.style.display = 'flex';
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        openImage(galleryImages[currentImageIndex].src, galleryImages[currentImageIndex].alt);
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        openImage(galleryImages[currentImageIndex].src, galleryImages[currentImageIndex].alt);
    }



    // Event Listeners
    navLinks.forEach(link => link.addEventListener('click', switchTab));
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImageIndex = index;
            openImage(img.src, img.alt);
        });
    });



    // Event listener para os itens de vídeo
    videoItems.forEach(item => {
        item.addEventListener('click', () => {
            const iframe = item.querySelector('iframe');
            if (iframe) {
                // Pega a URL do iframe e remove o 'autoplay=0' para reproduzir ao abrir o overlay.
                let videoSrc = iframe.src.replace('autoplay=0', 'autoplay=1');
                openVideo(videoSrc);
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
        fullImg.src = ''; // vídeo pare de tocar
    });
    
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            overlay.style.display = 'none';
            fullImg.src = '';
        }
    });

    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);


    // Inicialização da página
    animateHeader();
    const homeSection = document.getElementById('home-section');
    if (homeSection) {
        const initialElements = homeSection.querySelectorAll('.section-title, .intro-text, .owner-info');
        initialElements.forEach((element, index) => {
            setTimeout(() => element.classList.add('visible'), 100 * index);
        });
    }
});