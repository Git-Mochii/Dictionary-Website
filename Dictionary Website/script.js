// Constants
const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// DOM elements
const resultContainer = document.getElementById("result");
const inputWordInput = document.getElementById("inp-word");
const searchButton = document.getElementById("search-btn");

// Function to fetch word data from the API
async function fetchWordData(word) {
    try {
        const response = await fetch(`${apiUrl}${word}`);

        if (!response.ok) {
            throw new Error("Word not found");
        }

        const [wordData] = await response.json();
        return wordData;
    } catch (error) {
        throw error;
    }
}

// Function to update the result container with word data
function updateResult(userInput, wordData) {
    const { word, meanings } = wordData;

    if (!meanings || meanings.length === 0) {
        resultContainer.innerHTML = `<h3 class="error">No definitions found for "${userInput}"</h3>`;
        return;
    }

    const { partOfSpeech = "", phonetic = "", definitions, example } =
        meanings[0] || {};

    const wordElement = resultContainer.querySelector(".word h3");
    const partOfSpeechElement = resultContainer.querySelector(".details p:nth-child(1)");
    const phoneticElement = resultContainer.querySelector(".details p:nth-child(2)");
    const meaningElement = resultContainer.querySelector(".word-meaning");
    const exampleElement = resultContainer.querySelector(".word-example");

    wordElement.textContent = word;
    partOfSpeechElement.textContent = partOfSpeech;
    phoneticElement.textContent = `/${phonetic}/`;
    meaningElement.textContent = definitions && definitions[0] ? definitions[0].definition : "";
    exampleElement.textContent = example || "";
}



// Function to handle errors and display them in the result container
function handleErrors(error) {
    resultContainer.innerHTML = `<h3 class="error">${error.message}</h3>`;
}

// Add event listener for search button click
searchButton.addEventListener("click", async () => {
    const userInput = inputWordInput.value.trim();

    if (!userInput) {
        return;
    }

    try {
        const wordData = await fetchWordData(userInput);
        updateResult(userInput, wordData);
    } catch (error) {
        handleErrors(error);
    }
});
