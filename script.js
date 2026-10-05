/* =====================================================
   ROSHDY
   INTERACTIVE LUXURY REAL ESTATE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* ================= ELEMENTS ================= */

    const header =
        document.getElementById("header");

    const menuButton =
        document.getElementById("menuButton");

    const navigation =
        document.getElementById("navigation");

    const backTop =
        document.getElementById("backTop");

    const cursorGlow =
        document.getElementById("cursorGlow");

    const year =
        document.getElementById("year");


    /* ================= YEAR ================= */

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* ================= HEADER ================= */

    function updateHeader() {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }


        if (window.scrollY > 500) {

            backTop.classList.add("visible");

        } else {

            backTop.classList.remove("visible");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader
    );


    updateHeader();


    /* ================= MOBILE MENU ================= */

    menuButton.addEventListener(
        "click",
        function () {

            navigation.classList.toggle(
                "open"
            );

            menuButton.classList.toggle(
                "active"
            );

            document.body.classList.toggle(
                "menu-open"
            );

        }
    );


    navigation
        .querySelectorAll("a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navigation.classList.remove(
                        "open"
                    );

                    menuButton.classList.remove(
                        "active"
                    );

                    document.body.classList.remove(
                        "menu-open"
                    );

                }
            );

        });


    /* ================= BACK TOP ================= */

    backTop.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* ================= CURSOR ================= */

    if (
        window.innerWidth > 900 &&
        cursorGlow
    ) {

        document.addEventListener(
            "mousemove",
            function (event) {

                cursorGlow.style.opacity =
                    "1";

                cursorGlow.style.left =
                    event.clientX + "px";

                cursorGlow.style.top =
                    event.clientY + "px";

            }
        );

    }


    /* ================= FILTER ================= */

    const filterButtons =
        document.querySelectorAll(
            ".filter-button"
        );

    const propertyCards =
        document.querySelectorAll(
            ".property-card"
        );


    function filterProperties(type) {

        propertyCards.forEach(
            function (card) {

                const cardType =
                    card.dataset.type;


                if (
                    type === "all" ||
                    cardType === type
                ) {

                    card.style.display = "";

                    setTimeout(
                        function () {

                            card.style.opacity =
                                "1";

                            card.style.transform =
                                "translateY(0)";

                        },
                        30
                    );

                } else {

                    card.style.opacity =
                        "0";

                    card.style.transform =
                        "translateY(15px)";

                    setTimeout(
                        function () {

                            card.style.display =
                                "none";

                        },
                        250
                    );

                }

            }
        );

    }


    filterButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    filterButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    filterProperties(
                        button.dataset.filter
                    );

                }
            );

        }
    );


    /* ================= SEARCH ================= */

    const searchForm =
        document.getElementById(
            "propertySearch"
        );

    const propertyType =
        document.getElementById(
            "propertyType"
        );

    const propertyLocation =
        document.getElementById(
            "propertyLocation"
        );


    searchForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const type =
                propertyType.value;


            const location =
                propertyLocation.value;


            filterButtons.forEach(
                function (button) {

                    button.classList.remove(
                        "active"
                    );

                }
            );


            const selectedButton =
                document.querySelector(
                    `[data-filter="${type}"]`
                );


            if (selectedButton) {

                selectedButton.classList.add(
                    "active"
                );

            } else {

                document
                    .querySelector(
                        '[data-filter="all"]'
                    )
                    .classList.add(
                        "active"
                    );

            }


            propertyCards.forEach(
                function (card) {

                    const matchType =
                        type === "all" ||
                        card.dataset.type === type;


                    const matchLocation =
                        location === "all" ||
                        card.dataset.location === location;


                    if (
                        matchType &&
                        matchLocation
                    ) {

                        card.style.display = "";

                    } else {

                        card.style.display =
                            "none";

                    }

                }
            );


            showToast(
                "Search updated"
            );


            document
                .getElementById(
                    "properties"
                )
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


    /* ================= FAVORITES ================= */

    const favoriteButtons =
        document.querySelectorAll(
            ".favorite"
        );


    favoriteButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    button.classList.toggle(
                        "active"
                    );


                    if (
                        button.classList.contains(
                            "active"
                        )
                    ) {

                        button.textContent =
                            "♥";

                        showToast(
                            "Property saved"
                        );

                    } else {

                        button.textContent =
                            "♡";

                        showToast(
                            "Property removed"
                        );

                    }

                }
            );

        }
    );


    /* ================= QUICK VIEW ================= */

    const modal =
        document.getElementById(
            "propertyModal"
        );

    const modalClose =
        document.getElementById(
            "modalClose"
        );

    const modalBackdrop =
        document.getElementById(
            "modalBackdrop"
        );

    const modalImage =
        document.getElementById(
            "modalImage"
        );

    const modalTitle =
        document.getElementById(
            "modalTitle"
        );

    const modalType =
        document.getElementById(
            "modalType"
        );

    const modalLocation =
        document.getElementById(
            "modalLocation"
        );

    const modalPrice =
        document.getElementById(
            "modalPrice"
        );


    const quickButtons =
        document.querySelectorAll(
            ".quick-view"
        );


    quickButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const card =
                        button.closest(
                            ".property-card"
                        );


                    const image =
                        card.querySelector(
                            ".property-image img"
                        );


                    const type =
                        card.querySelector(
                            ".property-type"
                        );


                    const title =
                        card.querySelector(
                            "h3"
                        );


                    const location =
                        card.querySelector(
                            ".property-info p"
                        );


                    const price =
                        card.querySelector(
                            ".property-footer strong"
                        );


                    modalImage.src =
                        image.src;

                    modalType.textContent =
                        type.textContent;

                    modalTitle.textContent =
                        title.textContent;

                    modalLocation.textContent =
                        location.textContent;

                    modalPrice.textContent =
                        price.textContent;


                    modal.classList.add(
                        "open"
                    );

                    document.body.classList.add(
                        "modal-open"
                    );

                }
            );

        }
    );


    function closeModal() {

        modal.classList.remove(
            "open"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    modalClose.addEventListener(
        "click",
        closeModal
    );


    modalBackdrop.addEventListener(
        "click",
        closeModal
    );


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeModal();

            }

        }
    );


    /* ================= EXPERIENCE ACCORDION ================= */

    const experienceItems =
        document.querySelectorAll(
            ".experience-item"
        );


    experienceItems.forEach(
        function (item) {

            item.addEventListener(
                "click",
                function () {

                    experienceItems.forEach(
                        function (other) {

                            if (
                                other !== item
                            ) {

                                other.classList.remove(
                                    "active"
                                );

                            }

                        }
                    );


                    item.classList.toggle(
                        "active"
                    );

                }
            );

        }
    );


    /* ================= TESTIMONIAL SLIDER ================= */

    const track =
        document.getElementById(
            "testimonialTrack"
        );

    const testimonials =
        document.querySelectorAll(
            ".testimonial"
        );

    const prev =
        document.getElementById(
            "prevTestimonial"
        );

    const next =
        document.getElementById(
            "nextTestimonial"
        );

    const counter =
        document.getElementById(
            "sliderCounter"
        );


    let currentSlide = 0;


    function updateSlider() {

        track.style.transform =
            `translateX(-${currentSlide * 100}%)`;


        counter.textContent =
            `0${currentSlide + 1} / 0${testimonials.length}`;

    }


    next.addEventListener(
        "click",
        function () {

            currentSlide++;

            if (
                currentSlide >=
                testimonials.length
            ) {

                currentSlide = 0;

            }

            updateSlider();

        }
    );


    prev.addEventListener(
        "click",
        function () {

            currentSlide--;

            if (currentSlide < 0) {

                currentSlide =
                    testimonials.length - 1;

            }

            updateSlider();

        }
    );


    /* ================= AUTO SLIDER ================= */

    setInterval(
        function () {

            currentSlide++;

            if (
                currentSlide >=
                testimonials.length
            ) {

                currentSlide = 0;

            }

            updateSlider();

        },
        6000
    );


    /* ================= FAQ ================= */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    faqItems.forEach(
        function (item) {

            const question =
                item.querySelector(
                    ".faq-question"
                );


            question.addEventListener(
                "click",
                function () {

                    faqItems.forEach(
                        function (other) {

                            if (
                                other !== item
                            ) {

                                other.classList.remove(
                                    "active"
                                );

                            }

                        }
                    );


                    item.classList.toggle(
                        "active"
                    );

                }
            );

        }
    );


    /* ================= COUNTERS ================= */

    const counters =
        document.querySelectorAll(
            "[data-count]"
        );


    let countersStarted = false;


    function startCounters() {

        if (countersStarted) return;

        countersStarted = true;


        counters.forEach(
            function (counter) {

                const target =
                    Number(
                        counter.dataset.count
                    );

                let current = 0;


                const increment =
                    target / 70;


                function updateCounter() {

                    current += increment;


                    if (
                        current >= target
                    ) {

                        counter.textContent =
                            target;

                        return;

                    }


                    counter.textContent =
                        Math.floor(current);


                    requestAnimationFrame(
                        updateCounter
                    );

                }


                updateCounter();

            }
        );

    }


    const statsSection =
        document.querySelector(
            ".stats-section"
        );


    const statsObserver =
        new IntersectionObserver(
            function (entries) {

                if (
                    entries[0].isIntersecting
                ) {

                    startCounters();

                    statsObserver.disconnect();

                }

            },
            {
                threshold: 0.35
            }
        );


    statsObserver.observe(
        statsSection
    );


    /* ================= SCROLL REVEAL ================= */

    const revealElements =
        document.querySelectorAll(
            ".intro-content, .property-card, .experience-main, .experience-list, .location-card, .stat-item, .testimonial-slider, .faq-grid, .contact-content"
        );


    revealElements.forEach(
        function (element) {

            element.classList.add(
                "reveal"
            );

        }
    );


    const revealObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        function (element) {

            revealObserver.observe(
                element
            );

        }
    );


    /* ================= TOAST ================= */

    const toast =
        document.getElementById(
            "toast"
        );

    const toastTitle =
        document.getElementById(
            "toastTitle"
        );


    function showToast(message) {

        toastTitle.textContent =
            message;

        toast.classList.add(
            "show"
        );


        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            2800
        );

    }


    /* ================= ESCAPE ================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                navigation.classList.remove(
                    "open"
                );

                menuButton.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }

        }
    );

});