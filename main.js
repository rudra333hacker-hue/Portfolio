document.addEventListener("DOMContentLoaded", () => {
    // 1. Initial State: Hide content, Show Loader
    const mainContent = document.getElementById("main-content");
    const loader = document.getElementById("loader");

    // 2. Typewriter Effect Logic
    const initTypewriter = () => {
        const elements = document.querySelectorAll(".typewriter");
        elements.forEach(el => {
            const text = el.getAttribute("data-text") || el.innerText;
            el.innerText = "";
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    el.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, 100);
        });
    };

    // 3. Scroll Reveal Animation (GSAP + Intersection Observer)
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll(".project-card, .skill-sector, .hero p, .terminal, .glitch");
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.to(entry.target, {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: "power4.out"
                    });
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => {
            gsap.set(el, { opacity: 0, y: 50 });
            observer.observe(el);
        });
    };

    // 4. Page Transition / Loader Exit
    // This function is called by the progress bar in three-models.js usually, 
    // but we add a safety timeout here so the page always eventually loads.
    const revealPage = () => {
        gsap.to(loader, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                loader.style.display = "none";
                mainContent.style.visibility = "visible";
                gsap.to(mainContent, { opacity: 1, duration: 1 });
                initTypewriter();
                initScrollReveal();
            }
        });
    };

    // Safety: If 3D takes too long, force reveal after 5 seconds
    setTimeout(revealPage, 5000);

    // Listen for custom event from three-models.js when loading is 100%
    window.addEventListener('modelsLoaded', revealPage);
});

// 5. Navbar Dynamic Styling
window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (window.scrollY > 50) {
        nav.style.background = "rgba(0, 0, 0, 0.95)";
        nav.style.padding = "15px 5%";
    } else {
        nav.style.background = "rgba(0, 0, 0, 0.8)";
        nav.style.padding = "20px 5%";
    }
});
