const App = (function () {
    const DOM = {
        header: document.querySelector(".header"),
        menuToggler: document.querySelector(".navigation__toggler"),
        navigationItems: document.querySelector(".navigation__items"),
        toggleItems: document.querySelectorAll(".toggle-item"),
        chromaticaGallery: document.getElementById("chromatica-gallery"),
        guitarGallery: document.getElementById("guitar-gallery"),
        footerDate: document.getElementById("foot-year"),
    };

    const setEventListeners = function () {
        window.addEventListener("scroll", () => {
            DOM.header.classList.toggle("header-sticky", window.scrollY > 100);
        });
        window.addEventListener("load", () => {
            DOM.footerDate.innerText = new Date().getFullYear();
        });
        DOM.toggleItems.forEach((item) => {
            item.addEventListener("click", toggleMenu);
        });
        DOM.chromaticaGallery.addEventListener("click", (e) => showGallery(e, "chromaticashop", 14));
        DOM.guitarGallery.addEventListener("click", (e) => showGallery(e, "guitarshop", 3));
    };

    const showGallery = function (e, path, numberOfImages) {
        e.preventDefault();
        const basePath = "./img/projects/" + path + "/";
        let currentImage = 1;
        const modal = document.createElement("div");
        const modalClose = document.createElement("button");
        const modalCloseIcon = document.createElement("i");
        const arrowLeft = document.createElement("button");
        const arrowRight = document.createElement("button");
        const modalImage = document.createElement("div");
        const modalControls = document.createElement("div");
        const img = document.createElement("img");
        const imageCount = document.createElement("div");
        img.src = basePath + currentImage + ".png";
        imageCount.textContent = `1 / ${numberOfImages}`;
        modal.classList.add("gallery-modal");
        modalCloseIcon.classList.add("far");
        modalCloseIcon.classList.add("fa-times-circle");
        modalClose.classList.add("gallery-modal__close");
        modalImage.classList.add("gallery-modal__image");
        modalControls.classList.add("gallery-modal__controls");
        arrowLeft.classList.add("fas");
        arrowLeft.classList.add("fa-arrow-left");
        arrowRight.classList.add("fas");
        arrowRight.classList.add("fa-arrow-right");
        imageCount.classList.add("gallery-modal__count");
        modalClose.appendChild(modalCloseIcon);
        modalControls.appendChild(arrowLeft);
        modalControls.appendChild(imageCount);
        modalControls.appendChild(arrowRight);
        modalImage.appendChild(img);
        modal.appendChild(modalClose);
        modal.appendChild(modalImage);
        modal.appendChild(modalControls);
        document.body.appendChild(modal);
        modalClose.addEventListener("click", () => {
            modal.remove();
        });
        arrowLeft.addEventListener("click", () => {
            if (currentImage > 1) {
                img.src = basePath + (currentImage - 1) + ".png";
                currentImage--;
            } else {
                img.src = basePath + numberOfImages + ".png";
                currentImage = numberOfImages;
            }
            imageCount.textContent = `${currentImage} / ${numberOfImages}`;
        });
        arrowRight.addEventListener("click", () => {
            if (currentImage < numberOfImages) {
                img.src = basePath + (currentImage + 1) + ".png";
                currentImage++;
            } else {
                img.src = basePath + "1" + ".png";
                currentImage = 1;
            }
            imageCount.textContent = `${currentImage} / ${numberOfImages}`;
        });
    };

    const toggleMenu = function () {
        DOM.menuToggler.classList.toggle("active");
        DOM.navigationItems.classList.toggle("active");
    };

    return {
        init: function () {
            setEventListeners();
        },
    };
})();

App.init();
