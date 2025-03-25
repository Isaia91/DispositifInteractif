// Récupération des éléments du DOM
const btnOpenModal = document.getElementById("btn-open-modal");
const modalOverlay = document.getElementById("video-modal-overlay");
const videoElement = document.querySelector(".modal-video");

/**
 * Affiche la modal et démarre la lecture de la vidéo.
 */
function ouvrirModal() {
    modalOverlay.style.display = "flex";
    // Démarre la vidéo. La méthode play() retourne une promesse qui peut être gérée au besoin.
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
 * On vérifie que l'élément cliqué est bien l'overlay lui-même.
 */
modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
        fermerModal();
    }
});
