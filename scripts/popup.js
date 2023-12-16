// Popup.js
document.addEventListener("DOMContentLoaded", function () {
    initAddEventListenerPopup();

    const form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const nom = document.getElementById("nom").value;
            const email = document.getElementById("email").value;

            try {
                gererFormulaire(nom, email);
                console.log("Nom:", nom);
                console.log("Email:", email);
            } catch (error) {
                console.error(error.message);
                afficherMessageErreur(error.message);
            }
        });
    } else {
        console.error("Le formulaire n'a pas été trouvé.");
    }
});

function validerNom(nom) {
    if (nom.length < 2) {
        throw new Error("Le nom est trop court");
    }
    if (!/^[a-zA-Z\s]*$/.test(nom)) {
        throw new Error("Le nom ne doit contenir que des lettres et des espaces");
    }
}

function validerEmail(email) {
    if (!email.includes("@") || !email.includes(".")) {
        throw new Error("L'e-mail n'est pas valide");
    }
}

function gererFormulaire(nom, email) {
    // Réinitialiser les messages d'erreur
    afficherMessageErreur('');

    // Valider le nom et l'email
    validerNom(nom);
    validerEmail(email);

    // Ici, vous pouvez ajouter d'autres traitements liés au formulaire si nécessaire
}

function afficherPopup() {
    let popupBackground = document.querySelector(".popupBackground");
    popupBackground.classList.add("active");
}

function cacherPopup() {
    let popupBackground = document.querySelector(".popupBackground");
    popupBackground.classList.remove("active");
}

function initAddEventListenerPopup() {
    let btnPartage = document.querySelector(".zonePartage button");
    btnPartage.addEventListener("click", () => {
        if (isGameFinished()) {
            afficherPopup();
        }
    });

    let popupBackground = document.querySelector(".popupBackground");
    popupBackground.addEventListener("click", (event) => {
        if (event.target === popupBackground) {
            cacherPopup();
        }
    });
}

function isGameFinished() {
    return (
        (valeurChoix === "mots" && listeMot[i] === undefined) ||
        (valeurChoix === "phrases" && listePhrase[i] === undefined)
    );
}

function afficherMessageErreur(message) {
    const popup = document.querySelector(".popup");
    const errorSpan = document.createElement("span");
    errorSpan.classList.add("error-message");
    errorSpan.textContent = message;

    // Supprimer les anciens messages d'erreur
    const existingErrors = document.querySelectorAll(".error-message");
    existingErrors.forEach((element) => {
        element.remove();
    });

    // Afficher le nouveau message d'erreur
    popup.appendChild(errorSpan);
}
