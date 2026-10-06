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


// Skriv ut recept

