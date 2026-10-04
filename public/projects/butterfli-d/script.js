const homePageInfo = document.getElementById('home-page-info');
const infoText = document.getElementById('info-text');
const infoTextContainer = document.getElementById('info-text-container');
const multipleChoiceInfo = document.getElementById('mc-info');
const singleChoiceInfo = document.getElementById('sc-info');
const indexInfo = document.getElementById('index-info');
const multipleChoiceBtn = document.getElementById('mc');
const singleChoiceBtn = document.getElementById('sc');
const indexBtn = document.getElementById('index');
const quizSelectForm = document.getElementById('quiz-select-form');

let isInfoVisible = false;

const infoClicked = (button) => {
    isInfoVisible = !isInfoVisible;
    if (isInfoVisible) {
        infoTextContainer.style.display = 'block';
        button.textContent = 'Hide Info';
        button.style.zIndex = '1100';

        switch (button) {
            case homePageInfo:
                infoText.textContent = 'This website is designed to help wildlife enthusiasts to improve their British butterfly identification. Please select a quiz to begin.';
                break;
            case multipleChoiceInfo:
                infoText.textContent = 'The Multiple Choice Quiz presents you with an image of a butterfly and you must select its correct name from a list of options.';
                break;
            case singleChoiceInfo:
                infoText.textContent = 'The Single Choice Quiz presents you with an image of a butterfly and you must enter its correct name without options to choose from.';
                break;
            case indexInfo:
                infoText.textContent = 'The Index provides a list of each native British butterfly along with their respective locations. Use for educational and revision purposes.';
                break;
            default:
                infoText.textContent = 'No information available for this button.';
                break;
        }
    }
    else {
        infoTextContainer.style.display = 'none';
        if(button === homePageInfo){
            button.textContent = 'Info';
        }
        else{
            button.textContent = '?';
        }
        button.style.zIndex = '800';
    }
}

const goToQuiz = (quizType) => {
    quizSelectForm.action = `${quizType}.html`;
}


homePageInfo.addEventListener('click', () => infoClicked(homePageInfo));
multipleChoiceInfo.addEventListener('click', () => infoClicked(multipleChoiceInfo));
singleChoiceInfo.addEventListener('click', () => infoClicked(singleChoiceInfo));
indexInfo.addEventListener('click', () => infoClicked(indexInfo));

multipleChoiceBtn.addEventListener('click', () => goToQuiz('multiple-choice'));
singleChoiceBtn.addEventListener('click', () => goToQuiz('single-choice'));
indexBtn.addEventListener('click', () => goToQuiz('butterfly-index'));
