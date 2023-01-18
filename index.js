const BASE_URL = "https://fnd22-shared.azurewebsites.net/api/Cases/";

let casesArray = [];

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



    }   catch (error) {
        // console.log(error)
        // console.log("Sorry, something went wrong. Please try again later.")
        displayError(error);
    }
        
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

