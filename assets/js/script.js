 document.addEventListener('DOMContentLoaded', function() {
            // --- Intersection Observer for scroll animations ---
            const animatedElements = document.querySelectorAll('[data-animation]');
            const navLinks = document.querySelectorAll('.nav-link');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            animatedElements.forEach(el => {
                observer.observe(el);
            });
            
            // --- Active Nav Link Highlighting ---
            const sections = document.querySelectorAll('section');
            const navObserver = new IntersectionObserver((entries) => {
                 entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href').substring(1) === entry.target.id) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, { rootMargin: "-50% 0px -50% 0px" });
            
            sections.forEach(section => {
                navObserver.observe(section);
            });


            // --- Typing Effect ---
            const typedTextSpan = document.querySelector("#typed-text");
            if (typedTextSpan) {
                const textArray = ["PHP & Laravel Developer","Python & Django Developer", "Full Stack Engineer", "Freelancer"];
                const typingDelay = 100;
                const erasingDelay = 50;
                const newTextDelay = 2000;
                let textArrayIndex = 0;
                let charIndex = 0;

                function type() {
                    if (charIndex < textArray[textArrayIndex].length) {
                        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                        charIndex++;
                        setTimeout(type, typingDelay);
                    } else {
                        setTimeout(erase, newTextDelay);
                    }
                }

                function erase() {
                    if (charIndex > 0) {
                        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                        charIndex--;
                        setTimeout(erase, erasingDelay);
                    } else {
                        textArrayIndex++;
                        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                        setTimeout(type, typingDelay + 1100);
                    }
                }
                
                if (textArray.length) setTimeout(type, newTextDelay + 250);
            }

            // --- Animate Skill Bars on Scroll ---
            const skillBars = document.querySelectorAll('.skill-bar');
            const skillObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bar = entry.target.querySelector('.bar');
                        const percent = entry.target.dataset.percent;
                        bar.style.width = percent + '%';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            skillBars.forEach(bar => {
                skillObserver.observe(bar);
            });
            
            // --- Back to Top Button ---
            const backToTopButton = document.getElementById('back-to-top');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTopButton.classList.add('show');
                } else {
                    backToTopButton.classList.remove('show');
                }
            });
            backToTopButton.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            // --- Custom Cursor Follower ---
            const cursorDot = document.querySelector('.cursor-dot');
            window.addEventListener('mousemove', e => {
                cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            });
            
            // --- 3D Tilt Effect for Cards ---
            const tiltCards = document.querySelectorAll('.tilt-card');
            tiltCards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    const rotateX = (y / rect.height) * -8;
                    const rotateY = (x / rect.width) * 8;
                    
                    card.style.transition = 'transform 0.1s ease-out';
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transition = 'transform 0.5s ease-in-out';
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                });
            });

            // --- Lightbox Gallery Logic ---
            const galleryItems = document.querySelectorAll('.gallery-item');
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxClose = document.getElementById('lightbox-close');
            const lightboxPrev = document.getElementById('lightbox-prev');
            const lightboxNext = document.getElementById('lightbox-next');
            let currentIndex = 0;
            const images = Array.from(galleryItems).map(item => item.querySelector('img').src);

            function showLightbox(index) {
                currentIndex = index;
                lightboxImg.src = images[currentIndex];
                lightbox.classList.add('show');
                document.body.style.overflow = 'hidden';
            }

            function hideLightbox() {
                lightbox.classList.remove('show');
                document.body.style.overflow = 'auto';
            }

            function showNextImage() {
                currentIndex = (currentIndex + 1) % images.length;
                lightboxImg.src = images[currentIndex];
            }

            function showPrevImage() {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                lightboxImg.src = images[currentIndex];
            }

            galleryItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    showLightbox(index);
                });
            });

            lightboxClose.addEventListener('click', hideLightbox);
            lightboxNext.addEventListener('click', showNextImage);
            lightboxPrev.addEventListener('click', showPrevImage);
            
            // Close lightbox on outside click
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    hideLightbox();
                }
            });

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (lightbox.classList.contains('show')) {
                    if (e.key === 'Escape') hideLightbox();
                    if (e.key === 'ArrowRight') showNextImage();
                    if (e.key === 'ArrowLeft') showPrevImage();
                }
            });
        });