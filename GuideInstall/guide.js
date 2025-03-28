// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const preloader = document.querySelector('.preloader');
    const header = document.querySelector('.site-header');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const installationSteps = document.querySelectorAll('.installation-step');
    const copyServerButton = document.getElementById('copyServerButton');
    const stepImages = document.querySelectorAll('.step-image');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    const backToTop = document.getElementById('backToTop');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const titleIconContainer = document.querySelector('.title-icon-container');
    const revealButton = document.getElementById('revealButton');
    const discordPopup = document.getElementById('discordPopup');
    const closePopupButton = document.getElementById('closePopupButton');

    // Masquer le preloader après le chargement de la page
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500);
    });

    // ========== Cursor personnalisé ==========
    if (window.innerWidth > 992) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            
            // Animer le curseur principal
            gsap.to(cursorDot, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: 'power2.out',
                onStart: () => {
                    if (cursorDot.style.opacity === '0') {
                        gsap.to(cursorDot, { opacity: 1, duration: 0.3 });
                    }
                }
            });
            
            // Animer le contour du curseur avec un léger décalage
            gsap.to(cursorOutline, {
                x: clientX,
                y: clientY,
                duration: 0.6,
                ease: 'power3.out',
                onStart: () => {
                    if (cursorOutline.style.opacity === '0') {
                        gsap.to(cursorOutline, { opacity: 0.8, duration: 0.3 });
                    }
                }
            });
        });

        // Effet hover sur les éléments interactifs
        const interactiveElements = document.querySelectorAll('a, button, .tab-button, .step-image');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursorOutline, {
                    scale: 1.5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            el.addEventListener('mouseleave', () => {
                gsap.to(cursorOutline, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        // Masquer le curseur quand il quitte la fenêtre
        document.addEventListener('mouseout', (e) => {
            if (e.relatedTarget === null) {
                gsap.to([cursorDot, cursorOutline], { opacity: 0, duration: 0.3 });
            }
        });
    } else {
        // Masquer le curseur personnalisé sur les petits écrans
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    }

    // ========== Animation de l'icône du titre ==========
    if (titleIconContainer) {
        titleIconContainer.addEventListener('mouseenter', () => {
            gsap.to(titleIconContainer, {
                rotation: 360,
                scale: 1.1,
                duration: 0.5,
                ease: 'back.out(1.7)'
            });
        });
        
        titleIconContainer.addEventListener('mouseleave', () => {
            gsap.to(titleIconContainer, {
                rotation: 0,
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.7)'
            });
        });
    }

    // ========== Header au scroll ==========
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Ajouter/retirer la classe 'scrolled' sur le header
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Masquer/afficher le header lors du scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        // Afficher/masquer le bouton "retour en haut"
        if (currentScroll > 600) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
        
        lastScroll = currentScroll;
    });

    // ========== Menu mobile ==========
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Fermer le menu mobile quand on clique sur un lien
    if (mobileLinks.length > 0) {
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
    
    // ========== Gestion des onglets ==========
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Supprimer la classe active de tous les boutons et contenus
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Ajouter la classe active au bouton cliqué
                button.classList.add('active');
                
                // Afficher le contenu correspondant
                const tabId = button.getAttribute('data-tab');
                const contentToShow = document.getElementById(tabId);
                
                if (contentToShow) {
                    contentToShow.classList.add('active');
                    
                    // Animer les étapes d'installation dans l'onglet actif
                    const steps = contentToShow.querySelectorAll('.installation-step');
                    animateSteps(steps);
                }
            });
        });
    }
    
    // ========== Animation des étapes d'installation ==========
    function animateSteps(steps) {
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.classList.add('visible');
            }, index * 150);
        });
    }
    
    // Animer les étapes d'installation dans l'onglet actif par défaut
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab) {
        const steps = activeTab.querySelectorAll('.installation-step');
        animateSteps(steps);
    }
    
    // ========== Système de copie de l'IP du serveur ==========
    if (copyServerButton) {
        copyServerButton.addEventListener('click', () => {
            const serverIP = document.querySelector('.server-ip').textContent;
            navigator.clipboard.writeText(serverIP)
                .then(() => {
                    const originalText = copyServerButton.innerHTML;
                    copyServerButton.innerHTML = '<i class="fas fa-check"></i> <span>Copié !</span>';
                    
                    setTimeout(() => {
                        copyServerButton.innerHTML = originalText;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Erreur lors de la copie :', err);
                    alert('Impossible de copier l\'adresse. Veuillez la copier manuellement.');
                });
        });
    }
    
    // ========== Lightbox pour les images ==========
    if (stepImages.length > 0 && lightbox && lightboxImg) {
        stepImages.forEach(image => {
            image.addEventListener('click', () => {
                const src = image.getAttribute('src');
                lightboxImg.setAttribute('src', src);
                lightbox.classList.add('active');
                document.body.classList.add('no-scroll');
            });
        });
    }
    
    if (closeLightbox && lightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
        
        // Fermer la lightbox en cliquant en dehors
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
        
        // Fermer la lightbox avec la touche Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }
    
    // ========== Bouton "Retour en haut" ==========
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========== Navigation fluide pour les liens d'ancrage ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                
                let offset = 100;
                // Si on utilise un navigateur mobile, réduire l'offset
                if (window.innerWidth <= 768) {
                    offset = 70;
                }
                
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== Animations GSAP ==========
    if (window.gsap) {
        // Animation de l'en-tête de la page
        gsap.from('.page-header', {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: 'power3.out'
        });
        
        // Animation de la carte de configuration requise
        gsap.from('.requirements-card', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 0.3,
            ease: 'power2.out'
        });
        
        // Animation des onglets
        gsap.from('.installation-tabs', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 0.5,
            ease: 'power2.out'
        });
        
        // Animation des notes, astuces et avertissements
        gsap.utils.toArray('.note-box, .tip-box, .warning-box').forEach((box, index) => {
            gsap.from(box, {
                scrollTrigger: {
                    trigger: box,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                x: index % 2 === 0 ? -30 : 30,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
        
        // Animation des boutons d'action
        gsap.from('.action-buttons', {
            scrollTrigger: {
                trigger: '.action-buttons',
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out'
        });
        
        // Animation d'entrée des images des étapes
        gsap.utils.toArray('.step-image').forEach(image => {
            gsap.from(image, {
                scrollTrigger: {
                    trigger: image,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                scale: 0.9,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
    }

    if (revealButton && discordPopup && closePopupButton) {
        revealButton.addEventListener('click', () => {
            discordPopup.classList.add('active');
        });

        closePopupButton.addEventListener('click', () => {
            discordPopup.classList.remove('active');
        });

        // Close popup when clicking outside of it
        window.addEventListener('click', (e) => {
            if (e.target === discordPopup) {
                discordPopup.classList.remove('active');
            }
        });
    }
});