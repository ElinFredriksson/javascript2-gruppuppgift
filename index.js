const BASE_URL = "https://fnd22-shared.azurewebsites.net/api/Cases/"



const errandsList = document.querySelector('.errandsList')


// shahrriar
let casesArray = []

const getCases = async () => {
    try {
        const res = await fetch (BASE_URL);
        const cases = await res.json();
        casesArray = cases;

        casesArray.forEach(cases => {
            console.log(cases);
        })

     
    }   catch (error) {
        // console.log(error)
        // console.log("Sorry, something went wrong. Please try again later.")
        displayError(error);
    }


    // shahriars coding
    listCases()

    
        
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
    // errandsList.innerText = ""
    // const casesContainer = document.querySelector('.cases-container')    
    casesArray.forEach(data => {
        const errand = createErrand(data)
        errandsList.appendChild(errand)
                   
    })
    // console.table(casesArray)
}



// errand
const createErrand = (data) => {
    
    

    //Bygg ihop divar
    const errand = document.createElement('div');
    errand.classList.add('errand');
    errand.id = data.id;
    console.log(errand.id)

    const errandTop = document.createElement("div");
    errandTop.classList.add("errandTop");

    const errandBottom = document.createElement('div');
    errandBottom.classList.add('errandBottom');
    
    const errandLeft = document.createElement("div")
    errandLeft.classList.add("errandLeft");

      //innehåll divar 
      const subject = document.createElement("h2");
      subject.classList.add("subject")
      subject.innerText = data.subject;
      
      const message = document.createElement('p');
      message.classList.add("message")
      message.innerText = data.message;

      const email = document.createElement("p");
      email.classList.add("email");
      email.innerHTML = data.email;

      const a = document.createElement("a");
      a.setAttribute("href", './casepage.html' + `?id=${errand.id}`)
      a.innerText = "Details";

    const errandRight = document.createElement('div')
    errandRight.classList.add('errandRight')
        
        
        const firstParagraph = document.createElement('p')
  
          const iDays = document.createElement('i')
          iDays.className = 'fa-solid fa-calendar-days'

  
          const dateCreated = document.createElement('span')
          dateCreated.classList.add('dateCreated') 
        //   dateCreated.innerText = data.created.slice(0,19)
        dateCreated.innerText = new 
        Date(data.created.slice(0,19)).toLocaleString()

  
        const secondParagraph = document.createElement('p')
  
          const comment = document.createElement('i')
          comment.className = 'fa-solid fa-comment'
          comment.innerText = data.comments.length
          
  
          const commentsCount = document.createElement('span')
          commentsCount.classList.add('commentsCount')
  
        const statusLights = document.createElement('div')
        statusLights.classList.add('statusLights')
  
          const faOne = document.createElement('i')
          faOne.className = 'fa-solid fa-circle'
  
          const faTwo = document.createElement('i')
          faTwo.className = 'fa-regular fa-circle'
  
          const faThree = document.createElement('i')
          faThree.className = 'fa-regular fa-circle'

        //bygg ihop arrendLeft
        errandLeft.appendChild(subject);
        errandLeft.appendChild(message);
        errandLeft.appendChild(email);
        errandLeft.appendChild(a);

          //bygg ihop errandRight

          //firstParagraph
          
          firstParagraph.appendChild(iDays)
          firstParagraph.appendChild(dateCreated)
          errandRight.appendChild(firstParagraph)
  
            //secondParagraph
            secondParagraph.appendChild(comment)
            secondParagraph.appendChild(commentsCount)
            errandRight.appendChild(secondParagraph)
  
            //statusLights
          
          statusLights.appendChild(faOne)
          statusLights.appendChild(faTwo)
          statusLights.appendChild(faThree)
          errandRight.appendChild(statusLights)  
  

        //Bygg ihop errandBottom
        errandBottom.appendChild(errandLeft);
        errandBottom.appendChild(errandRight);

        //Bygg ihop errand
        errand.appendChild(errandTop);
        errand.appendChild(errandBottom);
        
        return errand;
}


//Post new message
const messageForm = document.querySelector('#messageForm');


//Validering
const valEmail = (newEmail) => {
    if(newEmail != '') {
        return true;
    }
    else {
        console.log('Add an email')
        return false;
    }
}
const valSubject = (newSubject) => {
    if(newSubject.length > 2) {
        return true;
    }
    else {
        console.log('Subject to short!')
        return false;
    }
}
const valMessage = (newMessage) => {
    if(newMessage.length > 10) {
        return true;
    }
    else {
        console.log('message to short!')
        return false;
    }
}


class Post {
    constructor(newEmail, newSubject, newMessage) {
        this.email = newEmail;
        this.subject = newSubject;
        this.message = newMessage;

    }
}

const validateArray = [] 
const newPost = []




messageForm.addEventListener('submit', e => {
    e.preventDefault();

    const newEmail = document.querySelector('#newEmail').value;
    const newSubject = document.querySelector('#newSubject').value;
    const newMessage = document.querySelector('#newMessage').value;

    validateArray[0] = valEmail(newEmail);
    validateArray[1] = valSubject(newSubject);
    validateArray[2] = valMessage(newMessage);
    
    console.log(validateArray);

    if(validateArray.includes(false)) {
        document.querySelector('.errorMessage').classList.remove('hidden')
    }

    else {
        document.querySelector('.errorMessage').classList.add('hidden')
        const post = new Post(newEmail, newSubject, newMessage)
        newPost.push(post)
        console.log(newPost)
        //Posta meddelande

    }
})














// const newPost = async () => {

//     const newEmail = document.querySelector('#newEmail').value;
//     const newSubject = document.querySelector('#newSubject').value;
//     const newMessage = document.querySelector('#newMessage').value;

//     const post = new Post(newEmail, newSubject, newMessage)
  
//     const pushPost = await fetch(BASE_URL, {
//       method: "POST",
//       body: JSON.stringify(post),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     });
  
//     if (pushPost.status === 200) {
//       casesArray.push(post);
//       console.log(post)
//     } else {
//       throw Error("Failed to post comment");
//     }
//   };



