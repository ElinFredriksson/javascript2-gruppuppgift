const BASE_URL = "https://fnd22-shared.azurewebsites.net/api/Cases/"

const errandsList = document.querySelector('.errandsList')


// shahrriar
let casesArray = []

const getCases = async () => {
    try {
        const res = await fetch (BASE_URL);
        const cases = await res.json();
        casesArray = cases;

       

        console.log(casesArray);
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
    casesArray.forEach(data => {
        const errand = createErrand(data)
        errandsList.appendChild(errand)
    })
}

// errand
const createErrand = (data) => {
    

    //Bygg ihop divar
    const errand = document.createElement('div');
    errand.classList.add('errand');
    errand.id = data.id;

    const errandTop = document.createElement("div");
    errandTop.classList.add("errandTop");

    const errandBottom = document.createElement('div');
    errandBottom.classList.add('errandBottom');
    
    const errandLeft = document.createElement("div")
    errandLeft.classList.add("errandLeft");

      //innehåll divar 
      const subject = document.createElement("h2");
      subject.classList.add("subject")
      subject.innerText = casesArray[0].subject;
      
      const message = document.createElement('p');
      message.classList.add("message")
      message.innerText = casesArray[0].message;

      const email = document.createElement("p");
      email.classList.add("email");
      email.innerHTML = casesArray[0].email;

      const a = document.createElement("a");
      a.setAttribute("href", BASE_URL + `?id=${data.id}`)
      a.innerText = "Details";

    const errandRight = document.createElement('div')
    errandRight.classList.add('errandRight')
        
        
        const firstParagraph = document.createElement('p')
  
          const iDays = document.createElement('i')
          iDays.classList.add('fa-solid&nbsp;fa-calendar-days')

  
          const dateCreated = document.createElement('span')
          dateCreated.classList.add('dateCreated') 
          dateCreated.innerText = casesArray[0].created.slice(0,10)
  
        const secondParagraph = document.createElement('p')
  
          const comment = document.createElement('i')
          comment.classList.add('fa-solid&nbsp;fa-comment')
          comment.innerText = casesArray[0].comments
          
  
          const commentsCount = document.createElement('span')
          commentsCount.classList.add('commentsCount')
  
        const statusLights = document.createElement('div')
        statusLights.classList.add('statusLights')
  
          const faOne = document.createElement('i')
          faOne.classList.add('fa-solid&nbsp;fa-circle')
  
          const faTwo = document.createElement('i')
          faTwo.classList.add('fa-regular&nbsp;fa-circle')
  
          const faThree = document.createElement('i')
          faThree.classList.add('fa-regular&nbsp;fa-circle')

        //bygg ihop arrendLeft
        errandLeft.appendChild(subject);
        errandLeft.appendChild(message);
        errandLeft.appendChild(email);
        errandLeft.appendChild(a);

          //bygg ihop errandRight

          //firstParagraph
          errandRight.appendChild(secondParagraph)
          errandRight.appendChild(iDays)
          errandRight.appendChild(dateCreated)
  
            //secondParagraph
          errandRight.appendChild(secondParagraph)
          errandRight.appendChild(comment)
          errandRight.appendChild(commentsCount)
  
            //statusLights
          errandRight.appendChild(statusLights)  
          errandRight.appendChild(faOne)
          errandRight.appendChild(faTwo)
          errandRight.appendChild(faThree)
  

        //Bygg ihop errandBottom
        errandBottom.appendChild(errandLeft);
        errandBottom.appendChild(errandRight);

        //Bygg ihop errand
        errand.appendChild(errandTop);
        errand.appendChild(errandBottom);
        
        return errand;
}





