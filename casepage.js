const BASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases/';
const COMMENTS_URL = 'https://fnd22-shared.azurewebsites.net/api/Comments';


const caseText = document.querySelector('.case-text')
const caseTitle = document.querySelector('.case-title')
const caseCard = document.querySelector('.case-card')
const userEmail = document.querySelector('.user-email')
const userDateStamp = document.querySelector('.user-date-stamp')
const form = document.querySelector('#comment-form')
const commentContent = document.querySelector('.comment-content')

const comments = []


// const id = new URLSearchParams(window.location.search).get('id')

const getPost = async() => {
    const res = await fetch(BASE_URL + '6248b324-bc30-4df0-a441-76d3400252bb') // + id
    const post = await res.json() 
     
    console.log(post);
    
   
        
        caseTitle.innerText = post.subject
        caseText.innerText = post.message
        userEmail.innerText = post.email

         //Gör om datumt till år, månad, dag samt tid
    const newDate = new  Date(post.created);
    userDateStamp.innerText = newDate.toLocaleString();
    

    const commentsContainer = document.querySelector('.comment-container');

    // sort-funktionen ligger utanför loopen så att den inte modifierar arrayen. a,b är från första till sista (annars tvärtom)
    post.comments.sort((a, b) => new Date(b.created) - new Date(a.created));
    post.comments.forEach(comment => {
        let commentCard = document.createElement('div')
        commentCard.className = 'comment-card'
      
        const message = document.createElement('p')
        message.className = 'comment-content'
        message.innerText = comment.message
        
        const email = document.createElement('p')
        email.className = 'comment-email'
        email.innerText = comment.email


        const created =document.createElement('p')
        created.className = 'comment-date-stamp'

        const newDate = new  Date(comment.created);
        created.innerText = newDate.toLocaleString();

        // created.innerText = comment.created
      
        
        commentCard.appendChild(message)
        commentCard.appendChild(email)
        commentCard.appendChild(created)

        commentsContainer.appendChild(commentCard)

        // commentCard.sort(newDate);
        console.log(commentCard);
        return commentCard
        
    });
}

getPost()



form.addEventListener('submit', event => {
    event.preventDefault();
// const handleSubmit = e => {
//     e.preventDefault()

   const newComment = {
    email: document.querySelector('#email').value,
    message: document.querySelector('#comment-text').value,
    }

    fetch  (COMMENTS_URL,  {
        method: 'POST', 
        body: JSON.stringify(newComment) ,
        headers:  {
        'Content-type': 'application/json; charset=UTF-8',
        },
        
    }) 

    .then(function(response){ 
        return response.json()})
    .then(function(data)
        {console.log(data)





    comments.push(data)
 
    console.log(newComment) 
    console.log(COMMENTS_URL);
    });

 
})

// form.addEventListener('submit', handleSubmit)


//.then((response) => response.json()) 
//.then((data) => {