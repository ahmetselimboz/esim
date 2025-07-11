$(document).ready(function () {
    // Navbar scroll effect
    let lastScrollTop = 0;
    let scrollThreshold = 100;

    // $(window).scroll(function () {
    //     let scrollTop = $(this).scrollTop();

    //     if (scrollTop > scrollThreshold) {
    //         if (scrollTop > lastScrollTop) {
    //             // Scrolling down
    //             $('.navbar-area').addClass('navbar-scrolled');
    //         } else {
    //             // Scrolling up
    //             $('.navbar-area').removeClass('navbar-scrolled');
    //         }
    //     } else {
    //         // At top
    //         $('.navbar-area').removeClass('navbar-scrolled');
    //     }

    //     lastScrollTop = scrollTop;
    // });

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
// AOS başlatma
AOS.init();

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