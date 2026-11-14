document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. HEADER SCROLL EFFECT
    // =====================================

    const header = document.querySelector(".header");

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", handleHeaderScroll, {
        passive: true
    });

    handleHeaderScroll();


    // =====================================
    // 2. SMOOTH SCROLLING
    // =====================================

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            // Ignore empty links
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            // Check if the target section exists
            if (targetElement) {

                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // =====================================
    // 3. AUTOMATIC COPYRIGHT YEAR
    // =====================================

    const currentYear = document.querySelector(".current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    console.log("Abiera website JavaScript loaded successfully!");

});