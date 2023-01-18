const BASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases';

const caseText = document.querySelector('.case-text')
const caseTitle = document.querySelector('.case-title')
const caseCard = document.querySelector('.case-card')
const userEmail = document.querySelector('.user-email')
const userDateStamp = document.querySelector('.user-date-stamp')


// const id = new URLSearchParams(window.location.search).get('id')

const getPost = async() => {
    const res = await fetch(BASE_URL) // + id
    const post = await res.json() 
     
    console.log(post);
    
    post.forEach(post => {
        caseCard.appendChild(createCardElement(post))
    });

}

getPost()

const createCardElement = (post) => {
    // const card = document.createElement('div')
    // card.className = 'card bg-secondary p-2 mb-3 text-white'
  
    
    // message.innerText = post.message

    caseTitle.innerText = post.subject
    caseText.innerText = post.message
    userEmail.innerText = post.email

    //Gör om datumt till år, månad, dag samt tid
    const newDate = new  Date(post.created);
    userDateStamp.innerText = newDate.toLocaleString(); 
  
    
    
}




//KOMMENTARER

const createCommentElement = (commentData) => {
    let comment = document.createElement('div')
    comment.id = = commentData.id
    comment.classList.add('')
}