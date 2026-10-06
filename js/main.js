"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Linus Falk
 */

// Hämta element från DOM
const form = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const formError = document.querySelector("#error");
const apiError = document.querySelector("#message");
const recipeSection = document.querySelector("#recipe");


// Validera sökfält
function validateSearch() {

    // Töm formError
    formError.textContent = "";

    // Checkar ifall formuläret är tomt
    if (searchInput.value.trim() === "") {
        formError.textContent = "Felaktig inmatning. Testa ny sökfras.";
        return false;
    }

    return true;
}

// Hämta recept
function getRecipe() {

}

// Skriv ut recept


// Eventlyssnare för recept söknings formuläret 
form.addEventListener("submit", function(event) {

    // Hindrar sidan att läsas om
    event.preventDefault();

    // Kollar att validateSearch kommer tillbaka true för att kunna hämta receptet
    if (validateSearch() === true) {

        // Anropar getRecipe för att få receptet
        getRecipe();
    }
});