AOS.init({
    duration: 800,
    once: true
});

$(document).ready(function () {

    // Smooth scrolling for anchor links
    $('a[href^="#"]:not([href="#"])').on('click', function (event) {
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

        // Smooth scroll to top of content
        $('html, body').animate({
            scrollTop: $('.profile-content').offset().top - 100
        }, 500);

        // Update URL hash
        window.location.hash = target;
    });

    // Handle initial hash
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetItem = $(`.sidebar-item[data-target="${hash}"]`);
        if (targetItem.length) {
            targetItem.trigger('click');
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