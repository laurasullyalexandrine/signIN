// Mise en place et initialisation du module.

let app = {

    init: function() {
        console.log('Hello !');
        // Je récupère le formulaire pour par la suite récupérer l'évenement 'Submit' et bloquer 
        // le comportement par défaut du rechargement de la la page au moment de la soumission du formulaire.
        app.loginForm = document.getElementById('login-form');

        // J'ajoute l'écouteur d'évènement 'submit' sur le formulaire et on initialise un gestionnaire d'évènement.
        // https://developer.mozilla.org/fr/docs/Web/API/HTMLFormElement/submit_event
        app.loginForm.addEventListener('submit', app.formIsValid);
        console.log(app.loginForm);

        // Je récupère sous la forme d'un tableau les inputs pour y contrôler les valeurs saisies et gérer les erreurs.
        app.inputArray = document.getElementsByClassName('field-input');
        console.log(app.inputArray);
      
        // J'utilise une boucle 'for' pour récupérer les index des input et poser un écouteur d'évènement de type 'blur' sur chaque champ.
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event
        for (let inputIndex = 0; inputIndex < app.inputArray.length; inputIndex++) {
            let input = app.inputArray[inputIndex];
            console.log(input);

            input.addEventListener('blur', app.inputIsValid);
        }
        // Je récupère la div errors et j'initialise une varible de type tableau pour y stocker la saisie erronée.
        app.errors = document.getElementById('errors');
        console.log(app.errors);
        app.errorArea = [];

    },

    // Pour récupérer la saisie d'un champ on le cible dans un premier temps avec target c'est une référence à l'objet qui a envoyé l'événement.
    // https://developer.mozilla.org/fr/docs/Web/API/Event/target
    inputIsValid: function(evt) {
        let inputTarget = evt.target; 
        // console.log(inputTarget);
        // Initialisation de la fonction qui me servira à récupérer la saisie des champs.
        app.inputGetValue(inputTarget);
    },

    // Ici si le tableau errorArea n'est pas vide alors j'empêche le comportement par défaut de l'événement submit 
    // et j'affiche un message d'erreur dans la div errors
    formIsValid: function(evt) {

        if(app.errorArea.length > 0)
        {
            // https://developer.mozilla.org/fr/docs/Web/API/Event/preventDefault
            evt.preventDefault();
            app.errors.innerHTML += '<p class="error"> Merci de renseigner 3 caractères minimum </p>'
            console.log( app.errors);
            console.error('il y a des erreurs');
        }

    },
    // Je récupère la saisie et je la valide ou non avec le critère des 3 caractère minimum et j'applique le changement 
    // de style css en ajoutant ou en supprimant les class valid et invalid.
    inputGetValue: function(inputTarget) {
        let inputValue = inputTarget.value;
        console.log(inputValue);
        
        if(inputValue.length >= 3)
        {
            inputTarget.classList.add('valid');
            inputTarget.classList.remove('invalid');
            app.errorClear();
        }
        else {
            inputTarget.classList.add('invalid');
            inputTarget.classList.remove('valid'); 
            app.errorArea [0] = inputValue;
            console.log(app.errorArea);
        }
    },

    // Ici j'efface le message d'erreur de la div errors et je vide le tableau errorArea de la saisie erronée de l'utilisateur.
    errorClear: function() {
        // https://developer.mozilla.org/fr/docs/Web/API/Element/innerHTML
        app.errors.innerHTML = '';
        console.log(app.errors);

        app.errorArea.length = 0;
        console.log(app.errorArea.length);
    }
};
// J'initialise ma fonction init qui chargement les fonctionnalités dans le DOM.
// https://developer.mozilla.org/fr/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener('DOMContentLoaded', app.init);