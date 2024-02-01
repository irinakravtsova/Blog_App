
const posts = [];

const TITLE_VALIDATHION_LIMIT = 10;
const TEXT_VALIDATHION_LIMIT = 20;


const postTitleInputNode = document.querySelector(".js-post-title-input");
const postTextInputNode = document.querySelector(".js-post-text-input");
const newPostBtnNode = document.querySelector(".js-new-post-btn");
const postsNode = document.querySelector(".js-posts");
const validationMessage = document.getElementById("validationMessage");
const titleCountSumbol = document.querySelector(".title__countSumbol");
const textCountSumbol = document.querySelector(".text__countSumbol");

newPostBtnNode.setAttribute('disabled', true);

let titleLen = postTitleInputNode.value.length;
let textLen = postTextInputNode.value.length;
let countTitle =  TITLE_VALIDATHION_LIMIT -  titleLen;  
let countText =  TEXT_VALIDATHION_LIMIT -  textLen; 
console.log(titleLen);

function activeButton() {}

function countSumbolTitle() {
  let titleLen = postTitleInputNode.value.length;
  let countSumbolTitle =  TITLE_VALIDATHION_LIMIT -  titleLen;  
 
  if (titleLen <= TITLE_VALIDATHION_LIMIT) {
    document.querySelector(".title__countSumbol").innerHTML = "можешь ещё добавить ещё" + " " + countSumbolTitle + " " + "символов";
    newPostBtnNode.setAttribute('disabled', true);
  }
  else {
    document.querySelector(".title__countSumbol").innerHTML = "длина заголовка не должна превышать" + " "+ TITLE_VALIDATHION_LIMIT+" "+ "символов";
  };
}

  function countSumbolText() {
   
    let textLen = postTextInputNode.value.length;
    let countSumbolText =  TEXT_VALIDATHION_LIMIT -  textLen; 
         
    if (textLen <= TEXT_VALIDATHION_LIMIT) {
      document.querySelector(".text__countSumbol").innerHTML = "можешь ещё добавить ещё" + " " + countSumbolText + " " + "символов";
      newPostBtnNode.removeAttribute('disabled');
    }
    else {
      document.querySelector(".text__countSumbol").innerHTML = "длина сообщения не должна превышать" + " " + TEXT_VALIDATHION_LIMIT + " " + "символов"; 
      newPostBtnNode.setAttribute('disabled', true);
    }
  }

newPostBtnNode.addEventListener('click', function() {

 const postFromUser = getPostFromUser();//1.получи данные от пользователя

 addPost(postFromUser);//2.добавь полученные данные в виде объекта в массив

 renderPosts(); //отобрази 

 clearForm(); //очисти инпуты

});


function getPostFromUser() {
  //получи данные из postTitleInputNode и postTextInputNode
  const title = postTitleInputNode.value;
  const text = postTextInputNode.value;

  return {
    title: title,
    text: text
};
}

function addPost({title, text}) { 

  const currentDate = new Date();
  const dt =`${ currentDate.toLocaleString().slice(0, 10) + currentDate.toLocaleString().slice(11, -3)}`;
  
  posts.push({
    dt: dt,
    title: title,
    text: text
  });
}

  function getPosts() {
  return posts;
}

function renderPosts() {
  const posts = getPosts();

  let postsHTML = ''; //формируем postsHTML изначально пустой

  posts.forEach(post => { //на каждой итерации цикла делай прибавление всей конструкции, которая в `шаблонной строке` 
  postsHTML += `
    <div class='post'>
      <p class='post__date'>${post.dt}</p>
      <h3 class='post__title'>${post.title}</h3>
      <div class "post__text-wrapper">

      <p class='post__text'>${post.text}</p>
      </div>
    </div>
`
});

 postsNode.innerHTML = postsHTML; //подставь переменную postsHTML в  postsNode и выведи innerHTML  

} 
function clearForm() {
  postTitleInputNode.value = '';
  postTextInputNode.value = '';
  titleCountSumbol.innerHTML = '';
  textCountSumbol.innerHTML = '';

  newPostBtnNode.setAttribute('disabled', true);
}





