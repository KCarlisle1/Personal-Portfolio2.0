const indexPageHome = document.getElementById('index-page-home');
const indexPageInfo = document.getElementById('index-page-info');
const infoTextContainer = document.getElementById('info-text-container');
const infoText = document.getElementById('info-text');

const butterflyTileDiv = document.getElementById('butterfly-tile-div');

let isInfoVisible = false;

const infoClicked = () => {
    isInfoVisible = !isInfoVisible;
    if (isInfoVisible) {
        infoTextContainer.style.display = 'block';
        indexPageInfo.textContent = 'Hide Info';
        indexPageInfo.style.zIndex = '1100';
        infoText.textContent = 'The Index provides a list of each native British butterfly along with their respective locations. Use for educational and revision purposes.';
    }
    else {
        infoTextContainer.style.display = 'none';
        indexPageInfo.textContent = "Info";
        indexPageInfo.style.zIndex = '800';
    }
}

const showGallery = async () =>{
    try{
        const response = await fetch('./butterflyID.json');
        const data = await response.json();

        for(const butterfly of data){
            butterflyTileDiv.innerHTML += `
            <div class="butterfly-tile">
                <img class="butterfly-tile-img" src="${butterfly.image}" alt="Butterfly Image">
                <p class="butterfly-tile-name">${butterfly.name}</p>
                <p class="butterfly-tile-location">Found in: <span id="location-span">${butterfly.location}</span></p>
            </div>
            `
        };
    }
    catch(error){
        console.error('Error fetching butterfly data. Error type:', error);
    }
}

showGallery();

indexPageInfo.addEventListener('click', infoClicked);
indexPageHome.addEventListener('click', () => {
    window.location.href = 'homepage.html';
});