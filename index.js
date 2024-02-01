
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


function countSumbolTitle() {
  const titleLen = postTitleInputNode.value.length;
  const countSumbolTitle =  TITLE_VALIDATHION_LIMIT -  titleLen;
  const messageTitle = "можешь ещё добавить ещё" + " " + countSumbolTitle + " " + "символов";

 
  if (titleLen <= TITLE_VALIDATHION_LIMIT) {
    titleCountSumbol.innerHTML = messageTitle;
  }
}

  function countSumbolText() {
   
    const textLen = postTextInputNode.value.length;
    const countSumbolText =  TEXT_VALIDATHION_LIMIT -  textLen; 
    const messageText = "можешь ещё добавить ещё" + " " + countSumbolText + " " + "символов";
   
         
    if (textLen <= TEXT_VALIDATHION_LIMIT) {
     textCountSumbol.innerHTML = messageText;
      newPostBtnNode.removeAttribute('disabled');
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
  const titlestring = postTitleInputNode.value;
  const title = titlestring.trim();

  const textstring = postTextInputNode.value;
  const text = textstring.trim();


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





