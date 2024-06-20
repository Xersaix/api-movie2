var swiper = new Swiper('.swiper', {
    speed: 400,
    slidesPerView: 2,
    loop: false,
    spaceBetween: 5,
    calculateHeight: true,
    autoHeight: true,



    breakpoints: {
        // when window width is >= 320px
        320: {
            speed: 400,
            slidesPerView: 2,
            spaceBetween: 5,
        },

        // when window width is >= 640px
        640: {
            slidesPerView: 4,
            spaceBetween: 5
        },
        // when window width is >= 1024px
        1024: {
            slidesPerView: 6,
            spaceBetween: 5
        }
    },


    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },


    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',

    },
});

