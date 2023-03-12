let comments = [];
loadComments();

let form = document.getElementById('form');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  let commentName = document.getElementById('comment-name');
  let commentText = document.getElementById('comment-text');
  let commentDate = document.getElementById('comment-date');
  let commentTime;
  if(commentDate.value == '') {
    commentTime = Math.floor(Date.now())
  } else {
    commentTime = Date.parse(commentDate.value);
  }

  let comment = {
    name: commentName.value,
    text: commentText.value,
    time: commentTime,
    like: false
  }

  commentName.value = '';
  commentText.value = '';

  comments.push(comment);

  saveComments();
  location.reload();
})

function saveComments(){
  localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments(){
  if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
  showComments();
}

function showComments(){
  document.getElementById('comment-field').innerHTML = '';
  let commentField = document.getElementById('comment-field');
  comments.forEach(function(item){
    let out = '';
    let div = document.createElement('div');
    div.classList.add('comment-field-item');
    out += `<p class="comment-field-item-name">${item.name}</p>`;
    out += `<p class="comment-field-item-time">${timeConverter(item.time)}</p>`;
    out += `<p class="comment-field-item-text">${item.text}</p>`;
    if (item.like == false) {
      out += `<div class="comment-field-item-like like-no"></div>`;
    } else {
      out += `<div class="comment-field-item-like like-yes"></div>`;
    }
    out += `<div class="comment-field-item-delete"></div>`;
    div.innerHTML = out;
    commentField.appendChild(div);
  });
}

function timeConverter(unixMilliSeconds) {
  let myDate = new Date(unixMilliSeconds);
  let nowDate = new Date(Math.floor(Date.now()));
  let hour = ("0" + myDate.getHours()).slice(-2);
  let minute = ("0" + myDate.getMinutes()).slice(-2);
  let second = ("0" + myDate.getSeconds()).slice(-2);
  let dayDiff = Math.floor((nowDate - myDate) / (1000*60*60*24));
  switch (dayDiff) {
    case 0:
      return `Сегодня, ${hour}:${minute}:${second}`
    case 1:
      return `Вчера, ${hour}:${minute}:${second}`
  }
  console.log(dayDiff);
  return myDate.toLocaleString();
}

let likes = document.querySelectorAll(".comment-field-item-like");
for(let i = 0; i < likes.length; i++) {
  likes[i].addEventListener("click", (event) => {
    event.target.classList.toggle("like-no");
    event.target.classList.toggle("like-yes");
    console.log(i);
    if (event.target.classList.contains("like-yes")) {
      comments[i].like = true;
    } else {
      comments[i].like = false;
    }
    saveComments();
  })
}

let del = document.querySelectorAll(".comment-field-item-delete");
for(let i = 0; i < del.length; i++) {
  del[i].addEventListener("click", (event) => {
    comments.splice(i, 1);
    console.log(comments);
    saveComments();
    location.reload();
  })
}