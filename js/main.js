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
        recipeSection.textContent = "";
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
            recipeSection.textContent = "";
            return;
        }

        const recipe = data.recipes[0]; // Hämtar första objektet i arrayen
        
        //Anropar printRecipe
        printRecipe(recipe);

    } catch (error) {
        apiError.textContent = "Ett fel uppstod vid hämtning av receptet."; // Felmeddelande för användaren
        recipeSection.textContent = ""; // Rensar ifall API anropet misslyckas.
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

    // Lägger till bild
    const image = document.createElement("img");
    image.src = recipe.image;
    image.alt = recipe.name;


    // Skapar paragraferna
    const recipeInfo = document.createElement("div");
    recipeInfo.classList.add("recipe-info");

    // Skapa en paragraf för servings
    const servings = document.createElement("p");
    servings.textContent = "Servings: " + recipe.servings;

    // Skapa en paragraf för prep time
    const prepTime = document.createElement("p");
    prepTime.textContent = "Prep time: " + recipe.prepTimeMinutes;

    // Skapa en paragraf för Cooking time
    const cookingTime = document.createElement("p");
    cookingTime.textContent = "Cooking time: " + recipe.cookTimeMinutes;

    // Skapa en paragraf för difficulty
    const recipeDifficulty = document.createElement("p");
    recipeDifficulty.textContent = "Difficulty: " + recipe.difficulty;


    // Skapar sektionen för ingredienser och instruktioner
    const recipeDetails = document.createElement("div");

    // Skapar rubrik för ingredienserna
    const ingredientsHeading = document.createElement("h4");
    ingredientsHeading.textContent = "Ingredients";

    // Skapar rubrik för instruktionerna
    const instructionsHeading = document.createElement("h4");
    instructionsHeading.textContent = "Instructions";

    // Skapar samlings elementet för ingredienserna från for loopen
    const ingredientsList = document.createElement("ul");

    // Skapar samlings element för instruktioner från for loopen
    const instructionsList = document.createElement("ol");

    // for loop för att gå igenom arrayen för ingrediens
    for (let i = 0; i < recipe.ingredients.length; i++) {
        const ingredListEl = document.createElement("li");
        ingredListEl.textContent = recipe.ingredients[i];

        ingredientsList.appendChild(ingredListEl); // lägger till den aktuella ingrediensen i ingredienslistan
    }

    // for loop för att gå igenom arrayen för instruktioner
    for (let i = 0; i < recipe.instructions.length; i++) {
        const instListEl = document.createElement("li");
        instListEl.textContent = recipe.instructions[i];

        instructionsList.appendChild(instListEl); // lägger till den aktuella ingrediensen i instruktionslistan
    }

    // Lägger till alla paragrafer i recipeInfo
    recipeInfo.append(servings, prepTime, cookingTime, recipeDifficulty);

    // Lägger till alla paragrafer i recipeDetails
    recipeDetails.append(ingredientsHeading, ingredientsList, instructionsHeading, instructionsList);

    // Lägger till Maträttens namn och bild
    article.append(heading, image, recipeInfo, recipeDetails);

    // Lägger till article i recipeSection
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