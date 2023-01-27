const BASE_URL = "https://fnd22-shared.azurewebsites.net/api/Cases/";
const COMMENTS_URL = "https://fnd22-shared.azurewebsites.net/api/Comments/";

const id = new URLSearchParams(window.location.search).get('id')

console.log(id)


const caseText = document.querySelector(".case-text");
const caseTitle = document.querySelector(".case-title");
const caseCard = document.querySelector(".case-card");
const userEmail = document.querySelector(".user-email");
const userDateStamp = document.querySelector(".user-date-stamp");
const form = document.querySelector("#comment-form");
const commentContent = document.querySelector(".comment-content");


const comments = [];

// const id = new URLSearchParams(window.location.search).get('id')

const createHtmlComment = (comment) => {
  let commentCard = document.createElement("div");
  commentCard.className = "comment-card";

  const message = document.createElement("p");
  message.className = "comment-content";
  message.innerText = comment.message;

  const email = document.createElement("p");
  email.className = "comment-email";
  email.innerText = comment.email;

  const created = document.createElement("p");
  created.className = "comment-date-stamp";

  const newDate = new Date(comment.created);
  created.innerText = newDate.toLocaleString();

  commentCard.appendChild(message);
  commentCard.appendChild(email);
  commentCard.appendChild(created);

  return commentCard;
};

const getPost = async () => {
  const res = await fetch(BASE_URL + id); // + id
  const post = await res.json();

  console.log(post);

  caseTitle.innerText = post.subject;
  userEmail.innerText = post.email;
  caseText.innerText = post.message;

  //Gör om datumt till år, månad, dag samt tid
  const newDate = new Date(post.created);
  userDateStamp.innerText = newDate.toLocaleString();

  const commentsContainer = document.querySelector(".comment-container");

  // sort-funktionen ligger utanför loopen så att den inte modifierar arrayen. a,b är från första till sista (annars tvärtom)
  post.comments.sort((a, b) => new Date(b.created) - new Date(a.created));
  post.comments.forEach((comment) => {
    const commentCard = createHtmlComment(comment);

    commentsContainer.appendChild(commentCard);

    // commentCard.sort(newDate);
    console.log(commentCard);
    s_color(post.statusId);
    let colors = document.querySelector('#colors');
    colors.value = post.statusId;

    return commentCard;


  });
};

getPost();

const handleSubmit = async (e) => {
  e.preventDefault();

  const newPost = {
    caseId: id,
    email: document.querySelector("#email").value,
    message: document.querySelector("#comment-text").value,
  };

  const response = await fetch(COMMENTS_URL, {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (response.status === 200) {
    comments.push(newPost);
    const commentsContainer = document.querySelector(".comment-container");
    const commentsCard = createHtmlComment({
      ...newPost,
      created: Date.now(),
    });
    commentsContainer.insertBefore(commentsCard, commentsContainer.firstChild);
  } else {
    throw Error("Failed to post comment");
  }
};

form.addEventListener("submit", handleSubmit);




function s_color(statusId) {
let container = document.querySelector('.case-color-status');
  // statusId = parseInt(statusId)

  if (statusId === 1) {
    container.style.backgroundColor = "Red";
  }
  else if (statusId === 2) {
    container.style.backgroundColor = "Orange";
  }
  else if (statusId === 3) {
    container.style.backgroundColor = "Green";
  }

  console.log(statusId);
}



let colors = document.querySelector('#colors');

colors.addEventListener('change' , () => {

  s_color(colors.value);

  const statusUpdate = {
    id: id,
    statusId: colors.value,
}

    fetch(BASE_URL + id, {
    method: "PUT",
    body: JSON.stringify(statusUpdate),
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  
  
  
  }) 
})