const BASE_URL = "https://fnd22-shared.azurewebsites.net/api/Cases"

const caseList = document.querySelector('.errand')


// shahrriar
let caseArrays = []

const getCases = async () => {
    try {
        const res = await fetch (BASE_URL);
        const cases = await res.json();
        casesArray = cases;

        // const subject = document.querySelector('.subject');
        // subject.innerText = casesArray[0].subject;

        // const message = document.querySelector('.message');
        // message.innerText = casesArray[0].message;




        // const email = document.querySelector(".email");
        // email.innerHTML = casesArray[0].email;

        console.log(caseArrays);
    }   catch (error) {
        // console.log(error)
        // console.log("Sorry, something went wrong. Please try again later.")
        displayError(error);
    }


    // shahriars coding

    listCases();
        
}

getCases()

const displayError = (error) => {
    // Get the modal
    const modal = document.getElementById("errorModal");
    // Get the <p> element that will display the error message
    const errorMessage = document.getElementById("errorMessage");
    // Set the error message
    errorMessage.textContent = `Sorry, something went wrong. Error: ${error}`;
    // Show the modal
    modal.style.display = "block";
}

const closeModal = () => {
    const modal = document.getElementById("errorModal");
    modal.style.display = "none";
}
const closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", closeModal);

//Prevents the webpage from reloading (default)
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
});


const listCases = () => {

    // const casesContainer = document.querySelector('.cases-container')    
    caseArrays.forEach( data => {
        const caseElement = createCaseElement(data)
        caseList.appendChild(caseElement)
    })
}

// // errand
const createCaseElement = (data) => {

    let createDiv = document.createElement('div');
    createDiv.classList.add('errand');
    createDiv.id = data.id;

    let createDiv2 = document.createElement('div');
    createDiv2.classList.add('errandBottom');

    let text = document.createElement('p');
    text.innerText = data.message;
    
    let button = document.createElement('button');
    button.innerText = "details";
    button.addEventListener('click', function(){
        //Code to execute on click
    });

    createDiv2.appendChild(text);
    createDiv2.appendChild(button);
    createDiv.appendChild(createDiv2);

    return createDiv;
}
