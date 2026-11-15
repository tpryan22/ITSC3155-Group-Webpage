/**
 * Toggles the display of an individual team member's bio
 * @param {string} bioId - The ID of the bio section to show or hide
 */
function toggleBio(bioId) {
    const bio = document.getElementById(bioId);
    // Toggle between showing and hiding the bio section
    if (bio.style.display === "none" || bio.style.display === "") {
        bio.style.display = "block";
    } else {
        bio.style.display = "none";
    }
}

/**
 * Shows the specified section ('bios' or 'vision') and hides the other
 * @param {string} sectionId - The ID of the section to display
 */
function showSection(sectionId) {
    const biosSection = document.getElementById("bios");
    const visionSection = document.getElementById("vision");

    // Display the bios section and hide the vision section
    if (sectionId === "bios") {
        biosSection.style.display = "flex";
        visionSection.style.display = "none";
    }
    // Display the vision section and hide the bios section
    else if (sectionId === "vision") {
        biosSection.style.display = "none";
        visionSection.style.display = "block";
    }
}


const joshName = document.querySelector(".josh-card h2");

if (joshName) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-extruded");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.6 }
    );

    observer.observe(joshName);
}


const joshTicker = document.querySelector(".josh-ticker");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function setUpTicker() {
    const track = joshTicker.querySelector(".josh-ticker-track");
    const list = track.querySelector("ul");
    const originals = Array.from(list.children);

    joshTicker.classList.add("is-running");

    const minWidth = Math.max(joshTicker.clientWidth, 1200);
    while (list.scrollWidth < minWidth) {
        originals.forEach((item) => {
            const repeat = item.cloneNode(true);
            repeat.setAttribute("aria-hidden", "true");
            list.appendChild(repeat);
        });
    }

    const copy = list.cloneNode(true);
    copy.setAttribute("aria-hidden", "true");
    track.appendChild(copy);

    const seconds = list.scrollWidth / 40;
    joshTicker.style.setProperty("--ticker-duration", `${seconds}s`);
}

if (joshTicker && !reduceMotion.matches) {
    setUpTicker();
}


const joshDialog = document.querySelector(".josh-dialog");

if (joshDialog) {
    const media = joshDialog.querySelector(".josh-dialog-media");
    const title = joshDialog.querySelector("#josh-dialog-title");
    const text = joshDialog.querySelector(".josh-dialog-body p");

    document.querySelectorAll(".josh-tile").forEach((tile) => {
        tile.addEventListener("click", () => {
            const name = tile.querySelector(".josh-tile-label").textContent;

            const image = tile.querySelector("img").cloneNode();
            image.alt = name;
            media.replaceChildren(image);
            media.classList.toggle("is-logo", tile.classList.contains("josh-tile--logo"));
            media.classList.toggle("is-fit", tile.classList.contains("josh-tile--fit"));

            title.textContent = name;
            text.textContent = tile.dataset.description || "";

            joshDialog.showModal();
        });
    });

    joshDialog.querySelector(".josh-dialog-close").addEventListener("click", () => {
        joshDialog.close();
    });

    joshDialog.addEventListener("click", (event) => {
        if (event.target === joshDialog) {
            joshDialog.close();
        }
    });
}
