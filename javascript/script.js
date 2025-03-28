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