// =====================================
// ABIERA - GALLERY JAVASCRIPT
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. SELECT GALLERY ELEMENTS
    // =====================================

    const galleryItems = document.querySelectorAll(".gallery-item");
    const filterButtons = document.querySelectorAll(".gallery-filter");

    const lightbox = document.getElementById("galleryLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");

    const closeButton = document.querySelector(".lightbox-close");
    const previousButton = document.querySelector(".lightbox-prev");
    const nextButton = document.querySelector(".lightbox-next");

    // Store visible gallery images
    let visibleImages = [];

    // Track the currently selected image
    let currentImageIndex = 0;


    // =====================================
    // 2. GALLERY FILTERING
    // =====================================

    function filterGallery(category) {

        filterButtons.forEach(function (button) {

            button.classList.toggle(
                "active",
                button.dataset.filter === category
            );

        });

        galleryItems.forEach(function (item) {

            const itemCategory = item.dataset.category;

            if (category === "all" || itemCategory === category) {

                item.style.display = "";

            } else {

                item.style.display = "none";

            }

        });

        updateVisibleImages();

    }


    // Get only the currently visible images
    function updateVisibleImages() {

        visibleImages = Array.from(galleryItems).filter(function (item) {

            return item.style.display !== "none";

        });

    }


    // Add click events to filter buttons
    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedCategory = button.dataset.filter;

            filterGallery(selectedCategory);

        });

    });


    // =====================================
    // 3. OPEN LIGHTBOX
    // =====================================

    function openLightbox(index) {

        currentImageIndex = index;

        const selectedItem = visibleImages[currentImageIndex];

        if (!selectedItem) return;

        const image = selectedItem.querySelector("img");

        if (!image) return;

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        // Use the image alt text as its caption
        lightboxCaption.textContent = image.alt;

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

        closeButton.focus();

    }


    // Open an image when clicked
    galleryItems.forEach(function (item) {

        item.addEventListener("click", function () {

            updateVisibleImages();

            const index = visibleImages.indexOf(item);

            if (index !== -1) {

                openLightbox(index);

            }

        });

    });


    // =====================================
    // 4. CLOSE LIGHTBOX
    // =====================================

    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }


    closeButton.addEventListener("click", closeLightbox);


    // Close when clicking outside the image
    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    // =====================================
    // 5. NEXT IMAGE
    // =====================================

    function showNextImage() {

        if (visibleImages.length === 0) return;

        currentImageIndex++;

        if (currentImageIndex >= visibleImages.length) {

            currentImageIndex = 0;

        }

        openLightbox(currentImageIndex);

    }


    // =====================================
    // 6. PREVIOUS IMAGE
    // =====================================

    function showPreviousImage() {

        if (visibleImages.length === 0) return;

        currentImageIndex--;

        if (currentImageIndex < 0) {

            currentImageIndex = visibleImages.length - 1;

        }

        openLightbox(currentImageIndex);

    }


    nextButton.addEventListener("click", showNextImage);

    previousButton.addEventListener("click", showPreviousImage);


    // =====================================
    // 7. KEYBOARD CONTROLS
    // =====================================

    document.addEventListener("keydown", function (event) {

        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") {

            closeLightbox();

        }

        if (event.key === "ArrowRight") {

            showNextImage();

        }

        if (event.key === "ArrowLeft") {

            showPreviousImage();

        }

    });


    // =====================================
    // 8. INITIALIZE GALLERY
    // =====================================

    updateVisibleImages();

    console.log("Abiera gallery loaded successfully!");

});