// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const preloader = document.querySelector('.preloader');
    const header = document.querySelector('.site-header');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const ruleCards = document.querySelectorAll('.rule-card');
    const backToTop = document.getElementById('backToTop');

    // Masquer le preloader après le chargement de la page
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500);
    });
    
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
        if (currentScroll > 300) {
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
    
    // ========== Animation des cartes de règles ==========
    if (ruleCards.length > 0) {
        // Animation au chargement de la page
        ruleCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
        
        // Animation au survol
        ruleCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.rule-icon');
                
                if (icon) {
                    icon.style.transition = 'transform 0.3s ease';
                    icon.style.transform = 'scale(1.2)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.rule-icon');
                
                if (icon) {
                    icon.style.transform = 'scale(1)';
                }
            });
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
});