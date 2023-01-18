const BASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases';

const caseText = document.querySelector('.case-text')
const caseTitle = document.querySelector('.case-title')
const caseCard = document.querySelector('.case-card')
const userEmail = document.querySelector('.user-email')
const userDateStamp = document.querySelector('.user-date-stamp')

const commentWrapper = document.querySelector('#comment-wrapper')

const comments = []


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
    caseTitle.innerText = post.subject
    caseText.innerText = post.message
    userEmail.innerText = post.email

    //Gör om datumt till år, månad, dag samt tid
    const newDate = new  Date(post.created);
    userDateStamp.innerText = newDate.toLocaleString(); 
    
}

// Tömmer våran HTML

// const commentList = ()=> {
//     commentWrapper.innerHTML = " "
//     comment.forEach(comment => {
//     const commentElement =  createCommentElement(comment) 
//         commentList.appendChild(commentElement)


//     })
// }

const createCommentElement = (commentData) => {
    let comment = document.createElement('div')
    comment.id = commentData.id
    comment.classList.add('comment-content')

    
}
// const newComment = {
//     comments: document.querySelector(".comment-content").value,
// }

// const addComment = () => {
//     fetch(BASE_URL + id , {
//         method: "PUT",
//         body:JSON.stringify(newComment),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8', 
//         },
//         })
//         then((response)=> response.json())
//         .then((data) => {
//             commets.push(data) 
//             const commentElement = createComment(data)
//         }

//     }



//KOMMENTARER


// JavaScript
const form = document.querySelector('#comment-form');
form.addEventListener('submit', submitComment);

function submitComment(event) {
  event.preventDefault();
  
  const commentText = document.querySelector('#comment-text').value;
  
  // Fetch API
  fetch('https://fnd22-shared.azurewebsites.net/api/Cases/Comments', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ comments: commentText })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to submit comment');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
}
