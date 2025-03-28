// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const preloader = document.querySelector('.preloader');
    const header = document.querySelector('.site-header');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const heroImage = document.querySelector('.hero-image');
    const copyButton = document.getElementById('copyButton');
    const tooltip = document.getElementById('tooltip');
    const backToTop = document.getElementById('backToTop');
    const accordion = document.querySelectorAll('.accordion-item');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const counters = document.querySelectorAll('.counter');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const helpLink = document.getElementById('helpLink');
    const contactLink = document.getElementById('contactLink');
    const bugReport = document.getElementById('bugReport');
    const revealButton = document.getElementById('revealButton');
    const serverAddressContainer = document.querySelector('.server-address-container');
    const discordButton = document.getElementById('discordButton');
    const discordPopup = document.getElementById('discordPopup');
    const closePopupButton = document.getElementById('closePopupButton');

    // Masquer le preloader après le chargement de la page
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500);
    });

    // Initialiser GSAP et ScrollTrigger
    initGSAP();

    // Créer des particules dans le background
    createParticles();

    // ========== Cursor personnalisé ==========
    if (window.innerWidth > 992) {
        // Initialiser le curseur à l'entrée de la page
        gsap.to([cursorDot, cursorOutline], { opacity: 1, duration: 0.3 });

        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            
            // Animer le curseur principal
            gsap.to(cursorDot, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
            
            // Animer le contour du curseur avec un léger décalage
            gsap.to(cursorOutline, {
                x: clientX,
                y: clientY,
                duration: 0.6,
                ease: 'power3.out'
            });
        });

        // Effet hover sur les éléments interactifs
        const interactiveElements = document.querySelectorAll('a, button, .accordion-header, .gallery-item');
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

    // ========== Effet parallaxe sur la section hero ==========
    if (heroImage) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 30;
            const yPos = (clientY / window.innerHeight - 0.5) * 30;
            
            gsap.to(heroImage, {
                x: xPos,
                y: yPos,
                duration: 1,
                ease: 'power2.out'
            });
        });
    }

    // ========== Système de copie de l'IP ==========
    if (copyButton && tooltip) {
        copyButton.addEventListener('click', () => {
            const serverIP = document.querySelector('.server-ip').textContent;
            navigator.clipboard.writeText(serverIP)
                .then(() => {
                    tooltip.classList.add('active');
                    setTimeout(() => tooltip.classList.remove('active'), 2000);
                })
                .catch(err => {
                    console.error('Erreur lors de la copie :', err);
                    alert('Impossible de copier l\'adresse. Veuillez la copier manuellement.');
                });
        });
    }

    // ========== Accordion pour la FAQ ==========
    if (accordion.length > 0) {
        accordion.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            
            header.addEventListener('click', () => {
                // Si l'item est déjà actif, on le ferme, sinon on l'ouvre
                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                    gsap.to(content, {
                        height: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                } else {
                    // Fermer les autres accordéons
                    accordion.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                            gsap.to(otherItem.querySelector('.accordion-content'), {
                                height: 0,
                                duration: 0.3,
                                ease: 'power2.out'
                            });
                        }
                    });
                    
                    // Ouvrir l'accordéon actuel
                    item.classList.add('active');
                    gsap.to(content, {
                        height: 'auto',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });
    }

    // ========== Lightbox pour la galerie ==========
    if (galleryItems.length > 0 && lightbox && lightboxImg) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const src = img.getAttribute('src');
                const alt = img.getAttribute('alt');
                
                lightboxImg.setAttribute('src', src);
                lightboxCaption.textContent = alt;
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

    // ========== Animation des compteurs ==========
    function animateCounter() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 100;
            
            const updateCounter = () => {
                const current = +counter.innerText;
                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCounter();
        });
    }

    // Observer pour démarrer l'animation des compteurs quand ils sont visibles
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const statsContainer = document.querySelector('.community-stats');
        if (statsContainer) {
            counterObserver.observe(statsContainer);
        }
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

    // ========== Liens footer (contact, aide, etc.) ==========
    if (helpLink) {
        helpLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Besoin d'aide ? Rendez-vous sur notre Discord ou consultez la FAQ pour obtenir de l'assistance.");
        });
    }
    
    if (contactLink) {
        contactLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Contact : Équipe de modération sur Discord");
        });
    }
    
    if (bugReport) {
        bugReport.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Google Form pour signaler un bug ou un problème : bientôt disponible");
        });
    }

    // ========== Créer des particules ==========
    function createParticles() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;
        
        // Créer des particules
        for (let i = 0; i < 50; i++) {
            createParticle(particlesContainer);
        }
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Propriétés aléatoires
        const size = Math.random() * 5 + 3;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.2;
        const animationDuration = Math.random() * 20 + 10;
        
        // Appliquer les styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = opacity;
        particle.style.position = 'absolute';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = getRandomColor();
        particle.style.boxShadow = `0 0 ${size*2}px ${getRandomColor(0.3)}`;
        
        // Ajouter l'animation
        particle.style.animation = `float ${animationDuration}s ease-in-out infinite`;
        
        // Décaler l'animation pour chaque particule
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        // Ajouter au conteneur
        container.appendChild(particle);
    }
    
    function getRandomColor(opacity = 1) {
        const colors = [
            `rgba(140, 82, 255, ${opacity})`, // Violet
            `rgba(26, 115, 232, ${opacity})`, // Bleu
            `rgba(254, 140, 0, ${opacity})`,  // Orange
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // ========== Initialiser GSAP ==========
    function initGSAP() {
        // Activer les plugins de GSAP si disponibles
        if (window.gsap) {
            const gsap = window.gsap;
            
            if (gsap.ScrollTrigger) {
                gsap.registerPlugin(ScrollTrigger);
                
                // Animation des titres de section
                gsap.utils.toArray('.section-header').forEach(header => {
                    gsap.from(header.querySelector('.section-title'), {
                        scrollTrigger: {
                            trigger: header,
                            start: 'top 80%',
                            end: 'bottom 20%',
                            toggleActions: 'play none none reverse'
                        },
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power2.out'
                    });
                    
                    gsap.from(header.querySelector('.section-subtitle'), {
                        scrollTrigger: {
                            trigger: header,
                            start: 'top 80%',
                            end: 'bottom 20%',
                            toggleActions: 'play none none reverse'
                        },
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        delay: 0.2,
                        ease: 'power2.out'
                    });
                });
                
                // Animation des cartes de fonctionnalités
                gsap.utils.toArray('.feature-card').forEach((card, index) => {
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        },
                        y: 50,
                        opacity: 0,
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: 'power2.out'
                    });
                });
                
                // Animation des cartes sociales
                gsap.utils.toArray('.social-card').forEach((card, index) => {
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        },
                        scale: 0.9,
                        opacity: 0,
                        duration: 0.6,
                        delay: index * 0.2,
                        ease: 'power2.out'
                    });
                });
                
                // Animation des items de statistiques
                gsap.utils.toArray('.stat-item').forEach((item, index) => {
                    gsap.from(item, {
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        },
                        y: 30,
                        opacity: 0,
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: 'power2.out'
                    });
                });
                
                // Animation des cartes contributeurs
                gsap.utils.toArray('.contributeur-card').forEach((card, index) => {
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        },
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: 'back.out(1.5)'
                    });
                });
                
                // Animation des items FAQ (accordéon)
                gsap.utils.toArray('.accordion-item').forEach((item, index) => {
                    gsap.from(item, {
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        },
                        y: 30,
                        opacity: 0,
                        duration: 0.6,
                        delay: index * 0.15,
                        ease: 'power2.out'
                    });
                });
                
                // Animation des items de galerie
                gsap.utils.toArray('.gallery-item').forEach((item, index) => {
                    gsap.from(item, {
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        },
                        scale: 0.9,
                        opacity: 0,
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: 'power2.out'
                    });
                });
                
                // Animation des cartes de news
                gsap.utils.toArray('.news-card').forEach((card, index) => {
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        },
                        y: 50,
                        opacity: 0,
                        duration: 0.6,
                        delay: index * 0.2,
                        ease: 'power2.out'
                    });
                });
                
                // Animation du footer
                const footer = document.querySelector('.site-footer');
                if (footer) {
                    gsap.from(footer.querySelector('.footer-logo'), {
                        scrollTrigger: {
                            trigger: footer,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        },
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power2.out'
                    });
                    
                    gsap.utils.toArray('.footer-links').forEach((links, index) => {
                        gsap.from(links, {
                            scrollTrigger: {
                                trigger: footer,
                                start: 'top 85%',
                                toggleActions: 'play none none reverse'
                            },
                            y: 30,
                            opacity: 0,
                            duration: 0.8,
                            delay: 0.2 + (index * 0.1),
                            ease: 'power2.out'
                        });
                    });
                }
            }
        }
    }

    // ========== Gérer les liens externes ==========
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        // Ajouter un attribut rel pour la sécurité si absent
        if (!link.getAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    if (revealButton && serverAddressContainer && discordButton) {
        revealButton.addEventListener('click', () => {
            serverAddressContainer.classList.remove('blurred');
            revealButton.style.display = 'none';
            discordButton.style.display = 'block';
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