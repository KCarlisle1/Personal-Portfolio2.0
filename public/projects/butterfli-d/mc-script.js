const mcPageHome = document.getElementById('mc-page-home');
const mcPageInfo = document.getElementById('mc-page-info');
const infoTextContainer = document.getElementById('info-text-container');
const infoText = document.getElementById('info-text');

const butterflyImg = document.getElementById('butterfly-image');
const form = document.getElementById('mc-quiz-form');
const labelOne = document.querySelector('label[for="choice-1"]');
const labelTwo = document.querySelector('label[for="choice-2"]');
const labelThree = document.querySelector('label[for="choice-3"]');
const submitBtn = document.getElementById('mc-submit-btn');

const successBoxDiv = document.getElementById('success-box-div');
const successContainer = document.getElementById('success-container')
const successBox = document.getElementById('success-box');
const restartBtn = document.getElementById('restart-btn');

const scoreDiv = document.getElementById('mc-score-div');
const scoreText = document.getElementById('score-text');
const correctOrIncorrect = document.getElementById('c-or-i-span');

let isInfoVisible = false;
let score = 0;
let correctRadioIndex = null;

const infoClicked = () => {
    isInfoVisible = !isInfoVisible;
    if (isInfoVisible) {
        infoTextContainer.style.display = 'block';
        mcPageInfo.textContent = 'Hide Info';
        mcPageInfo.style.zIndex = '1100';
        infoText.textContent = 'The Multiple Choice Quiz presents you with an image of a butterfly and you must select its correct name from a list of options.';
    }
    else {
        infoTextContainer.style.display = 'none';
        mcPageInfo.textContent = "Info";
        mcPageInfo.style.zIndex = '800';
    }
}

const randomImg = async () => {
    try{
        const response = await fetch('./butterflyID.json');
        const data = await response.json();

        scoreDiv.style.display = "block";

        let shownIndexes = JSON.parse(localStorage.getItem('shownImgIndexes')) || []; //to see which images have already been displayed.

        const availableIndexes = data.map((_, i) => i).filter(i => !shownIndexes.includes(i)); //keep only the indexes that havent already been shown.

        if(availableIndexes.length === 0){
            showSuccessBox();
            return;
        }
        
        const newIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];

        butterflyImg.src = `${data[newIndex].image}`
        radioLabels(newIndex);

        shownIndexes.push(newIndex);
        localStorage.setItem('shownImgIndexes', JSON.stringify(shownIndexes)); /*updates the localstorage for future retrieval.
                                                                                   returns the data to a string to be compatible with localstorage.*/
    }
    catch (error){
        console.error("Failed to load forthcoming image data. Error type:", error);
    }
}

const radioLabels = async (indexOne) => {
    try{
        const response = await fetch('./butterflyID.json');
        const data = await response.json();
        
        const nameOne = data[indexOne].name; //the correct name

        let availableIndexes = data.map((_, i) => i).filter(i => i !== indexOne);

        let indexTwo = availableIndexes.splice(Math.floor(Math.random() * availableIndexes.length), 1)[0]; //removes the index from the array so it cannot be selected again.
        const nameTwo = data[indexTwo].name;

        let indexThree = availableIndexes.splice(Math.floor(Math.random() * availableIndexes.length), 1)[0];
        const nameThree = data[indexThree].name;

        let names = [nameOne, nameTwo, nameThree];
        for(let i = names.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [names[i], names[j]] = [names[j], names[i]]; //swaps the current index with a randomly selected one.
        }

        labelOne.textContent = names[0];
        labelTwo.textContent = names[1];
        labelThree.textContent = names[2];

        correctRadioIndex = names.indexOf(nameOne);
    }
    catch (error){
        console.error("Failed to retrieve radio label data. Error type:" , error)
    }
}

const scoreUpdate = (correctOption, selectedOption) => {
    if(correctOption === selectedOption){
        score++;
        scoreText.textContent = score;

        correctOrIncorrect.textContent = "Correct!";
        correctOrIncorrect.style.color = "green";
    }
    else{
        correctOrIncorrect.textContent = "Incorrect!";
        correctOrIncorrect.style.color = "red";
    }

}

const showSuccessBox = (status) => {
    successContainer.style.display = "block";

    if(status === "refresh"){
        successBox.textContent = "The page has been refreshed. Would you like to start the quiz again?";
    }
    else{
        successBox.textContent = `Congratulations! You have completed the test! You scored ${score} out of 58.`;
    }

    scoreDiv.style.display = "none";
    localStorage.clear();
    score = 0;
    scoreText.textContent = "_";
    correctOrIncorrect.textContent = "___";
    correctOrIncorrect.style.color = "black";

    restartBtn.addEventListener('click', () => {
        successContainer.style.display = "none";

        randomImg();
    })
}

mcPageInfo.addEventListener('click', infoClicked);

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const selectedChoice = document.querySelector('input[name="butterfly"]:checked');

    if(!selectedChoice){
        alert("Please select an option");
        return;
    }

    const selectedIndex = parseInt(selectedChoice.value);

    scoreUpdate(correctRadioIndex, selectedIndex);

    selectedChoice.checked = false;

    randomImg();
})

window.addEventListener('DOMContentLoaded', () => {
    const shownIndexes = JSON.parse(localStorage.getItem('shownImgIndexes')) || []; //has image been shown.

    const isReload = performance.getEntriesByType("navigation")[0].type === "reload"; //checks if page load is a reload.

    if(shownIndexes.length === 0){ //will only show image on page refresh if no image is already active.
        randomImg();
    }
    else if (isReload){
        showSuccessBox("refresh");
    }
    else{
        randomImg();
    }
})

window.addEventListener('beforeunload', (event) => {
    const shownIndexes = JSON.parse(localStorage.getItem('shownImgIndexes')) || [];
   if (shownIndexes.length > 0) {
        event.preventDefault();
        localStorage.clear();
        event.returnValue = ''; // (e.g) "Are you sure you want to leave this page?")
    }
})

mcPageHome.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'homepage.html'; // Redirect to the home page
});