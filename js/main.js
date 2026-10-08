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
async function getRecipe() {

    // skapa konstanter
    const searchFood = searchInput.value.trim();
    const url = "https://dummyjson.com/recipes/search?q=" + searchFood;

    try {

        apiError.textContent = "";
        const response = await fetch(url); // Hämtar svar ifrån API

        // Checkar att API anropet lyckades 
        if (!response.ok) {
            throw new Error("Fel vid hämtning... ");
        }

        const data = await response.json(); // Omvandlar JSON strängar till JS data

        if(data.recipes.length === 0) {

            apiError.textContent = "Inget recept hittades! Testa ny sökfras.";
            return;
        }

        const recipe = data.recipes[0]; // Hämtar första objektet i arrayen
        //Anropar printRecipe
        printRecipe(recipe);

    } catch (error) {
        apiError.textContent = "Ett fel uppstod vid hämtning av receptet."; // Felmeddelande för användaren
        console.error("Ett fel uppstod: ", error);
    }

}

// Skriv ut recept
function printRecipe(recipe) {

    // Tömmer recept sektionen
    recipeSection.textContent = "";

    // Skapar en article
    const article = document.createElement("article");

    // Skapar en rubrik
    const heading = document.createElement("h3");
    heading.textContent = recipe.name;

    // Skapar en paragraf
   // const paragraph = document.createElement("p");
    //paragraph.textContent = recipe.servings;

    article.appendChild(heading);
    //article.appendChild(paragraph);

    recipeSection.appendChild(article);
}


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