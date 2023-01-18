const BASE_URL = "https://fnd22-shared.azurewebsites.net/api/Cases";



const getCases = async () => {
    try {
        const res = await fetch (BASE_URL);
        const cases = await res.json();

        console.log(cases);
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

