
document.addEventListener("DOMContentLoaded", function () {

    const photoButtons = document.querySelectorAll("[data-lightbox]");

    if (!photoButtons.length) return;

    // Create the lightbox
    const lightbox = document.createElement("dialog");
    lightbox.className = "community-lightbox";

    lightbox.innerHTML = `
        <button class="lightbox-close" type="button"
            aria-label="Close photo viewer">
            &times;
        </button>

        <button class="lightbox-prev" type="button"
            aria-label="Previous photo">
            <i class="fa-solid fa-chevron-left"></i>
        </button>

        <div class="lightbox-content">
            <img src="" alt="">
            <p class="lightbox-caption"></p>
        </div>

        <button class="lightbox-next" type="button"
            aria-label="Next photo">
            <i class="fa-solid fa-chevron-right"></i>
        </button>
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector("img");
    const caption = lightbox.querySelector(".lightbox-caption");
    const closeButton = lightbox.querySelector(".lightbox-close");
    const previousButton = lightbox.querySelector(".lightbox-prev");
    const nextButton = lightbox.querySelector(".lightbox-next");

    let currentPhotos = [];
    let currentIndex = 0;

    // Display the selected photo
    function showPhoto(index) {

        currentIndex = (index + currentPhotos.length) % currentPhotos.length;

        const selectedButton = currentPhotos[currentIndex];
        const selectedImage = selectedButton.querySelector("img");

        lightboxImage.src = selectedImage.src;
        lightboxImage.alt = selectedImage.alt;

        caption.textContent = selectedButton.dataset.caption || "";

        previousButton.disabled = currentPhotos.length <= 1;
        nextButton.disabled = currentPhotos.length <= 1;
    }

    // Open the lightbox
    photoButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const eventCard = button.closest(".community-event");

            currentPhotos = Array.from(
                eventCard.querySelectorAll("[data-lightbox]")
            );

            currentIndex = currentPhotos.indexOf(button);

            showPhoto(currentIndex);
            lightbox.showModal();
        });

    });

    // Previous photo
    previousButton.addEventListener("click", function () {
        showPhoto(currentIndex - 1);
    });

    // Next photo
    nextButton.addEventListener("click", function () {
        showPhoto(currentIndex + 1);
    });

    // Close lightbox
    closeButton.addEventListener("click", function () {
        lightbox.close();
    });

    // Close when clicking the dark background
    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            lightbox.close();
        }

    });

    // Keyboard controls
    lightbox.addEventListener("keydown", function (event) {

        if (event.key === "ArrowRight") {
            showPhoto(currentIndex + 1);
        }

        if (event.key === "ArrowLeft") {
            showPhoto(currentIndex - 1);
        }

    });

});
