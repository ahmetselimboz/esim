$(document).ready(function () {
    // Hover ile fade/slide animasyonu
    $('.dropdown').hover(
        function () {
            $(this).find('.dropdown-menu')
                .stop(true, true)
                .css({ display: 'block' })
                .animate({ opacity: 1, top: "100%" }, 250);
        },
        function () {
            $(this).find('.dropdown-menu')
                .stop(true, true)
                .animate({ opacity: 0, top: "90%" }, 200, function () {
                    $(this).css("display", "none");
                });
        }
    );
});

AOS.init();

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