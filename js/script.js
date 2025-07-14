AOS.init({
    duration: 800,
    once: true
});

$(document).ready(function () {

    // Smooth scrolling for anchor links (excluding sidebar items)
    $('a[href^="#"]:not([href="#"]):not(.sidebar-item)').on('click', function (event) {
        let target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 140
            }, 1000);
        }
    });

    // Active nav link highlighting
    $('.nav-link').on('click', function () {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });




    // Dropdown hover effects for desktop
    if ($(window).width() >= 768) {
        $('.dropdown').hover(
            function () {
                $(this).addClass('show');
                $(this).find('.dropdown-menu, .mega-menu').addClass('show');
            },
            function () {
                $(this).removeClass('show');
                $(this).find('.dropdown-menu, .mega-menu').removeClass('show');
            }
        );

        // Mobile menu auto-close
        $('.navbar-nav .nav-link').on('click', function (e) {

            if (!$(this).hasClass('dropdown-toggle')) {
                $('.navbar-collapse').collapse('hide');
            }

        });
    }

    // Mobilde dropdown'ları tıklayarak aç/kapat
    if ($(window).width() < 768) {
        $('.dropdown > .nav-link').on('click', function (e) {
            e.preventDefault();

            // Sadece bu dropdown'u aç/kapat
            const $dropdown = $(this).parent();

            if ($dropdown.hasClass('show')) {
                $dropdown.removeClass('show');
                $dropdown.find('.dropdown-menu, .mega-menu').slideUp(200).removeClass('show');
            } else {
                // Diğer açık menüleri kapat
                $('.dropdown').removeClass('show');
                $('.dropdown .dropdown-menu, .dropdown .mega-menu').slideUp(200).removeClass('show');

                // Bu menüyü aç
                $dropdown.addClass('show');
                $dropdown.find('.dropdown-menu, .mega-menu').slideDown(200).addClass('show');
            }
        });
    }

    // Initialize tooltips
    $('[data-bs-toggle="tooltip"]').tooltip();

    // Navbar collapse on outside click
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.navbar').length) {
            $('.navbar-collapse').collapse('hide');
        }
    });
});



// Daha fazla ülke toggle
$(document).ready(function () {
    $('#toggleMoreBtn').click(function () {
        const moreSection = $('.more-countries');
        const isHidden = moreSection.is(':hidden');
        const button = $(this);

        moreSection.slideToggle(400);

        if (isHidden) {
            button.html('Daha Az Göster <i class="bi bi-chevron-up ms-2"></i>');
        } else {
            button.html('Daha Fazla Göster <i class="bi bi-chevron-down ms-2"></i>');
        }
    });
});

// Navbar scroll efekti
let lastScrollTop = 0;

$(window).on("scroll", function () {
    let currentScroll = $(this).scrollTop();

    if (currentScroll > lastScrollTop && currentScroll > 100) {
        // Aşağı kaydırma
        $('.navbar-area').addClass('navbar-hidden');
    } else {
        // Yukarı kaydırma
        $('.navbar-area').removeClass('navbar-hidden');
    }

    lastScrollTop = currentScroll;
});

$(document).ready(function () {
    // AOS başlatma
    AOS.init({
        duration: 800,
        once: true
    });

    // Switch işlemleri
    $('.switch-option').click(function () {
        const formType = $(this).data('form');

        // Aktif class değiştirme
        $('.switch-option').removeClass('active');
        $(this).addClass('active');

        // Switch slider animasyonu
        if (formType === 'signup') {
            $('#switchSlider').removeClass('signin');
            $('.auth-divider').addClass('invisible');
            $('.social-auth').addClass('invisible');

            $('.auth-form-container').css('min-height', '400px');
            $('#switchLink').text('Giriş yapın');
            $('.auth-footer p').html('Zaten hesabınız var mı? <a href="#" id="switchLink">Giriş yapın</a>');
        } else {
            $('#switchSlider').addClass('signin');
            $('.auth-divider').removeClass('invisible');
            $('.social-auth').removeClass('invisible');

            $('.auth-form-container').css('min-height', '320px');
            $('#switchLink').text('Üye olun');
            $('.auth-footer p').html('Hesabınız yok mu? <a href="#" id="switchLink">Üye olun</a>');
        }

        // Form değiştirme
        $('.auth-form').removeClass('active');
        setTimeout(() => {
            $('#' + formType + 'Form').addClass('active');
        }, 200);
    });

    // Footer link işlemleri
    $(document).on('click', '#switchLink', function (e) {
        e.preventDefault();
        const currentActive = $('.switch-option.active').data('form');
        const targetForm = currentActive === 'signup' ? 'signin' : 'signup';
        $('.switch-option[data-form="' + targetForm + '"]').click();
    });

    // Şifre göster/gizle
    $('.auth-password-toggle').click(function () {
        const input = $(this).siblings('.auth-form-control');
        const icon = $(this).find('i');

        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
            icon.removeClass('bx-hide').addClass('bx-show');
        } else {
            input.attr('type', 'password');
            icon.removeClass('bx-show').addClass('bx-hide');
        }
    });

    // Form submit işlemleri
    $('#signupForm').submit(function (e) {
        e.preventDefault();

        const btn = $(this).find('.btn-auth');
        const originalContent = btn.html();

        btn.html('<i class="bx bx-loader-alt bx-spin"></i> Kaydediliyor...');
        btn.prop('disabled', true);

        setTimeout(() => {
            btn.html('<i class="bx bx-check"></i> Başarılı!');
            btn.css('background', 'linear-gradient(135deg, #28a745, #20c997)');

            setTimeout(() => {
                btn.html(originalContent);
                btn.prop('disabled', false);
                btn.css('background', 'linear-gradient(135deg, #667eea, #764ba2)');
            }, 2000);
        }, 2000);
    });

    $('#signinForm').submit(function (e) {
        e.preventDefault();

        const btn = $(this).find('.btn-auth');
        const originalContent = btn.html();

        btn.html('<i class="bx bx-loader-alt bx-spin"></i> Giriş yapılıyor...');
        btn.prop('disabled', true);

        setTimeout(() => {
            btn.html('<i class="bx bx-check"></i> Başarılı!');
            btn.css('background', 'linear-gradient(135deg, #28a745, #20c997)');

            setTimeout(() => {
                btn.html(originalContent);
                btn.prop('disabled', false);
                btn.css('background', 'linear-gradient(135deg, #667eea, #764ba2)');
            }, 2000);
        }, 2000);
    });

    // Sosyal medya butonları
    $('.btn-social').click(function (e) {
        e.preventDefault();
        const btn = $(this);
        const originalContent = btn.html();

        btn.html('<i class="bx bx-loader-alt bx-spin"></i> Yükleniyor...');
        btn.css('pointer-events', 'none');

        setTimeout(() => {
            btn.html(originalContent);
            btn.css('pointer-events', 'auto');
        }, 2000);
    });

    // Input focus efektleri
    $('.form-control').on('focus', function () {
        $(this).parent().addClass('focused');
    }).on('blur', function () {
        if (!$(this).val()) {
            $(this).parent().removeClass('focused');
        }
    });
});

// Contact Page JavaScript
$(document).ready(function () {
    // Contact form submission
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();

        const btn = $(this).find('.contact-btn-primary');
        const originalContent = btn.html();

        // Show loading state
        btn.html('<i class="bx bx-loader-alt bx-spin"></i> Gönderiliyor...');
        btn.prop('disabled', true);

        // Simulate form submission
        setTimeout(() => {
            // Reset form
            $(this)[0].reset();

            // Show success modal
            $('#successModal').modal('show');

            // Reset button
            btn.html(originalContent);
            btn.prop('disabled', false);

            // Reset form validation classes
            $(this).find('.contact-form-control').removeClass('is-valid is-invalid');

        }, 2000);
    });

    // Live chat button
    $('#liveChatBtn').on('click', function (e) {
        e.preventDefault();

        const btn = $(this);
        const originalContent = btn.html();

        btn.html('<i class="bx bx-loader-alt bx-spin"></i> Bağlanıyor...');
        btn.css('pointer-events', 'none');

        setTimeout(() => {
            alert('Canlı destek sistemi yakında aktif olacak!');
            btn.html(originalContent);
            btn.css('pointer-events', 'auto');
        }, 1500);
    });

    // Form validation
    $('.contact-form-control').on('blur', function () {
        const $this = $(this);
        const value = $this.val().trim();

        if ($this.prop('required') && !value) {
            $this.addClass('is-invalid').removeClass('is-valid');
        } else if (value) {
            // Email validation
            if ($this.attr('type') === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(value)) {
                    $this.addClass('is-valid').removeClass('is-invalid');
                } else {
                    $this.addClass('is-invalid').removeClass('is-valid');
                }
            } else {
                $this.addClass('is-valid').removeClass('is-invalid');
            }
        } else {
            $this.removeClass('is-valid is-invalid');
        }
    });

    // Phone number formatting
    $('input[name="phone"]').on('input', function () {
        let value = $(this).val().replace(/\D/g, '');

        if (value.startsWith('90')) {
            value = value.substring(2);
        }

        if (value.length > 0) {
            if (value.length <= 3) {
                value = `+90 ${value}`;
            } else if (value.length <= 6) {
                value = `+90 ${value.substring(0, 3)} ${value.substring(3)}`;
            } else if (value.length <= 8) {
                value = `+90 ${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(6)}`;
            } else if (value.length <= 10) {
                value = `+90 ${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(6, 8)} ${value.substring(8)}`;
            } else {
                value = `+90 ${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(6, 8)} ${value.substring(8, 10)}`;
            }
        }

        $(this).val(value);
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        const target = $($(this).attr('href'));

        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 800);
        }
    });

    // Contact method cards hover effect
    $('.contact-method-card').hover(
        function () {
            $(this).find('.contact-method-icon').addClass('animate__animated animate__pulse');
        },
        function () {
            $(this).find('.contact-method-icon').removeClass('animate__animated animate__pulse');
        }
    );

    // FAQ accordion custom behavior
    $('.contact-faq-button').on('click', function () {
        const $this = $(this);
        const target = $this.attr('data-bs-target');

        // Close other accordions
        $('.contact-faq-button').not($this).addClass('collapsed');
        $('.accordion-collapse').not(target).removeClass('show');

        setTimeout(() => {
            if (!$this.hasClass('collapsed')) {
                $this.closest('.contact-faq-item').addClass('active');
            } else {
                $('.contact-faq-item').removeClass('active');
            }
        }, 300);
    });

    // Success modal auto close
    $('#successModal').on('shown.bs.modal', function () {
        setTimeout(() => {
            $(this).modal('hide');
        }, 3000);
    });

    // Input focus effects
    $('.contact-form-control').on('focus', function () {
        $(this).closest('.contact-form-group').addClass('focused');
    }).on('blur', function () {
        if (!$(this).val()) {
            $(this).closest('.contact-form-group').removeClass('focused');
        }
    });

    // Counter animation for stats
    function animateCounters() {
        $('.contact-stat-content h4').each(function () {
            const $this = $(this);
            const text = $this.text();

            if (text.includes('7/24')) {
                $this.html('<span class="counter">7</span>/24');
            } else if (text.includes('Canlı')) {
                // Keep as is
            } else if (text.includes('Anında')) {
                // Keep as is
            }
        });
    }

    // Initialize counters when page loads
    animateCounters();

    // Parallax effect for hero section
    $(window).on('scroll', function () {
        const scrolled = $(this).scrollTop();
        const parallax = $('.contact-hero');
        const speed = 0.5;

        parallax.css('transform', `translateY(${scrolled * speed}px)`);
    });

    // Contact form character counter for textarea
    $('textarea[name="message"]').on('input', function () {
        const maxLength = 500;
        const currentLength = $(this).val().length;
        const remaining = maxLength - currentLength;

        let counter = $(this).siblings('.char-counter');
        if (counter.length === 0) {
            counter = $('<div class="char-counter"></div>');
            $(this).after(counter);
        }

        counter.text(`${remaining} karakter kaldı`);

        if (remaining < 50) {
            counter.addClass('text-warning');
        } else {
            counter.removeClass('text-warning');
        }

        if (remaining < 0) {
            counter.addClass('text-danger').removeClass('text-warning');
            $(this).val($(this).val().substring(0, maxLength));
        } else {
            counter.removeClass('text-danger');
        }
    });
});

// Auth page JavaScript (existing code)
$(document).ready(function () {
    // AOS başlatma
    AOS.init({
        duration: 800,
        once: true
    });

    // Switch işlemleri
    $('.switch-option').click(function () {
        const formType = $(this).data('form');

        // Aktif class değiştirme
        $('.switch-option').removeClass('active');
        $(this).addClass('active');

        // Switch slider animasyonu
        if (formType === 'signup') {
            $('#switchSlider').removeClass('signin');
            $('.auth-divider').addClass('invisible');
            $('.social-auth').addClass('invisible');

            $('.auth-form-container').css('min-height', '400px');
            $('#switchLink').text('Giriş yapın');
            $('.auth-footer p').html('Zaten hesabınız var mı? <a href="#" id="switchLink">Giriş yapın</a>');
        } else {
            $('#switchSlider').addClass('signin');
            $('.auth-divider').removeClass('invisible');
            $('.social-auth').removeClass('invisible');

            $('.auth-form-container').css('min-height', '320px');
            $('#switchLink').text('Üye olun');
            $('.auth-footer p').html('Hesabınız yok mu? <a href="#" id="switchLink">Üye olun</a>');
        }

        // Form değiştirme
        $('.auth-form').removeClass('active');
        setTimeout(() => {
            $('#' + formType + 'Form').addClass('active');
        }, 200);
    });

    // Footer link işlemleri
    $(document).on('click', '#switchLink', function (e) {
        e.preventDefault();
        const currentActive = $('.switch-option.active').data('form');
        const targetForm = currentActive === 'signup' ? 'signin' : 'signup';
        $('.switch-option[data-form="' + targetForm + '"]').click();
    });

    // Şifre göster/gizle
    $('.auth-password-toggle').click(function () {
        const input = $(this).siblings('.auth-form-control');
        const icon = $(this).find('i');

        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
            icon.removeClass('bx-hide').addClass('bx-show');
        } else {
            input.attr('type', 'password');
            icon.removeClass('bx-show').addClass('bx-hide');
        }
    });

    // Form submit işlemleri
    $('#signupForm').submit(function (e) {
        e.preventDefault();

        const btn = $(this).find('.btn-auth');
        const originalContent = btn.html();

        btn.html('<i class="bx bx-loader-alt bx-spin"></i> Kaydediliyor...');
        btn.prop('disabled', true);

        setTimeout(() => {
            btn.html('<i class="bx bx-check"></i> Başarılı!');
            btn.css('background', 'linear-gradient(135deg, #28a745, #20c997)');

            setTimeout(() => {
                btn.html(originalContent);
                btn.prop('disabled', false);
                btn.css('background', 'linear-gradient(135deg, #667eea, #764ba2)');
            }, 2000);
        }, 2000);
    });

    $('#signinForm').submit(function (e) {
        e.preventDefault();

        const btn = $(this).find('.btn-auth');
        const originalContent = btn.html();

        btn.html('<i class="bx bx-loader-alt bx-spin"></i> Giriş yapılıyor...');
        btn.prop('disabled', true);

        setTimeout(() => {
            btn.html('<i class="bx bx-check"></i> Başarılı!');
            btn.css('background', 'linear-gradient(135deg, #28a745, #20c997)');

            setTimeout(() => {
                btn.html(originalContent);
                btn.prop('disabled', false);
                btn.css('background', 'linear-gradient(135deg, #667eea, #764ba2)');
            }, 2000);
        }, 2000);
    });

    // Sosyal medya butonları
    $('.btn-social').click(function (e) {
        e.preventDefault();
        const btn = $(this);
        const originalContent = btn.html();

        btn.html('<i class="bx bx-loader-alt bx-spin"></i> Yükleniyor...');
        btn.css('pointer-events', 'none');

        setTimeout(() => {
            btn.html(originalContent);
            btn.css('pointer-events', 'auto');
        }, 2000);
    });

    // Input focus efektleri
    $('.auth-form-control').on('focus', function () {
        $(this).parent().addClass('focused');
    }).on('blur', function () {
        if (!$(this).val()) {
            $(this).parent().removeClass('focused');
        }
    });
});

// About Page JavaScript
$(document).ready(function () {
    // AOS başlatma - About sayfası için
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            disable: false
        });
    }

    // Global animation flags
    let countersAnimated = false;
    let timelineAnimated = false;
    let valuesAnimated = false;

    // Counter animation - sadece bir kez çalışacak
    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;

        $('.about-stat-number').each(function () {
            const $this = $(this);
            const countTo = $this.attr('data-count');

            if (countTo) {
                $({ countNum: 0 }).animate({
                    countNum: countTo
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        let num = Math.floor(this.countNum);

                        // Format large numbers
                        if (num >= 1000000) {
                            num = (num / 1000000).toFixed(1) + 'M';
                        } else if (num >= 1000) {
                            num = (num / 1000).toFixed(0) + 'K';
                        }

                        $this.text(num);
                    },
                    complete: function () {
                        let finalNum = parseInt(countTo);

                        if (finalNum >= 1000000) {
                            finalNum = (finalNum / 1000000).toFixed(1) + 'M';
                        } else if (finalNum >= 1000) {
                            finalNum = (finalNum / 1000).toFixed(0) + 'K';
                        }

                        $this.text(finalNum);
                    }
                });
            }
        });
    }

    // Timeline animation - sadece bir kez çalışacak
    function animateTimeline() {
        if (timelineAnimated) return;
        timelineAnimated = true;

        $('.timeline-item').each(function (index) {
            const $this = $(this);
            const delay = index * 200;

            setTimeout(() => {
                $this.addClass('animate-in');
            }, delay);
        });
    }

    // Value cards animation - sadece bir kez çalışacak
    function animateValueCards() {
        if (valuesAnimated) return;
        valuesAnimated = true;

        $('.value-card').each(function (index) {
            const $this = $(this);
            const delay = index * 150;

            setTimeout(() => {
                $this.addClass('animate-in');
            }, delay);
        });
    }

    // Intersection Observer ile animasyonları kontrol et
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;

                    if (target.classList.contains('about-hero-stats') && !countersAnimated) {
                        animateCounters();
                    }

                    if (target.classList.contains('about-story-timeline') && !timelineAnimated) {
                        animateTimeline();
                    }

                    if (target.classList.contains('about-values') && !valuesAnimated) {
                        animateValueCards();
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        const heroStats = document.querySelector('.about-hero-stats');
        const timeline = document.querySelector('.about-story-timeline');
        const values = document.querySelector('.about-values');

        if (heroStats) observer.observe(heroStats);
        if (timeline) observer.observe(timeline);
        if (values) observer.observe(values);
    } else {
        // Fallback for older browsers
        setTimeout(() => {
            if (!countersAnimated) animateCounters();
            if (!timelineAnimated) animateTimeline();
            if (!valuesAnimated) animateValueCards();
        }, 1000);
    }

    // Team cards hover effect
    $('.team-card').hover(
        function () {
            $(this).find('.team-avatar').addClass('animate__animated animate__pulse');
        },
        function () {
            $(this).find('.team-avatar').removeClass('animate__animated animate__pulse');
        }
    );

    // Smooth scrolling for CTA buttons
    $('.about-btn-primary, .about-btn-secondary').on('click', function (e) {
        const href = $(this).attr('href');

        if (href.startsWith('#')) {
            e.preventDefault();
            const target = $(href);

            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 100
                }, 800);
            }
        }
    });

    // Parallax effect for hero section - disabled to prevent layout shifts
    // $(window).on('scroll', function () {
    //     const scrolled = $(this).scrollTop();
    //     const parallax = $('.about-hero');
    //     const speed = 0.3;

    //     if (parallax.length) {
    //         parallax.css('transform', `translateY(${scrolled * speed}px)`);
    //     }
    // });

    // Visual cards floating animation enhancement
    function enhanceFloatingCards() {
        $('.about-visual-card').each(function (index) {
            const $this = $(this);
            const randomDelay = Math.random() * 2000;
            const randomDuration = 4000 + Math.random() * 2000;

            setTimeout(() => {
                $this.addClass('enhanced-float');
            }, randomDelay);
        });
    }

    // Initialize enhanced floating
    enhanceFloatingCards();

    // Mission and Vision cards interaction
    $('.mission-card, .vision-card').hover(
        function () {
            $(this).find('.mission-icon, .vision-icon').addClass('animate__animated animate__bounceIn');
        },
        function () {
            $(this).find('.mission-icon, .vision-icon').removeClass('animate__animated animate__bounceIn');
        }
    );

    // Add CSS classes for animations
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .timeline-item {
                opacity: 0;
                transform: translateX(-50px);
                transition: all 0.6s ease;
            }
            
            .timeline-item.animate-in {
                opacity: 1;
                transform: translateX(0);
            }
            
            .timeline-item:nth-child(odd).animate-in {
                transform: translateX(0);
            }
            
            .value-card {
                opacity: 0;
                transform: translateY(50px);
                transition: all 0.6s ease;
            }
            
            .value-card.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
     
            
            .about-stat-item {
                transform: scale(1);
                transition: all 0.3s ease;
            }
            
            .about-stat-item:hover {
                transform: scale(1.05) translateY(-5px);
            }
            
            .team-social a {
                transform: scale(1);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .team-social a:hover {
                transform: scale(1.2) rotate(10deg);
            }
        `)
        .appendTo('head');

    // Intersection Observer for better performance
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = $(entry.target);

                    if (target.hasClass('about-stat-number') && !target.hasClass('animated')) {
                        target.addClass('animated');
                        animateCounters();
                    }

                    if (target.hasClass('about-story-timeline') && !target.hasClass('animated')) {
                        target.addClass('animated');
                        animateTimeline();
                    }

                    if (target.hasClass('about-values') && !target.hasClass('animated')) {
                        target.addClass('animated');
                        animateValueCards();
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        $('.about-stat-number, .about-story-timeline, .about-values').each(function () {
            observer.observe(this);
        });
    }

    // Team member profile simulation
    $('.team-card').on('click', function () {
        const memberName = $(this).find('h4').text();
        const memberPosition = $(this).find('.team-position').text();

        // Simple alert for demonstration
        alert(`${memberName} - ${memberPosition}\n\nDetaylı profil sayfası yakında aktif olacak!`);
    });

    // Add loading animation to CTA buttons
    $('.about-btn-primary, .about-btn-secondary').on('click', function (e) {
        const $btn = $(this);
        const originalText = $btn.html();

        if (!$btn.attr('href').startsWith('#') && $btn.attr('href') !== 'contact.html') {
            e.preventDefault();

            $btn.html('<i class="bx bx-loader-alt bx-spin"></i> Yükleniyor...');
            $btn.prop('disabled', true);

            setTimeout(() => {
                $btn.html(originalText);
                $btn.prop('disabled', false);
                alert('Bu özellik yakında aktif olacak!');
            }, 2000);
        }
    });
});

// Profile Page Functions
$(document).ready(function () {
    // Profile page specific initialization
    if (window.location.pathname.includes('profile.html')) {
        initializeProfilePage();
    }
});

function initializeProfilePage() {
    // Sidebar navigation
    initializeSidebarNavigation();

    // Profile form functionality
    initializeProfileForm();

    // Package history filters
    initializePackageFilters();

    // Settings toggles
    initializeSettingsToggles();

    // Search functionality
    initializeSearch();

    // Tooltips
    initializeTooltips();

    // Animate stats on page load
    animateProfileStats();

    // Handle initial hash after everything is fully loaded
    setTimeout(function () {
        handleInitialHash();
    }, 100);
}

function initializeSidebarNavigation() {
    $('.sidebar-item').on('click', function (e) {
        e.preventDefault();

        // Remove active class from all items
        $('.sidebar-item').removeClass('active');
        $('.profile-section').removeClass('active');

        // Add active class to clicked item
        $(this).addClass('active');

        // Get target section
        const target = $(this).data('target');

        // Show target section with animation
        $(`#${target}`).addClass('active');

        // Update URL hash without triggering scroll
        history.replaceState(null, null, `#${target}`);
    });
}

function handleInitialHash() {
    // Handle initial hash after everything is loaded
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetItem = $(`.sidebar-item[data-target="${hash}"]`);
        const targetSection = $(`#${hash}`);

        if (targetItem.length && targetSection.length) {
            // Remove active class from all items
            $('.sidebar-item').removeClass('active');
            $('.profile-section').removeClass('active');

            // Add active class to target item
            targetItem.addClass('active');
            targetSection.addClass('active');
        }
    }
}

function initializeProfileForm() {
    $('#editProfileBtn').on('click', function () {
        // Enable form fields
        $('.profile-form-control').prop('readonly', false);
        $('.profile-form-control[type="email"]').prop('readonly', true); // Keep email readonly

        // Show/hide buttons
        $(this).addClass('d-none');
        $('#saveProfileBtn, #cancelProfileBtn').removeClass('d-none');

        // Focus first field
        $('.profile-form-control:not([readonly])').first().focus();
    });

    $('#cancelProfileBtn').on('click', function () {
        // Reset form
        $('.profile-form')[0].reset();

        // Restore original values
        $('input[name="firstName"]').val('Mehmet');
        $('input[name="lastName"]').val('Yılmaz');
        $('input[name="phone"]').val('+90 532 123 45 67');
        $('input[name="city"]').val('İstanbul');

        // Disable form fields
        $('.profile-form-control').prop('readonly', true);

        // Show/hide buttons
        $('#editProfileBtn').removeClass('d-none');
        $('#saveProfileBtn, #cancelProfileBtn').addClass('d-none');
    });

    $('.profile-form').on('submit', function (e) {
        e.preventDefault();

        // Show loading state
        $('#saveProfileBtn').html('<i class="bx bx-loader bx-spin"></i> Kaydediliyor...');

        // Simulate save process
        setTimeout(function () {
            // Disable form fields
            $('.profile-form-control').prop('readonly', true);

            // Show/hide buttons
            $('#editProfileBtn').removeClass('d-none');
            $('#saveProfileBtn, #cancelProfileBtn').addClass('d-none');

            // Reset button text
            $('#saveProfileBtn').html('<i class="bx bx-save"></i> Kaydet');

            // Show success message
            showNotification('Profil bilgileriniz başarıyla güncellendi!', 'success');
        }, 1500);
    });
}

function initializePackageFilters() {
    $('.filter-btn').on('click', function () {
        // Remove active class from all buttons
        $('.filter-btn').removeClass('active');

        // Add active class to clicked button
        $(this).addClass('active');

        // Get filter value
        const filter = $(this).data('filter');

        // Filter table rows
        filterPackageHistory(filter);
    });
}

function filterPackageHistory(filter) {
    $('.history-row').each(function () {
        const row = $(this);
        const status = row.data('status');

        if (filter === 'all' || status === filter) {
            row.show();
        } else {
            row.hide();
        }
    });

    // Add animation
    $('.history-row:visible').each(function (index) {
        $(this).css('animation-delay', `${index * 0.1}s`);
        $(this).addClass('fade-in');
    });
}

function initializeSettingsToggles() {
    $('.toggle-switch input').on('change', function () {
        const toggle = $(this);
        const label = toggle.closest('.setting-toggle').find('.toggle-label');

        if (toggle.is(':checked')) {
            label.text('Açık');
            label.css('color', '#28a745');
        } else {
            label.text('Kapalı');
            label.css('color', '#666');
        }

        // Show notification
        const settingName = toggle.closest('.setting-card').find('h4').text();
        const status = toggle.is(':checked') ? 'açıldı' : 'kapatıldı';
        showNotification(`${settingName} ${status}`, 'info');
    });
}

function initializeSearch() {
    $('.search-input').on('input', function () {
        const searchTerm = $(this).val().toLowerCase();

        $('.history-row').each(function () {
            const row = $(this);
            const countryName = row.find('.country-cell span:last-child').text().toLowerCase();
            const packageName = row.find('.package-info strong').text().toLowerCase();

            if (countryName.includes(searchTerm) || packageName.includes(searchTerm)) {
                row.show();
            } else {
                row.hide();
            }
        });
    });
}

function initializeTooltips() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

function animateProfileStats() {
    const stats = $('.profile-stats .stat-number');

    stats.each(function () {
        const stat = $(this);
        const finalValue = parseInt(stat.text());

        // Animate counter
        $({ counter: 0 }).animate({ counter: finalValue }, {
            duration: 2000,
            easing: 'swing',
            step: function () {
                stat.text(Math.ceil(this.counter));
            },
            complete: function () {
                stat.text(finalValue);
            }
        });
    });
}

// Package Details Modal
function showPackageDetails(packageId) {
    // Sample package data
    const packageData = {
        'TR001': {
            flag: '🇹🇷',
            country: 'Türkiye',
            type: 'Aylık Premium Paket',
            status: 'Aktif',
            dataUsage: '25 GB / 50 GB',
            timeLeft: '15 gün',
            validity: '15 Şub - 15 Mar',
            usagePercent: 50
        },
        'US001': {
            flag: '🇺🇸',
            country: 'Amerika',
            type: 'Haftalık Standart Paket',
            status: 'Aktif',
            dataUsage: '8 GB / 15 GB',
            timeLeft: '3 gün',
            validity: '10 Mar - 17 Mar',
            usagePercent: 53
        },
        'DE001': {
            flag: '🇩🇪',
            country: 'Almanya',
            type: 'Günlük Ekonomik Paket',
            status: 'Süresi Doldu',
            dataUsage: '2 GB / 5 GB',
            timeLeft: 'Süresi doldu',
            validity: '5 Mar - 8 Mar',
            usagePercent: 40
        }
    };

    const data = packageData[packageId];
    if (!data) return;

    // Update modal content
    $('#modalCountryFlag').text(data.flag);
    $('#modalCountryName').text(data.country);
    $('#modalPackageType').text(data.type);
    $('#modalStatus').text(data.status);
    $('#modalDataUsage').text(data.dataUsage);
    $('#modalTimeLeft').text(data.timeLeft);
    $('#modalValidity').text(data.validity);

    // Update status badge class
    const statusBadge = $('#modalStatus');
    statusBadge.removeClass('active expired');
    if (data.status === 'Aktif') {
        statusBadge.addClass('active');
    } else {
        statusBadge.addClass('expired');
    }

    // Update chart
    $('.chart-fill').css('width', `${data.usagePercent}%`);

    // Show modal
    $('#packageDetailsModal').modal('show');
}

// Change Password Modal
function showChangePassword() {
    $('#changePasswordModal').modal('show');
}

$('#changePasswordForm').on('submit', function (e) {
    e.preventDefault();

    const currentPassword = $('input[name="currentPassword"]').val();
    const newPassword = $('input[name="newPassword"]').val();
    const confirmPassword = $('input[name="confirmPassword"]').val();

    // Validation
    if (newPassword !== confirmPassword) {
        showNotification('Yeni şifreler eşleşmiyor!', 'error');
        return;
    }

    if (newPassword.length < 8) {
        showNotification('Yeni şifre en az 8 karakter olmalıdır!', 'error');
        return;
    }

    // Simulate password change
    setTimeout(function () {
        $('#changePasswordModal').modal('hide');
        showNotification('Şifreniz başarıyla değiştirildi!', 'success');

        // Reset form
        $('#changePasswordForm')[0].reset();
    }, 1000);
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = $(`
        <div class="profile-notification ${type}">
            <div class="notification-content">
                <i class="bx ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="bx bx-x"></i>
            </button>
        </div>
    `);

    // Add to page
    $('body').append(notification);

    // Show with animation
    setTimeout(() => {
        notification.addClass('show');
    }, 100);

    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);

    // Close button
    notification.find('.notification-close').on('click', function () {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.removeClass('show');
    setTimeout(() => {
        notification.remove();
    }, 300);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'bx-check-circle';
        case 'error': return 'bx-error-circle';
        case 'warning': return 'bx-error';
        default: return 'bx-info-circle';
    }
}

// Add notification styles dynamically
$('<style>')
    .text(`
        .profile-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            border: 1px solid #e9ecef;
            padding: 15px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            min-width: 300px;
            max-width: 400px;
            z-index: 9999;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .profile-notification.show {
            transform: translateX(0);
            opacity: 1;
        }
        
        .profile-notification.success {
            border-left: 4px solid #28a745;
        }
        
        .profile-notification.error {
            border-left: 4px solid #dc3545;
        }
        
        .profile-notification.warning {
            border-left: 4px solid #ffc107;
        }
        
        .profile-notification.info {
            border-left: 4px solid #17a2b8;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
        }
        
        .notification-content i {
            font-size: 1.2rem;
        }
        
        .profile-notification.success .notification-content i {
            color: #28a745;
        }
        
        .profile-notification.error .notification-content i {
            color: #dc3545;
        }
        
        .profile-notification.warning .notification-content i {
            color: #ffc107;
        }
        
        .profile-notification.info .notification-content i {
            color: #17a2b8;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #666;
            cursor: pointer;
            padding: 5px;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .notification-close:hover {
            background: #f8f9fa;
            color: #333;
        }
        
        .fade-in {
            animation: fadeInUp 0.5s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @media (max-width: 768px) {
            .profile-notification {
                left: 20px;
                right: 20px;
                min-width: auto;
                max-width: none;
            }
        }
    `)
    .appendTo('head');

// Package action handlers
$(document).on('click', '.package-btn-secondary', function () {
    const card = $(this).closest('.package-card');
    const country = card.find('.country-info h4').text();

    // Show loading state
    $(this).html('<i class="bx bx-loader bx-spin"></i> Yenileniyor...');

    // Simulate refresh
    setTimeout(() => {
        $(this).html('<i class="bx bx-refresh"></i> Yenile');
        showNotification(`${country} paketi yenilendi!`, 'success');
    }, 2000);
});

$(document).on('click', '.package-btn-success', function () {
    const card = $(this).closest('.package-card');
    const country = card.find('.country-info h4').text();

    showNotification(`${country} için yeni paket satın alma sayfasına yönlendiriliyorsunuz...`, 'info');

    // Simulate redirect
    setTimeout(() => {
        // In real app, redirect to package purchase page
        console.log('Redirecting to package purchase...');
    }, 1500);
});

// Support button handlers
$(document).on('click', '.support-btn', function () {
    const buttonText = $(this).text().trim();

    if (buttonText.includes('Sohbet Başlat')) {
        showNotification('Canlı destek sohbeti başlatılıyor...', 'info');
        // In real app, open chat widget
    } else if (buttonText.includes('Ara:')) {
        showNotification('Telefon numarası panoya kopyalandı!', 'success');
        // In real app, copy to clipboard
    } else if (buttonText.includes('SSS')) {
        showNotification('Sık Sorulan Sorular sayfasına yönlendiriliyorsunuz...', 'info');
        // In real app, redirect to FAQ
    }
});

// Modal button handlers
$(document).on('click', '.modal-btn-primary', function () {
    const modalId = $(this).closest('.modal').attr('id');

    if (modalId === 'packageDetailsModal') {
        showNotification('Paket yenileme işlemi başlatıldı!', 'info');
    }
});

$(document).on('click', '.modal-btn-secondary', function () {
    const modalId = $(this).closest('.modal').attr('id');

    if (modalId === 'packageDetailsModal') {
        showNotification('QR kod indiriliyor...', 'info');
        // In real app, trigger download
    }
});

// Smooth scrolling for anchor links
$(document).on('click', 'a[href^="#"]', function (e) {
    e.preventDefault();

    const target = $(this.getAttribute('href'));
    if (target.length) {
        $('html, body').animate({
            scrollTop: target.offset().top - 100
        }, 500);
    }
});

// Add loading states for various actions
function addLoadingState(element, originalText, loadingText) {
    element.data('original-text', originalText);
    element.html(loadingText);
    element.prop('disabled', true);
}

function removeLoadingState(element) {
    const originalText = element.data('original-text');
    element.html(originalText);
    element.prop('disabled', false);
}

// Package Detail Page Functions
function initializePackageDetailPage() {
    // Initialize package detail page
    if ($('.package-header').length > 0) {
        initializePackageAnimations();
        initializePurchaseActions();
        initializeSimilarPackages();
        initializeReviews();
        initializeFAQ();
        // initializeStickyCard();
    }
}

function initializePackageAnimations() {
    // Animate package stats on scroll
    const observerOptions = {
        threshold: 0.1,
        triggerOnce: true
    };

    // Coverage stats animation
    if ($('.coverage-stats').length > 0) {
        const coverageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCoverageStats();
                }
            });
        }, observerOptions);

        coverageObserver.observe($('.coverage-stats')[0]);
    }

    // Installation steps animation
    if ($('.installation-steps').length > 0) {
        const stepsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateInstallationSteps();
                }
            });
        }, observerOptions);

        stepsObserver.observe($('.installation-steps')[0]);
    }
}

function animateCoverageStats() {
    $('.coverage-stats .stat-item').each(function (index) {
        const $stat = $(this);

        setTimeout(() => {
            $stat.addClass('fade-in');

            const $number = $stat.find('.stat-info h6');
            const targetValue = $number.text();

            if (targetValue.includes('%')) {
                animateNumber($number, 0, parseInt(targetValue), '%');
            } else if (!isNaN(targetValue)) {
                animateNumber($number, 0, parseInt(targetValue));
            }
        }, index * 200);
    });
}

function animateInstallationSteps() {
    $('.step-item').each(function (index) {
        const $step = $(this);

        setTimeout(() => {
            $step.addClass('fade-in');

            // Add pulse animation to step number
            const $stepNumber = $step.find('.step-number');
            $stepNumber.css('animation', 'pulse 1s ease-in-out');
        }, index * 300);
    });
}

function animateNumber($element, start, end, suffix = '') {
    const duration = 2000;
    const startTime = Date.now();
    const range = end - start;

    function updateNumber() {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = Math.floor(start + (range * progress));
        $element.text(current + suffix);

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }

    updateNumber();
}

function initializePurchaseActions() {
    // Purchase button interactions
    $('.btn-purchase, .btn-buy-now').on('click', function (e) {
        e.preventDefault();

        const $btn = $(this);
        const originalText = $btn.html();

        // Add loading state
        $btn.html('<i class="bx bx-loader bx-spin"></i> İşleniyor...');
        $btn.prop('disabled', true);

        // Simulate purchase process
        setTimeout(() => {
            $btn.html('<i class="bx bx-check"></i> Başarılı!');
            $btn.css('background', 'linear-gradient(135deg, #28a745, #20c997)');

            // Show success modal
            setTimeout(() => {
                $('#purchaseModal').modal('show');

                // Reset button after modal
                setTimeout(() => {
                    $btn.html(originalText);
                    $btn.css('background', '');
                    $btn.prop('disabled', false);
                }, 3000);
            }, 1000);
        }, 2000);
    });

    // Add to cart functionality
    $('.btn-add-cart').on('click', function (e) {
        e.preventDefault();

        const $btn = $(this);
        const originalText = $btn.html();

        $btn.html('<i class="bx bx-loader bx-spin"></i> Ekleniyor...');
        $btn.prop('disabled', true);

        setTimeout(() => {
            $btn.html('<i class="bx bx-check"></i> Sepete Eklendi!');
            $btn.css({
                'background': '#28a745',
                'border-color': '#28a745',
                'color': 'white'
            });

            // Show notification
            showPackageNotification('Paket sepete başarıyla eklendi!', 'success');

            // Reset button
            setTimeout(() => {
                $btn.html(originalText);
                $btn.css({
                    'background': '',
                    'border-color': '',
                    'color': ''
                });
                $btn.prop('disabled', false);
            }, 3000);
        }, 1500);
    });
}

function initializeSimilarPackages() {
    // Similar package interactions
    $('.btn-view-small').on('click', function (e) {
        e.preventDefault();

        const packageName = $(this).closest('.similar-package-item').find('h6').text();
        showPackageNotification(`${packageName} detaylarına yönlendiriliyorsunuz...`, 'info');

        // Simulate navigation
        setTimeout(() => {
            // In real app, navigate to package detail
            console.log('Navigating to:', packageName);
        }, 1500);
    });
}

function initializeReviews() {
    // Review card hover effects
    $('.review-card').on('mouseenter', function () {
        $(this).find('.review-rating i').addClass('bx-tada');
    }).on('mouseleave', function () {
        $(this).find('.review-rating i').removeClass('bx-tada');
    });
}

function initializeFAQ() {
    // FAQ accordion enhancements
    $('.accordion-button').on('click', function () {
        const $button = $(this);
        const $icon = $button.find('i');

        // Add rotation animation to icons if they exist
        if ($icon.length > 0) {
            if ($button.hasClass('collapsed')) {
                $icon.css('transform', 'rotate(180deg)');
            } else {
                $icon.css('transform', 'rotate(0deg)');
            }
        }
    });
}

function initializeStickyCard() {
    // Sticky sidebar functionality
    const $stickyCard = $('.sticky-top');
    const $packageHeader = $('.package-header');

    if ($stickyCard.length > 0 && $packageHeader.length > 0) {
        $(window).on('scroll', function () {
            const scrollTop = $(window).scrollTop();
            const headerHeight = $packageHeader.outerHeight();
            const offset = headerHeight + 100; // Add some offset

            if (scrollTop > offset) {
                $stickyCard.addClass('sticky-active');
            } else {
                $stickyCard.removeClass('sticky-active');
            }
        });
    }
}

function showPackageNotification(message, type = 'info') {
    const notification = $(`
        <div class="package-notification package-notification-${type}">
            <div class="notification-content">
                <i class="${getPackageNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="bx bx-x"></i>
            </button>
        </div>
    `);

    $('body').append(notification);

    // Show notification
    setTimeout(() => {
        notification.addClass('show');
    }, 100);

    // Auto hide after 5 seconds
    setTimeout(() => {
        hidePackageNotification(notification);
    }, 5000);

    // Manual close
    notification.find('.notification-close').on('click', () => {
        hidePackageNotification(notification);
    });
}

function hidePackageNotification(notification) {
    notification.removeClass('show');
    setTimeout(() => {
        notification.remove();
    }, 300);
}

function getPackageNotificationIcon(type) {
    const icons = {
        success: 'bx bx-check-circle',
        error: 'bx bx-error-circle',
        warning: 'bx bx-error-alt',
        info: 'bx bx-info-circle'
    };
    return icons[type] || icons.info;
}

// Flag animation on hover
$(document).on('mouseenter', '.flag-img', function () {
    $(this).css('transform', 'translateY(-5px) scale(1.05)');
}).on('mouseleave', '.flag-img', function () {
    $(this).css('transform', '');
});

// Feature tag interactions
$(document).on('click', '.feature-tag', function () {
    $(this).addClass('pulse');
    setTimeout(() => {
        $(this).removeClass('pulse');
    }, 600);
});

// Support option interactions
$(document).on('click', '.support-option', function (e) {
    e.preventDefault();

    const supportType = $(this).find('span').text();
    showPackageNotification(`${supportType} başlatılıyor...`, 'info');

    // Simulate support action
    setTimeout(() => {
        showPackageNotification(`${supportType} hazır!`, 'success');
    }, 2000);
});

// Add package notification styles
$('<style>')
    .text(`
        .package-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            border: 1px solid #e9ecef;
            padding: 15px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            min-width: 300px;
            max-width: 400px;
            z-index: 9999;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .package-notification.show {
            transform: translateX(0);
            opacity: 1;
        }
        
        .package-notification-success {
            border-left: 4px solid #28a745;
        }
        
        .package-notification-error {
            border-left: 4px solid #dc3545;
        }
        
        .package-notification-warning {
            border-left: 4px solid #ffc107;
        }
        
        .package-notification-info {
            border-left: 4px solid #17a2b8;
        }
        
        .package-notification .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
        }
        
        .package-notification-success .notification-content i {
            color: #28a745;
        }
        
        .package-notification-error .notification-content i {
            color: #dc3545;
        }
        
        .package-notification-warning .notification-content i {
            color: #ffc107;
        }
        
        .package-notification-info .notification-content i {
            color: #17a2b8;
        }
        
        .package-notification .notification-close {
            background: none;
            border: none;
            color: #666;
            cursor: pointer;
            padding: 5px;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .package-notification .notification-close:hover {
            background: #f8f9fa;
            color: #333;
        }
        
        .sticky-active {
            position: fixed !important;
            top: 120px !important;
            width: calc(33.333333% - 30px) !important;
            z-index: 100;
        }
        
        @media (max-width: 991px) {
            .sticky-active {
                position: static !important;
                width: 100% !important;
            }
        }
        
        @media (max-width: 768px) {
            .package-notification {
                left: 20px;
                right: 20px;
                min-width: auto;
                max-width: none;
            }
        }
    `)
    .appendTo('head');

// Initialize package detail page when DOM is ready
$(document).ready(function () {
    initializePackageDetailPage();
});

// ===== CART PAGE FUNCTIONS =====

// Cart data structure
let cartData = {
    items: [
        {
            id: 1,
            country: "🇹🇷",
            title: "Türkiye Premium 30GB",
            description: "30 gün geçerli • 5G destekli • Sınırsız arama",
            originalPrice: 299,
            currentPrice: 199,
            quantity: 1,
            features: ["Anında Aktivasyon", "Güvenli"]
        },
        {
            id: 2,
            country: "🇺🇸",
            title: "Amerika Mega 50GB",
            description: "30 gün geçerli • 5G destekli • Hotspot özelliği",
            originalPrice: 450,
            currentPrice: 399,
            quantity: 2,
            features: ["Yüksek Hız", "Hotspot"]
        },
        {
            id: 3,
            country: "🇩🇪",
            title: "Almanya Express 20GB",
            description: "15 gün geçerli • 4G/5G hızında • Roaming dahil",
            originalPrice: 280,
            currentPrice: 230,
            quantity: 1,
            features: ["15 Gün", "EU Roaming"]
        }
    ],
    discountAmount: 200,
    taxRate: 0.18,
    promoCodes: {
        'ILKKEZ20': { discount: 0.20, description: 'İlk kez %20 indirim' },
        'YENI15': { discount: 0.15, description: 'Yeni müşteri %15 indirim' },
        'GLOBAL10': { discount: 0.10, description: 'Global paket %10 indirim' }
    },
    appliedPromo: null
};

// Initialize cart page
function initializeCartPage() {
    initializeCartEvents();
    updateCartSummary();
    initializeTooltips();

    // Initial animations
    setTimeout(() => {
        $('.cart-item').each(function (index) {
            $(this).addClass('cart-item-add').css('animation-delay', (index * 100) + 'ms');
        });
    }, 100);
}

// Initialize cart events
function initializeCartEvents() {
    // Quantity change events
    $(document).on('click', '.quantity-btn', function () {
        const action = $(this).data('action');
        const cartItem = $(this).closest('.cart-item');
        const quantityInput = cartItem.find('.quantity-input');
        const itemId = cartItem.index();

        handleQuantityChange(action, quantityInput, itemId);
    });

    // Direct quantity input change
    $(document).on('change', '.quantity-input', function () {
        const cartItem = $(this).closest('.cart-item');
        const itemId = cartItem.index();
        const newQuantity = parseInt($(this).val()) || 1;

        if (newQuantity < 1) {
            $(this).val(1);
            return;
        }

        if (newQuantity > 10) {
            $(this).val(10);
            showCartNotification('Maksimum 10 adet sipariş verebilirsiniz.', 'warning');
            return;
        }

        cartData.items[itemId].quantity = newQuantity;
        updateCartSummary();
        animateQuantityChange($(this));
    });

    // Remove item events
    $(document).on('click', '.cart-remove-btn', function () {
        const cartItem = $(this).closest('.cart-item');
        const itemId = cartItem.index();

        removeCartItem(cartItem, itemId);
    });

    // Promo code events
    $('#applyPromo').on('click', function () {
        applyPromoCode();
    });

    $('#promoCode').on('keypress', function (e) {
        if (e.which === 13) {
            applyPromoCode();
        }
    });

    // Checkout events
    $('#proceedToCheckout').on('click', function () {
        $('#checkoutModal').modal('show');
    });

    $('#completePayment').on('click', function () {
        processPayment();
    });

    // Recommendation add events
    $(document).on('click', '.rec-add-btn', function () {
        const recItem = $(this).closest('.recommendation-item');
        addRecommendedItem(recItem);
    });

    // Form validation
    $('#checkoutForm input').on('input', function () {
        validateCheckoutForm();
    });

    // Card number formatting
    $('#cardNumber').on('input', function () {
        formatCardNumber($(this));
    });

    // Expiry date formatting
    $('#expiryDate').on('input', function () {
        formatExpiryDate($(this));
    });

    // CVV formatting
    $('#cvv').on('input', function () {
        formatCVV($(this));
    });
}

// Handle quantity changes
function handleQuantityChange(action, quantityInput, itemId) {
    let currentQuantity = parseInt(quantityInput.val()) || 1;

    if (action === 'increase' && currentQuantity < 10) {
        currentQuantity++;
    } else if (action === 'decrease' && currentQuantity > 1) {
        currentQuantity--;
    } else if (action === 'increase' && currentQuantity >= 10) {
        showCartNotification('Maksimum 10 adet sipariş verebilirsiniz.', 'warning');
        return;
    } else if (action === 'decrease' && currentQuantity <= 1) {
        return;
    }

    quantityInput.val(currentQuantity);
    cartData.items[itemId].quantity = currentQuantity;

    updateCartSummary();
    animateQuantityChange(quantityInput);

    // Update item total with animation
    const cartItem = quantityInput.closest('.cart-item');
    const priceElement = cartItem.find('.current-price');
    priceElement.addClass('cart-price-update');

    setTimeout(() => {
        priceElement.removeClass('cart-price-update');
    }, 800);
}

// Remove cart item
function removeCartItem(cartItem, itemId) {
    const itemTitle = cartData.items[itemId].title;

    // Show confirmation
    if (confirm(`"${itemTitle}" sepetinizden kaldırılsın mı?`)) {
        // Add remove animation
        cartItem.addClass('cart-item-remove');

        setTimeout(() => {
            // Remove from data
            cartData.items.splice(itemId, 1);

            // Remove from DOM
            cartItem.remove();

            // Update summary
            updateCartSummary();
            updateCartCount();

            // Show notification
            showCartNotification(`${itemTitle} sepetinizden kaldırıldı.`, 'info');

            // Check if cart is empty
            if (cartData.items.length === 0) {
                showEmptyCart();
            }
        }, 500);
    }
}

// Update cart summary
function updateCartSummary() {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const tax = calculateTax(subtotal - discount);
    const total = subtotal - discount + tax;

    // Update summary display
    $('.cart-subtotal').text('₺' + subtotal.toFixed(0));
    $('.cart-discount').text('-₺' + discount.toFixed(0));
    $('.cart-tax').text('₺' + tax.toFixed(0));
    $('.cart-total').text('₺' + total.toFixed(0));

    // Update checkout button
    $('.checkout-amount').text('₺' + total.toFixed(0));

    // Update modal summary
    updateModalSummary(total);
}

// Calculate subtotal
function calculateSubtotal() {
    return cartData.items.reduce((sum, item) => {
        return sum + (item.currentPrice * item.quantity);
    }, 0);
}

// Calculate discount
function calculateDiscount() {
    let discount = cartData.discountAmount;

    if (cartData.appliedPromo) {
        const subtotal = calculateSubtotal();
        const promoDiscount = subtotal * cartData.appliedPromo.discount;
        discount += promoDiscount;
    }

    return discount;
}

// Calculate tax
function calculateTax(taxableAmount) {
    return taxableAmount * cartData.taxRate;
}

// Update cart count
function updateCartCount() {
    const totalItems = cartData.items.reduce((sum, item) => sum + item.quantity, 0);
    $('.cart-count').text(totalItems + ' ürün');
}

// Apply promo code
function applyPromoCode() {
    const promoCode = $('#promoCode').val().trim().toUpperCase();
    const messageElement = $('.promo-message');

    if (!promoCode) {
        messageElement.text('Lütfen bir promosyon kodu girin.').removeClass('success').addClass('error');
        return;
    }

    if (cartData.promoCodes[promoCode]) {
        if (cartData.appliedPromo && cartData.appliedPromo.code === promoCode) {
            messageElement.text('Bu kod zaten uygulanmış.').removeClass('success').addClass('error');
            return;
        }

        cartData.appliedPromo = {
            code: promoCode,
            ...cartData.promoCodes[promoCode]
        };

        updateCartSummary();

        const discountPercent = (cartData.appliedPromo.discount * 100).toFixed(0);
        messageElement.text(`✓ ${cartData.appliedPromo.description} uygulandı!`).removeClass('error').addClass('success');

        showCartNotification(`Promosyon kodu uygulandı! %${discountPercent} indirim`, 'success');

        // Disable input and button
        $('#promoCode').prop('disabled', true);
        $('#applyPromo').text('Uygulandı').prop('disabled', true);

    } else {
        messageElement.text('Geçersiz promosyon kodu.').removeClass('success').addClass('error');
        showCartNotification('Geçersiz promosyon kodu.', 'error');
    }
}

// Add recommended item
function addRecommendedItem(recItem) {
    const flag = recItem.find('.rec-flag').text();
    const title = recItem.find('h6').text();
    const price = parseInt(recItem.find('p').text().replace('₺', ''));

    // Create new item
    const newItem = {
        id: Date.now(),
        country: flag,
        title: title,
        description: "15 gün geçerli • 4G/5G hızında",
        originalPrice: price + 50,
        currentPrice: price,
        quantity: 1,
        features: ["Anında Aktivasyon", "Güvenli"]
    };

    // Check if item already exists
    const existingItem = cartData.items.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity++;
        showCartNotification(`${title} miktarı artırıldı.`, 'info');
    } else {
        cartData.items.push(newItem);
        showCartNotification(`${title} sepete eklendi.`, 'success');

        // Add to DOM
        addItemToDOM(newItem);
    }

    updateCartSummary();
    updateCartCount();

    // Animation for button
    const btn = recItem.find('.rec-add-btn');
    btn.addClass('btn-success').html('<i class="bx bx-check"></i>');

    setTimeout(() => {
        btn.removeClass('btn-success').html('<i class="bx bx-plus"></i>');
    }, 1500);
}

// Add item to DOM
function addItemToDOM(item) {
    const itemHTML = `
        <div class="cart-item cart-item-add" data-aos="fade-up">
            <div class="cart-item-image">
                <div class="country-flag">${item.country}</div>
            </div>
            <div class="cart-item-details">
                <h5 class="cart-item-title">${item.title}</h5>
                <p class="cart-item-desc">${item.description}</p>
                <div class="cart-item-features">
                    ${item.features.map(feature => `<span class="cart-feature-badge"><i class='bx bx-zap'></i> ${feature}</span>`).join('')}
                </div>
            </div>
            <div class="cart-item-controls">
                <div class="cart-quantity">
                    <button class="quantity-btn minus" data-action="decrease">
                        <i class='bx bx-minus'></i>
                    </button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="10">
                    <button class="quantity-btn plus" data-action="increase">
                        <i class='bx bx-plus'></i>
                    </button>
                </div>
                <div class="cart-item-price">
                    <span class="original-price">₺${item.originalPrice}</span>
                    <span class="current-price">₺${item.currentPrice}</span>
                </div>
                <button class="cart-remove-btn" data-bs-toggle="tooltip" title="Sepetten Kaldır">
                    <i class='bx bx-trash'></i>
                </button>
            </div>
        </div>
    `;

    $('.cart-continue-shopping').before(itemHTML);
    initializeTooltips();
}

// Process payment
function processPayment() {
    const form = $('#checkoutForm')[0];

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Show loading state
    const btn = $('#completePayment');
    const originalText = btn.html();
    btn.html('<i class="bx bx-loader-alt bx-spin"></i> İşleniyor...').prop('disabled', true);

    // Simulate payment processing
    setTimeout(() => {
        // Hide checkout modal
        $('#checkoutModal').modal('hide');

        // Show success modal
        setTimeout(() => {
            $('#successModal').modal('show');
        }, 500);

        // Reset button
        btn.html(originalText).prop('disabled', false);

        // Clear cart after successful payment
        setTimeout(() => {
            clearCart();
        }, 3000);

    }, 2000);
}

// Show empty cart
function showEmptyCart() {
    const emptyHTML = `
        <div class="empty-cart text-center" data-aos="fade-up">
            <div class="empty-cart-icon">
                <i class='bx bx-shopping-bag'></i>
            </div>
            <h3>Sepetiniz Boş</h3>
            <p>Henüz sepetinize ürün eklememişsiniz.</p>
            <a href="index.html" class="btn btn-primary btn-lg">
                <i class='bx bx-arrow-back'></i>
                Alışverişe Başla
            </a>
        </div>
        <style>
        .empty-cart-icon {
            width: 120px;
            height: 120px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 30px;
        }
        .empty-cart-icon i {
            font-size: 4rem;
            color: white;
        }
        .empty-cart h3 {
            color: #333;
            margin-bottom: 15px;
        }
        .empty-cart p {
            color: #666;
            margin-bottom: 30px;
        }
        </style>
    `;

    $('.cart-header').after(emptyHTML);
    $('.cart-summary').hide();
}

// Clear cart
function clearCart() {
    cartData.items = [];
    cartData.appliedPromo = null;
    $('.cart-item').remove();
    showEmptyCart();
}

// Update modal summary
function updateModalSummary(total) {
    let modalHTML = '';
    cartData.items.forEach(item => {
        const itemTotal = item.currentPrice * item.quantity;
        modalHTML += `
            <div class="checkout-item">
                <span>${item.country} ${item.title} (x${item.quantity})</span>
                <span>₺${itemTotal}</span>
            </div>
        `;
    });

    $('.checkout-items').html(modalHTML);
    $('.checkout-total').html(`<strong>Toplam: ₺${total.toFixed(0)}</strong>`);
}

// Animation helpers
function animateQuantityChange(element) {
    element.addClass('cart-quantity-change');
    setTimeout(() => {
        element.removeClass('cart-quantity-change');
    }, 300);
}

// Notification system
function showCartNotification(message, type = 'info') {
    const icons = {
        success: 'bx-check-circle',
        error: 'bx-error-circle',
        warning: 'bx-error',
        info: 'bx-info-circle'
    };

    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };

    const notification = $(`
        <div class="cart-notification ${type}" style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        ">
            <i class='bx ${icons[type]}'></i>
            ${message}
        </div>
    `);

    $('body').append(notification);

    setTimeout(() => {
        notification.css('transform', 'translateX(0)');
    }, 100);

    setTimeout(() => {
        notification.css('transform', 'translateX(100%)');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Form validation and formatting
function validateCheckoutForm() {
    const form = $('#checkoutForm')[0];
    const btn = $('#completePayment');

    if (form.checkValidity()) {
        btn.prop('disabled', false);
    } else {
        btn.prop('disabled', true);
    }
}

function formatCardNumber(input) {
    let value = input.val().replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;

    if (formattedValue.length > 19) {
        formattedValue = formattedValue.substr(0, 19);
    }

    input.val(formattedValue);
}

function formatExpiryDate(input) {
    let value = input.val().replace(/\D/g, '');

    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }

    input.val(value);
}

function formatCVV(input) {
    let value = input.val().replace(/\D/g, '');

    if (value.length > 3) {
        value = value.substring(0, 3);
    }

    input.val(value);
}

// Initialize tooltips
function initializeTooltips() {
    if (typeof bootstrap !== 'undefined') {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}

// Cart utility functions
function getCartItemCount() {
    return cartData.items.reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const tax = calculateTax(subtotal - discount);
    return subtotal - discount + tax;
}

function isCartEmpty() {
    return cartData.items.length === 0;
}

// Export cart functions for use in other pages
window.cartFunctions = {
    addToCart: function (item) {
        cartData.items.push(item);
        updateCartSummary();
        updateCartCount();
        showCartNotification(`${item.title} sepete eklendi.`, 'success');
    },
    getCartCount: getCartItemCount,
    getCartTotal: getCartTotal,
    isCartEmpty: isCartEmpty
};

// ===== CART FINISH PAGE FUNCTIONS =====

// Order data structure
let orderData = {
    orderNumber: '#ESM-2025-001',
    orderDate: '15 Ocak 2025, 14:30',
    customerEmail: 'ornek@email.com',
    items: [
        {
            id: 1,
            country: '🇹🇷',
            title: 'Türkiye Premium 30GB',
            description: '30 gün geçerli • 5G destekli',
            quantity: 1,
            price: 199,
            qrCode: 'turkey-qr-code-data',
            activationTime: '30 saniye',
            coverage: '%98 nüfus'
        },
        {
            id: 2,
            country: '🇺🇸',
            title: 'Amerika Mega 50GB',
            description: '30 gün geçerli • Hotspot özelliği',
            quantity: 2,
            price: 399,
            qrCode: 'usa-qr-code-data',
            activationTime: '45 saniye',
            coverage: '10GB hotspot'
        },
        {
            id: 3,
            country: '🇩🇪',
            title: 'Almanya Express 20GB',
            description: '15 gün geçerli • EU Roaming',
            quantity: 1,
            price: 230,
            qrCode: 'germany-qr-code-data',
            activationTime: '30 saniye',
            coverage: '28 ülke'
        }
    ],
    subtotal: 1227,
    discount: 200,
    tax: 185,
    total: 1212,
    paymentMethod: 'Kredi Kartı',
    paymentStatus: 'Başarılı',
    transactionId: 'TXN-2025-001',
    bankName: 'Garanti BBVA'
};

// Initialize cart finish page
function initializeCartFinishPage() {
    initializeCartFinishEvents();
    startSuccessAnimations();
    updateOrderDisplay();
    initializeTooltips();

    // Auto-scroll to top
    window.scrollTo(0, 0);

    // Show success notification after page load
    setTimeout(() => {
        showCartFinishNotification('Siparişiniz başarıyla tamamlandı! E-posta kontrolünüzü unutmayın.', 'success');
    }, 2000);
}

// Initialize cart finish events
function initializeCartFinishEvents() {
    // QR code download events
    $(document).on('click', '.btn-download', function () {
        const qrType = $(this).data('qr');
        downloadQRCode(qrType);
    });

    // QR code share events
    $(document).on('click', '.btn-share', function () {
        const qrType = $(this).data('qr');
        shareQRCode(qrType);
    });

    // Email resend event
    $('#resendEmail').on('click', function () {
        resendOrderEmail();
    });

    // Print order event
    $('#printOrder').on('click', function () {
        printOrderDetails();
    });

    // Support button events
    $(document).on('click', '.support-btn', function () {
        const supportType = $(this).text().trim();
        handleSupportAction(supportType);
    });

    // QR code hover effects
    $('.qr-code-card').on('mouseenter', function () {
        $(this).find('.qr-pattern').addClass('qr-hover-effect');
    }).on('mouseleave', function () {
        $(this).find('.qr-pattern').removeClass('qr-hover-effect');
    });

    // Installation step tracking
    trackInstallationSteps();
}

// Start success animations
function startSuccessAnimations() {
    // Animate success particles
    setTimeout(() => {
        $('.particle').each(function (index) {
            $(this).css('animation-delay', (index * 0.2) + 's');
        });
    }, 1000);

    // Animate QR codes with delay
    setTimeout(() => {
        $('.qr-code-card').each(function (index) {
            $(this).addClass('cart-finish-slide-up').css('animation-delay', (index * 0.1) + 's');
        });
    }, 1500);

    // Animate installation steps
    setTimeout(() => {
        $('.step-card').each(function (index) {
            $(this).addClass('cart-finish-fade-in').css('animation-delay', (index * 0.2) + 's');
        });
    }, 2000);
}

// Update order display
function updateOrderDisplay() {
    // Update order info
    $('.order-number strong').text(orderData.orderNumber);
    $('.order-date strong').text(orderData.orderDate);

    // Update email address
    $('.email-content p strong').text(orderData.customerEmail);

    // Update totals
    $('.summary-totals .total-row:contains("Ara Toplam:") span:last-child').text('₺' + orderData.subtotal);
    $('.summary-totals .total-row:contains("İndirim:") span:last-child').text('-₺' + orderData.discount);
    $('.summary-totals .total-row:contains("KDV") span:last-child').text('₺' + orderData.tax);
    $('.summary-totals .total-row.final span:last-child').text('₺' + orderData.total);

    // Update payment info
    $('.method-details span').text('**** **** **** 1234');
    $('.detail-item:contains("İşlem Tarihi:") span:last-child').text(orderData.orderDate);
    $('.detail-item:contains("İşlem No:") span:last-child').text(orderData.transactionId);
    $('.detail-item:contains("Banka:") span:last-child').text(orderData.bankName);
}

// Download QR code
function downloadQRCode(qrType) {
    const qrData = orderData.items.find(item =>
        item.qrCode.includes(qrType) ||
        item.country.includes(getCountryFromType(qrType))
    );

    if (!qrData) {
        showCartFinishNotification('QR kod bulunamadı.', 'error');
        return;
    }

    // Show loading state
    const btn = $(`.btn-download[data-qr="${qrType}"]`);
    const originalText = btn.html();
    btn.html('<i class="bx bx-loader-alt bx-spin"></i> İndiriliyor...');

    // Simulate download process
    setTimeout(() => {
        // Create download link (in real app, this would be actual QR code image)
        const link = document.createElement('a');
        link.href = generateQRCodeDataURL(qrData);
        link.download = `${qrData.title.replace(/\s+/g, '_')}_QR.png`;

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Reset button
        btn.html(originalText);

        // Show success message
        showCartFinishNotification(`${qrData.title} QR kodu indirildi.`, 'success');

        // Add download animation
        btn.closest('.qr-code-card').addClass('download-success');
        setTimeout(() => {
            btn.closest('.qr-code-card').removeClass('download-success');
        }, 2000);

    }, 1500);
}

// Share QR code
function shareQRCode(qrType) {
    const qrData = orderData.items.find(item =>
        item.qrCode.includes(qrType) ||
        item.country.includes(getCountryFromType(qrType))
    );

    if (!qrData) {
        showCartFinishNotification('QR kod bulunamadı.', 'error');
        return;
    }

    // Check if Web Share API is supported
    if (navigator.share) {
        navigator.share({
            title: `${qrData.title} eSIM QR Kodu`,
            text: `${qrData.title} eSIM paketiniz için QR kod`,
            url: window.location.href
        }).then(() => {
            showCartFinishNotification('QR kod paylaşıldı.', 'success');
        }).catch((error) => {
            console.log('Paylaşım iptal edildi:', error);
        });
    } else {
        // Fallback: Copy to clipboard
        const shareText = `${qrData.title} eSIM QR Kodu: ${window.location.href}`;

        navigator.clipboard.writeText(shareText).then(() => {
            showCartFinishNotification('QR kod bağlantısı panoya kopyalandı.', 'success');
        }).catch(() => {
            showCartFinishNotification('Paylaşım desteklenmiyor.', 'error');
        });
    }
}

// Resend order email
function resendOrderEmail() {
    const btn = $('#resendEmail');
    const originalText = btn.html();

    // Show loading state
    btn.html('<i class="bx bx-loader-alt bx-spin"></i> Gönderiliyor...').prop('disabled', true);

    // Simulate email sending
    setTimeout(() => {
        // Reset button
        btn.html(originalText).prop('disabled', false);

        // Show success message
        showCartFinishNotification(`E-posta ${orderData.customerEmail} adresine tekrar gönderildi.`, 'success');

        // Add email sent animation
        $('.email-confirmation-card').addClass('email-sent-animation');
        setTimeout(() => {
            $('.email-confirmation-card').removeClass('email-sent-animation');
        }, 2000);

    }, 2000);
}

// Print order details
function printOrderDetails() {
    // Create print content
    const printContent = generatePrintContent();

    // Open print window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();

    // Focus and print
    printWindow.focus();
    printWindow.print();

    // Close print window after printing
    printWindow.onafterprint = () => {
        printWindow.close();
    };

    showCartFinishNotification('Yazdırma penceresi açıldı.', 'info');
}

// Generate print content
function generatePrintContent() {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Sipariş Detayları - ${orderData.orderNumber}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .order-info { margin-bottom: 20px; }
                .items { margin-bottom: 20px; }
                .item { border-bottom: 1px solid #ddd; padding: 10px 0; }
                .totals { margin-top: 20px; }
                .qr-placeholder { width: 100px; height: 100px; border: 2px dashed #ccc; display: inline-block; margin: 10px; }
                @media print { body { margin: 0; } }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>eSIM Türkiye</h1>
                <h2>Sipariş Detayları</h2>
            </div>
            
            <div class="order-info">
                <p><strong>Sipariş No:</strong> ${orderData.orderNumber}</p>
                <p><strong>Tarih:</strong> ${orderData.orderDate}</p>
                <p><strong>E-posta:</strong> ${orderData.customerEmail}</p>
            </div>
            
            <div class="items">
                <h3>Sipariş Edilen Ürünler</h3>
                ${orderData.items.map(item => `
                    <div class="item">
                        <p><strong>${item.country} ${item.title}</strong></p>
                        <p>Miktar: ${item.quantity} - Fiyat: ₺${item.price}</p>
                        <p>${item.description}</p>
                        <div class="qr-placeholder">QR Kod</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="totals">
                <p>Ara Toplam: ₺${orderData.subtotal}</p>
                <p>İndirim: -₺${orderData.discount}</p>
                <p>KDV: ₺${orderData.tax}</p>
                <p><strong>Toplam: ₺${orderData.total}</strong></p>
            </div>
            
            <div class="payment-info">
                <h3>Ödeme Bilgileri</h3>
                <p>Ödeme Yöntemi: ${orderData.paymentMethod}</p>
                <p>Durum: ${orderData.paymentStatus}</p>
                <p>İşlem No: ${orderData.transactionId}</p>
            </div>
        </body>
        </html>
    `;
}

// Handle support actions
function handleSupportAction(supportType) {
    const btn = $(event.target);
    const originalText = btn.html();

    if (supportType.includes('Sohbet')) {
        // Open chat widget
        btn.html('<i class="bx bx-loader-alt bx-spin"></i> Bağlanıyor...');

        setTimeout(() => {
            btn.html(originalText);
            showCartFinishNotification('Canlı destek sohbeti başlatıldı.', 'success');
            // In real app, this would open chat widget
        }, 1000);

    } else if (supportType.includes('0 850')) {
        // Copy phone number
        navigator.clipboard.writeText('08505320000').then(() => {
            showCartFinishNotification('Telefon numarası panoya kopyalandı.', 'success');
        });

    } else if (supportType.includes('Video')) {
        // Open video tutorials
        btn.html('<i class="bx bx-loader-alt bx-spin"></i> Yükleniyor...');

        setTimeout(() => {
            btn.html(originalText);
            showCartFinishNotification('Video rehber sayfası açılıyor.', 'info');
            // In real app, this would open video page
        }, 1000);
    }
}

// Track installation steps
function trackInstallationSteps() {
    // Add click tracking to steps
    $('.step-card').on('click', function () {
        const stepNumber = $(this).find('.step-number').text();

        // Add active state
        $(this).addClass('step-active');

        // Track step interaction
        console.log(`Installation step ${stepNumber} clicked`);

        // Show step details
        showStepDetails(stepNumber);

        setTimeout(() => {
            $(this).removeClass('step-active');
        }, 3000);
    });
}

// Show step details
function showStepDetails(stepNumber) {
    const stepDetails = {
        '1': {
            title: 'QR Kod Okutma Detayları',
            content: 'Telefonunuzun kamerası ile QR kodu okutun. iOS ve Android cihazlarda farklı menüler kullanılır.',
            tips: ['Wi-Fi bağlantısı gereklidir', 'Kamera izni verilmelidir', 'QR kod net görünmelidir']
        },
        '2': {
            title: 'eSIM Aktivasyon Süreci',
            content: 'eSIM profili otomatik olarak indirilir ve cihazınıza kurulur. Bu işlem 30-60 saniye sürer.',
            tips: ['İnternet bağlantısını kesmeyin', 'Telefonunuzu kapatmayın', 'Sabırlı olun']
        },
        '3': {
            title: 'Kullanıma Başlama',
            content: 'eSIM kurulduktan sonra veri planınızı aktif edin ve internet kullanımına başlayın.',
            tips: ['Şebeke ayarları otomatik', 'Veri planını kontrol edin', 'Sorun varsa desteğe başvurun']
        }
    };

    const step = stepDetails[stepNumber];
    if (step) {
        showStepModal(step);
    }
}

// Show step modal
function showStepModal(step) {
    const modalHTML = `
        <div class="modal fade" id="stepModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${step.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <p>${step.content}</p>
                        <ul class="step-tips-list">
                            ${step.tips.map(tip => `<li><i class="bx bx-check-circle"></i> ${tip}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Anladım</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal
    $('#stepModal').remove();

    // Add new modal
    $('body').append(modalHTML);

    // Show modal
    $('#stepModal').modal('show');

    // Remove modal after hide
    $('#stepModal').on('hidden.bs.modal', function () {
        $(this).remove();
    });
}

// Utility functions
function getCountryFromType(type) {
    const countryMap = {
        'turkey': '🇹🇷',
        'usa': '🇺🇸',
        'germany': '🇩🇪'
    };
    return countryMap[type] || '';
}

function generateQRCodeDataURL(qrData) {
    // In real app, this would generate actual QR code image
    // For demo, return a placeholder data URL
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');

    // Draw QR code pattern
    ctx.fillStyle = '#667eea';
    ctx.fillRect(0, 0, 200, 200);

    ctx.fillStyle = 'white';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(qrData.title, 100, 100);

    return canvas.toDataURL('image/png');
}

// Notification system for cart finish
function showCartFinishNotification(message, type = 'info') {
    const icons = {
        success: 'bx-check-circle',
        error: 'bx-error-circle',
        warning: 'bx-error',
        info: 'bx-info-circle'
    };

    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };

    const notification = $(`
        <div class="cart-finish-notification ${type}" style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 350px;
        ">
            <i class='bx ${icons[type]}'></i>
            <span>${message}</span>
        </div>
    `);

    $('body').append(notification);

    setTimeout(() => {
        notification.css('transform', 'translateX(0)');
    }, 100);

    setTimeout(() => {
        notification.css('transform', 'translateX(100%)');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Initialize tooltips for cart finish
function initializeCartFinishTooltips() {
    if (typeof bootstrap !== 'undefined') {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}

// Add CSS animations dynamically
function addCartFinishAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        .qr-hover-effect {
            animation: qrHover 0.3s ease !important;
        }
        
        @keyframes qrHover {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .download-success {
            animation: downloadSuccess 2s ease !important;
        }
        
        @keyframes downloadSuccess {
            0% { background-color: rgba(255, 255, 255, 0.9); }
            50% { background-color: rgba(40, 167, 69, 0.1); }
            100% { background-color: rgba(255, 255, 255, 0.9); }
        }
        
        .email-sent-animation {
            animation: emailSent 2s ease !important;
        }
        
        @keyframes emailSent {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
        
        .step-active {
            animation: stepActive 3s ease !important;
        }
        
        @keyframes stepActive {
            0% { background-color: rgba(255, 255, 255, 0.9); }
            50% { background-color: rgba(102, 126, 234, 0.1); }
            100% { background-color: rgba(255, 255, 255, 0.9); }
        }
        
        .step-tips-list {
            list-style: none;
            padding: 0;
        }
        
        .step-tips-list li {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
            color: #28a745;
        }
        
        .step-tips-list i {
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(style);
}

// Auto-initialize animations when page loads
$(document).ready(function () {
    addCartFinishAnimations();
});

// Export cart finish functions
window.cartFinishFunctions = {
    downloadQRCode: downloadQRCode,
    shareQRCode: shareQRCode,
    resendEmail: resendOrderEmail,
    printOrder: printOrderDetails,
    showNotification: showCartFinishNotification
};

// Language Selection Functionality
function initializeLanguageSelector() {
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageText = document.querySelector('.language-text');
    const languageItems = document.querySelectorAll('.language-item');

    if (languageDropdown && languageText && languageItems.length > 0) {
        // Language selection handler
        languageItems.forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault();

                // Remove active class from all items
                languageItems.forEach(i => i.classList.remove('active'));

                // Add active class to clicked item
                this.classList.add('active');

                // Update language text
                const selectedLang = this.getAttribute('data-lang');
                const langMap = {
                    'tr': 'TR',
                    'en': 'EN',
                    'ar': 'AR'
                };

                languageText.textContent = langMap[selectedLang] || 'TR';

                // Store selected language in localStorage
                localStorage.setItem('selectedLanguage', selectedLang);

                // Show notification
                showLanguageNotification(this.querySelector('span').textContent);

                // Here you can add actual language switching logic
                console.log('Language changed to:', selectedLang);
            });
        });

        // Load saved language preference
        const savedLang = localStorage.getItem('selectedLanguage') || 'tr';
        const savedItem = document.querySelector(`.language-item[data-lang="${savedLang}"]`);

        if (savedItem) {
            languageItems.forEach(i => i.classList.remove('active'));
            savedItem.classList.add('active');

            const langMap = {
                'tr': 'TR',
                'en': 'EN',
                'ar': 'AR'
            };
            languageText.textContent = langMap[savedLang] || 'TR';
        }
    }
}

// Language notification function
function showLanguageNotification(languageName) {
    // Remove existing notification
    const existingNotification = document.querySelector('.language-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'language-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class='bx bx-check-circle'></i>
            <span>Dil değiştirildi: ${languageName}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        font-weight: 500;
    `;

    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 8px;
    `;

    notification.querySelector('i').style.cssText = `
        font-size: 18px;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Animate out and remove
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Initialize language selector when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    initializeLanguageSelector();
});