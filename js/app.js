// Récupération des éléments du DOM
const btnOpenModal = document.getElementById("btn-open-modal");
const modalOverlay = document.getElementById("video-modal");
const videoElement = document.querySelector(".modal-video");

/**
 * Affiche la modal et démarre la lecture de la vidéo.
 */
function ouvrirModal() {
    modalOverlay.style.display = "flex";
    videoElement.play().catch((error) => {
        console.error("Erreur lors de la lecture de la vidéo :", error);
    });
}

/**
 * Cache la modal, met la vidéo en pause et réinitialise le temps de lecture.
 */
function fermerModal() {
    modalOverlay.style.display = "none";
    videoElement.pause();
    videoElement.currentTime = 0;
}

// Ouvre la modal lors du clic sur le bouton dédié
btnOpenModal.addEventListener("click", ouvrirModal);

/**
 * Ferme la modal si l'utilisateur clique à l'extérieur du contenu modal.
 */
modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
        fermerModal();
    }
});

// Ajoute un écouteur d'événement pour suivre les mouvements de la souris
let moveCounter = 0;
document.addEventListener('mousemove', function (e) {
    moveCounter++;
    if (moveCounter % 10 !== 0) return;

    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.style.left = (e.clientX - 10) + 'px';
    leaf.style.top = (e.clientY - 10) + 'px';
    document.body.appendChild(leaf);

    setTimeout(() => {
        leaf.remove();
    }, 6000);
});

// Génère des étoiles
const numberOfStars = 100;
const sky = document.querySelector('.content');

for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const size = Math.random() * 3 + 2;
    const twinkleDuration = (Math.random() * 3 + 2).toFixed(1);

    star.style.top = `${top}vh`;
    star.style.left = `${left}vw`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animationDuration = `${twinkleDuration}s`;

    sky.appendChild(star);
}

// Génère des nuages
const numberOfClouds = 10;

for (let i = 0; i < numberOfClouds; i++) {
    const cloud = document.createElement('div');
    cloud.classList.add('cloud');
    const width = Math.random() * 120 + 100;
    const height = width * 0.6;
    const top = Math.random() * 60;
    const duration = Math.random() * 30 + 30;

    cloud.style.width = `${width}px`;
    cloud.style.height = `${height}px`;
    cloud.style.top = `${top}vh`;
    cloud.style.left = `-${Math.random() * 200 + 100}px`;
    cloud.style.animationDuration = `${duration}s`;

    const before = document.createElement('div');
    const after = document.createElement('div');
    before.style.width = `${width * 0.7}px`;
    before.style.height = `${height * 0.8}px`;
    before.style.top = `-20px`;
    before.style.left = `10px`;
    before.style.position = 'absolute';
    before.style.background = '#444';
    before.style.borderRadius = '50%';

    after.style.width = `${width * 0.5}px`;
    after.style.height = `${height * 0.6}px`;
    after.style.top = `-10px`;
    after.style.left = `40px`;
    after.style.position = 'absolute';
    after.style.background = '#444';
    after.style.borderRadius = '50%';

    cloud.appendChild(before);
    cloud.appendChild(after);

    sky.appendChild(cloud);
}

// Récupération du DOM pour la modale histoire (remplace l'ancien bloc tourisme)
const dice = document.getElementById('dice');
const storyModal = document.getElementById('story-modal');
const storyTitleEl = document.getElementById('story-title');
const storyImgEl = document.getElementById('story-image');
const storyAudioEl = document.getElementById('story-audio');
const storyCloseBtn = document.getElementById('story-close');

let storiesData = []; // sera un tableau de 6 histoires

// Chargement des données JSON (assets/data/stories.json doit contenir { "stories": [ ...6 objets... ] })
fetch('assets/data/stories.json', {cache: 'no-store'})
    .then(res => res.json())
    .then(data => {
        // Accepte soit {stories:[...]} soit un tableau direct
        storiesData = Array.isArray(data?.stories) ? data.stories : (Array.isArray(data) ? data : []);
    })
    .catch(err => console.error('Erreur chargement stories.json :', err));

// Helpers modal/audio/diaporama (limités à la fonctionnalité du dé)
function openStoryModal() {
    if (!storyModal) return;
    storyModal.style.display = "flex";
    requestAnimationFrame(() => storyModal.classList.add("open"));
}

function closeStoryModal() {
    if (!storyModal) return;
    storyModal.classList.remove("open");
    setTimeout(() => (storyModal.style.display = "none"), 150);
    stopSlideshow();
    stopAudio();
}

if (storyModal) {
    storyModal.addEventListener("click", (e) => {
        if (e.target === storyModal) closeStoryModal();
    });
}
if (storyCloseBtn) {
    storyCloseBtn.addEventListener("click", closeStoryModal);
}

function playAudio(src) {
    if (!storyAudioEl) return;
    storyAudioEl.src = src || "";
    if (!src) return;
    storyAudioEl.play().catch((e) => console.warn("[audio] play error:", e));
}

function stopAudio() {
    if (!storyAudioEl) return;
    storyAudioEl.pause();
    storyAudioEl.currentTime = 0;
    storyAudioEl.src = "";
}

let slideTimer = null;
let slideIndex = 0;
let slideImages = [];

function startSlideshow(urls = [], intervalMs = 2500) {
    if (!storyImgEl || urls.length === 0) return;
    slideImages = urls.slice();
    slideIndex = 0;
    storyImgEl.src = slideImages[0];

    stopSlideshow();
    slideTimer = setInterval(() => {
        slideIndex = (slideIndex + 1) % slideImages.length;
        storyImgEl.src = slideImages[slideIndex];
    }, intervalMs);
}

function stopSlideshow() {
    if (slideTimer) {
        clearInterval(slideTimer);
        slideTimer = null;
    }
}

// Optionnel : préchargement pour éviter les clignotements
function preloadImages(urls = []) {
    return Promise.all(
        urls.map(src => new Promise(resolve => {
            const i = new Image();
            i.onload = () => resolve(src);
            i.onerror = () => resolve(src);
            i.src = src;
        }))
    );
}

// Correspondance faces ↔ rotations (inchangé)
const diceFaces = [
    {x: 0, y: 0},    // Face 1
    {x: 0, y: 180},  // Face 2
    {x: 0, y: 90},   // Face 3
    {x: 0, y: -90},  // Face 4
    {x: 90, y: 0},   // Face 5
    {x: -90, y: 0}   // Face 6
];

// Lancer du dé → jouer audio + diaporama selon la face
let diceRolling = false;
dice.addEventListener('click', () => {
    if (diceRolling) return;
    diceRolling = true;

    const faceIndex = Math.floor(Math.random() * 6);
    const rotation = diceFaces[faceIndex];

    // petit style : tours supplémentaires aléatoires
    const extraTurnsX = 360 * (2 + Math.floor(Math.random() * 2)); // 720 ou 1080
    const extraTurnsY = 360 * (2 + Math.floor(Math.random() * 2));

    dice.style.transform = `rotateX(${rotation.x + extraTurnsX}deg) rotateY(${rotation.y + extraTurnsY}deg)`;

    let ended = false;
    const finish = () => {
        if (ended) return;
        ended = true;
        diceRolling = false;

        const story = storiesData[faceIndex];
        if (!story) {
            console.warn('[dice] Aucune histoire dispo (stories.json chargé ? format ok ?)');
            return;
        }

        if (storyTitleEl) storyTitleEl.textContent = story.title || 'Histoire';
        const images = Array.isArray(story.images) ? story.images : [];
        const interval = Number.isFinite(story.intervalMs) ? story.intervalMs : 2500;

        preloadImages(images).then(() => {
            playAudio(story.audio);
            startSlideshow(images, interval);
            openStoryModal();
        });
    };

    // on privilégie transitionend ; fallback timeout si pas de transition CSS
    const onEnd = (ev) => {
        if (ev.propertyName !== 'transform') return;
        dice.removeEventListener('transitionend', onEnd);
        finish();
    };
    dice.addEventListener('transitionend', onEnd, {once: true});

    setTimeout(() => {
        dice.removeEventListener('transitionend', onEnd);
        finish();
    }, 1100); // un poil > à la durée CSS (1s) pour le fallback
});
