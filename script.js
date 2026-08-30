const header = document.querySelector(".header");

// ================= SCROLL RESET =================

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


// ================= REVEAL =================

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    observer.observe(element);
});


// ================= COUNTER =================

const counters = document.querySelectorAll("[data-counter]");

const counterObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.counter);

            let current = 0;
            const duration = 1500;
            const increment = target / (duration / 16);

            const updateCounter = () => {

                current += increment;

                if (current < target) {

                    counter.textContent = Math.floor(current);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = target;

                }
            };

            updateCounter();

            counterObserver.unobserve(counter);
        });

    },
    {
        threshold: 0.5
    }
);

counters.forEach((counter) => {
    counterObserver.observe(counter);
});


// ================= MOBILE NAV =================

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".mobile-nav__item");

const sectionObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const id = entry.target.getAttribute("id");

            navItems.forEach((item) => {

                item.classList.remove("active");

                if (item.getAttribute("href") === `#${id}`) {
                    item.classList.add("active");
                }

            });

        });

    },
    {
        threshold: 0.45
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});
// ================= CONSULTATION MODAL =================

const consultationBtn =
    document.getElementById("consultationBtn");

const consultationModal =
    document.getElementById("consultationModal");

const closeConsultation =
    document.getElementById("closeConsultation");

const modalOverlay =
    document.querySelector(
        ".consultation-modal__overlay"
    );


// باز کردن

consultationBtn.addEventListener("click", () => {

    consultationModal.classList.add("active");

    document.body.style.overflow = "hidden";

});


// بستن

function closeModal() {

    consultationModal.classList.remove("active");

    document.body.style.overflow = "";

}


closeConsultation.addEventListener(
    "click",
    closeModal
);


modalOverlay.addEventListener(
    "click",
    closeModal
);


// بستن با ESC

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        consultationModal.classList.contains("active")
    ) {

        closeModal();

    }

});