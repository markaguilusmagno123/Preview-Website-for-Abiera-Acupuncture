// =====================================
// ABIERA - NAVIGATION JAVASCRIPT
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("primary-navigation");

    // Check if the navigation elements exist
    if (!menuToggle || !navigation) {
        return;
    }


    // =====================================
    // 1. OPEN AND CLOSE MENU
    // =====================================

    function closeMenu() {

        navigation.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

    }


    function toggleMenu() {

        const isOpen = navigation.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

    }


    // Hamburger button click
    menuToggle.addEventListener("click", function (event) {

        event.stopPropagation();

        toggleMenu();

    });


    // =====================================
    // 2. CLOSE MENU AFTER CLICKING A LINK
    // =====================================

    const navLinks = navigation.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            closeMenu();

        });

    });


    // =====================================
    // 3. CLOSE MENU WHEN CLICKING OUTSIDE
    // =====================================

    document.addEventListener("click", function (event) {

        if (!event.target.closest(".header")) {

            closeMenu();

        }

    });


    // =====================================
    // 4. CLOSE MENU USING ESCAPE KEY
    // =====================================

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeMenu();

            menuToggle.focus();

        }

    });


    // =====================================
    // 5. CLOSE MENU WHEN RESIZING TO DESKTOP
    // =====================================

    window.addEventListener("resize", function () {

        if (window.innerWidth > 1024) {

            closeMenu();

        }

    });


    console.log("Abiera navigation loaded successfully!");

});