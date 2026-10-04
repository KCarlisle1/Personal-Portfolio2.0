const scPageHome = document.getElementById('sc-page-home');
const scPageInfo = document.getElementById('sc-page-info');
const infoTextContainer = document.getElementById('info-text-container');
const infoText = document.getElementById('info-text');

const butterflyImg = document.getElementById('butterfly-image');
const form = document.getElementById('sc-quiz-form');
const userInput = document.getElementById('sc-choice-input');
const submitBtn = document.getElementById('sc-submit-btn');

const successBoxDiv = document.getElementById('success-box-div');
const successContainer = document.getElementById('success-container')
const successBox = document.getElementById('success-box');
const restartBtn = document.getElementById('restart-btn');

const scoreDiv = document.getElementById('sc-score-div');
const scoreText = document.getElementById('score-text');
const correctOrIncorrect = document.getElementById('c-or-i-span');

let isInfoVisible = false;
let score = 0;
let correctResponse = null;

const infoClicked = () => {
    isInfoVisible = !isInfoVisible;
    if (isInfoVisible) {
        infoTextContainer.style.display = 'block';
        scPageInfo.textContent = 'Hide Info';
        scPageInfo.style.zIndex = '1100';
        infoText.textContent = 'The Single Choice Quiz presents you with an image of a butterfly and you must type its correct name into the text box provided.';
    }
    else {
        infoTextContainer.style.display = 'none';
        scPageInfo.textContent = "Info";
        scPageInfo.style.zIndex = '800';
    }
}

const randomImg = async () => {
    try{
        const response = await fetch('./butterflyID.json');
        const data = await response.json();

        scoreDiv.style.display = "block";

        let shownIndexes = JSON.parse(localStorage.getItem('shownImgIndexes')) || []; 

        const availableIndexes = data.map((_, i) => i).filter(i => !shownIndexes.includes(i));

        if(availableIndexes.length === 0){
            showSuccessBox();
            return;
        }

        const newIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];

        butterflyImg.src = `${data[newIndex].image}`
        correctResponse = data[newIndex].name;

        shownIndexes.push(newIndex);
        localStorage.setItem('shownImgIndexes', JSON.stringify(shownIndexes));

    }
    catch(error){
        console.error('Failed to recieve forthcoming image data. Error type:', error);
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
    scoreText.textContent = "_"
    correctOrIncorrect.textContent = "___";
    correctOrIncorrect.style.color = "black";

    restartBtn.addEventListener('click', () => {
        successContainer.style.display = "none";

        randomImg();
    })
}

const scoreUpdate = (enteredName, correctName) => {

    const trimmedEnteredName = enteredName.replace(/-/g, ' ').toLowerCase().trim(); //regex to replace hyphens with spaces.
    const trimmedCorrectName = correctName.replace(/-/g, ' ').toLowerCase().trim();

    if(trimmedEnteredName === trimmedCorrectName){
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

scPageInfo.addEventListener('click', infoClicked);

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const userResponse = userInput.value.trim();
    if(userResponse === ""){
        alert("Please enter a response before submitting.");
        return;
    }

    scoreUpdate(userResponse, correctResponse);
    userInput.value = "";
    randomImg();
});

window.addEventListener('DOMContentLoaded', () => {
    const shownIndexes = JSON.parse(localStorage.getItem('shownImgIndexes')) || [];

    const isReload = performance.getEntriesByType("navigation").some(nav => nav.type === "reload");
    
    if(shownIndexes.length === 0){
        randomImg();
    }
    else if (isReload){
        showSuccessBox("refresh");
    }
    else{
        randomImg();
    }
});

window.addEventListener('beforeunload', (event) => {
    const shownIndexes = JSON.parse(localStorage.getItem('shownImgIndexes')) || [];
    if(shownIndexes.length > 0){
        event.preventDefault();
        localStorage.clear();
        event.returnValue = '';
    }
});

scPageHome.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'homepage.html';
});