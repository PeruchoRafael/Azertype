let score = 0;
let tabMots = listeMot.length;
let tabPhrases = listePhrase.length;
let valeurChoix = "mots";
let i = 0;

function lancerBoucleDeJeu() {
    score = 0;

    if (valeurChoix === "phrases") {
        i = 0;
        while (i < tabPhrases) {
            let phraseUtilisateur = listePhrase[i];

            if (phraseUtilisateur === listePhrase[i]) {
                score++;
            }

            i++;
        }
    } else if (valeurChoix === "mots") {
        i = 0;
        while (i < tabMots) {
            let motUtilisateur = listeMot[i];

            if (motUtilisateur === listeMot[i]) {
                score++;
            }

            i++;
        }
    }
}

function lancerJeu() {
    let continuerJeu = true;

    let radioMots = document.getElementById("mots");
    let radioPhrases = document.getElementById("phrases");

    radioMots.addEventListener("change", () => {
        valeurChoix = "mots";
        afficherProposition(listeMot[i]);
    });

    radioPhrases.addEventListener("change", () => {
        valeurChoix = "phrases";
        afficherProposition(listePhrase[i]);
    });

    while (continuerJeu) {
        let boutonValider = document.getElementById("btnValiderMot");
        boutonValider.addEventListener("click", () => {
            let inputJoueur = document.getElementById("inputEcriture");
            let texteUtilisateur = inputJoueur.value;

            if (texteUtilisateur === (valeurChoix === "mots" ? listeMot[i] : listePhrase[i])) {
                score++;
                let updateScore = document.querySelector(".zoneScore span");
                updateScore.innerText = score;
            }

            i++;
            inputJoueur.value = "";
            afficherProposition(valeurChoix === "mots" ? listeMot[i] : listePhrase[i]);
        });

        let inputJoueur = document.getElementById("inputEcriture");
        inputJoueur.addEventListener("keypress", (event) => {
            // Gérer les événements de saisie au besoin
        });

        afficherProposition(valeurChoix === "mots" ? listeMot[i] : listePhrase[i]);

        let reponse = "non"; // Désactivez temporairement la demande de continuation
        continuerJeu = (reponse === "oui");
    }

    console.log("Merci d'avoir joué!");
}

function afficherProposition(value) {
    let selectProposition = document.querySelector(".zoneProposition");
    let propositionCourante = value;

    selectProposition.innerText = propositionCourante;

    if ((valeurChoix === "mots" && listeMot[i] === undefined) || (valeurChoix === "phrases" && listePhrase[i] === undefined)) {
        selectProposition.innerText = "Le jeu est fini";
        let selectBouton = document.getElementById("btnValiderMot");
        selectBouton.disabled = true;
        inputJoueur.disabled = true;

        let afficherScoreFinal = document.querySelector(".zoneScore p");
        afficherScoreFinal.textContent = "Score final : ";
    }
}

lancerJeu();
