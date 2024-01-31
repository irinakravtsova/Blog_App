// // этап 1 создаем форму для заголовка и кнопку

// let postTitle = ''; //создаем переменную заголовка поста изначально пустую

// //postTitle = 'Это заголовок поста'; //проверяем присвоение переменной

// //будем работать с полем ввода и кнопкой, в html добавляем класс для js (js-title-input и js-publication-btn )

// //не планируем изменять переменные для публикации => называем их const. Node - смысловое значение того, что в этой переменной будем работать с кусочком html доставая из него необходимый документ, обращаясь к нему по классу
// const titleInputNode = document.querySelector('.js-title-input');
// const newPostBtnNode = document.querySelector('.js-new-post-btn');
// const postsNode = document.querySelector('js-posts');

// //добавляем обработчик по клику, в (настраиваем команду) что будет при нажатии. сначала проверяем командой в консоль выведи 1
// newPostBtnNode.addEventListener('click', function() {
//   //создаем переменную, в которую будем помещать данные из поля title-input const inputTitle = titleInputNode.value; и эту переменню (эти данные) присваиваем переменной poctTitle, или сокращенная запись: 
//   postTitle = titleInputNode.value;//для текстовых полей (input type="password | text") атрибут value указывает предварительно введенную строку. Пользователь может стирать текст и вводить свои символы, но при использовании в форме кнопки Reset пользовательский текст очищается и восстанавливается введенный в атрибуте ;
//   //в результате данные из инпута складываются в переменную postTitle
  
//   console.log(postTitle);

//     // этап 2 отображение заголовка в ленте постов (вывод заголовка поста)
// //в html добавляем колонку лента
// // создаем конст. postsNode из документа html posts
// //в этой переменной внутренний текст равен postTitle:

//     postsNode.innerHTML = postTitle;

     
// });

// let post = {
//   title: '',
//   text: '',
// } ;

const posts = [];

const TITLE_VALIDATHION_LIMIT = 20;
const TEXT_VALIDATHION_LIMIT = 100;


const postTitleInputNode = document.querySelector(".js-post-title-input");
const postTextInputNode = document.querySelector(".js-post-text-input");
const newPostBtnNode = document.querySelector(".js-new-post-btn");
const postsNode = document.querySelector(".js-posts");
const validationMessage = document.getElementById("validationMessage");
const form = document.querySelector(".js-form__wrapper");

newPostBtnNode.setAttribute('disabled', true);

newPostBtnNode.addEventListener('click', function() {
  //этот обработчик должен выполнить следующие действия:
//1. получить данные из поля ввода
//2. сохранить пост
//3.отобразить пост
//на каждое действие создаем свою функцию
const postFromUser = getPostFromUser();//1.получи данные от пользователя

addPost(postFromUser);//2.добавь полученные данные в виде объекта в массив

renderPosts(); //отобрази 

clearForm(); //очисти инпуты

});
// создаем переменную post (в дальнейшем объект (заголовок+пост). в дальнейшем массив постов/ОНА В САМОМ НАЧАЛЕ, ПЕРЕД ВСЕМИ КОНСТАНТАМИ). ПРИСВАИВАЕМ ЕЙ ЗНАЧЕНИЕ, КОТОРОЕ ПЕРЕДАЛИ В ИНПУТЕ:
  // post = titleInputNode.value;
  // ПРИСВАИВАЕМ ЭТО КОНСТАНТЕ postsNode И ИСПОЛЬЗУЯ innerText ОТОБРАЖАЕМ В ПРАВОЙ ЧАСТИ "ЛЕНТА"
  // postsNode.innerText = post;

// ВАЛИДАЦИЯ С ИСПОЛЬЗОВАНИЕМ EVENT 2 функции (не гуд, пропадает первая, когда запускаем вторую)

postTitleInputNode.addEventListener('input', validation);

postTextInputNode.addEventListener('input', validation);

//   const currentValue = event.target.value;

//   if (currentValue.length > TITLE_VALIDATHION_LIMIT) {
//     validationMessage.innerText = `Длина заголовка не должна превышать ${TITLE_VALIDATHION_LIMIT} символов`;
//     validationMessage.classList.remove('validationMessage_hidden');
//   }else {
//     validationMessage.classList.add('validationMessage_hidden');
//   }
// });

// postTextInputNode.addEventListener('input', function(event) {
//   const currentValue = event.target.value;

//   if (currentValue.length > TEXT_VALIDATHION_LIMIT) {
//     validationMessage.innerText = `Длина текста не должна превышать ${TEXT_VALIDATHION_LIMIT} символов`;
//     validationMessage.classList.remove('validationMessage_hidden');
//   }else {
//     validationMessage.classList.add('validationMessage_hidden');
//   }
// });

// ВАЛИДАЦИЯ ОДНОЙ ФУНКЦИЕЙ (2 ПРОВЕРКИ. сначала по длине заголовка, потом по длине текста)
// создаем 2 переменных, в каждой из которых записана длина (количество символов), условие: если заголовок длиннее чем лимит, то остановка (логика от плохого, если превышен, то сообщение, если не превышен, то сообщения нет)
function validation() {
  const titlelen = postTitleInputNode.value.length;
  const textlen = postTextInputNode.value.length;
   
  if (titlelen < 3 ) {
    validationMessage.innerText = `Длина заголовка не может быть меньше 3  символов`;
    validationMessage.classList.remove('validationMessage_hidden');
    newPostBtnNode.setAttribute('disabled', true);
    return;
  }

  if (titlelen > TITLE_VALIDATHION_LIMIT) {
    validationMessage.innerText = `Длина заголовка не должна превышать ${TITLE_VALIDATHION_LIMIT} символов`;
    validationMessage.classList.remove('validationMessage_hidden');
    newPostBtnNode.setAttribute('disabled', true);
    return;
  }

 
  if (textlen > TEXT_VALIDATHION_LIMIT) {
    validationMessage.innerText = `Длина текста не должна превышать ${TEXT_VALIDATHION_LIMIT} символов`;
    validationMessage.classList.remove('validationMessage_hidden');
    newPostBtnNode.setAttribute('disabled', true);
    return;
  }

 
  validationMessage.classList.add('validationMessage_hidden');
   newPostBtnNode.removeAttribute('disabled');
 
}

//1. создаем функцию которая возвращает пост/объект(заголовок + текст)
//создаем переменную, которая создается из содержимого переменной postTitleInputNode и возвращается в виде объекта заголовок + текст
function getPostFromUser() {
  //получи данные из postTitleInputNode и postTextInputNode
  const title = postTitleInputNode.value;
  const text = postTextInputNode.value;

// возврати в виде объекта. (название свойства совпадает с названием переменной, можно сократить 
// {title, 
// text})
  return {
    title: title,
    text: text
};
}


// 2.нужно уметь создавать пост/объект/массив из объектов, для этого создаем функцию setPost (установи пост)
// function setPost(newPost) {
//   post = newPost; //тому post (данные из поля ввода), который вернули предыдующим действием присвоили 
// }
// эта функция будет перезаписывать новые посты, не оставляя старые, поэтому создаем другую функцию addPost() которая будет добавлять новые посты в массив. создаем вместо переменной объекта константу массива.

function addPost({title, text}) { //можно в аргументах функции записать объект (post) - тогда без фигурных скобок, тогда при добавлении, пишем 
  // title: post.title,
  // text: post.text

  const currentDate = new Date();
  const dt =`${ currentDate.toLocaleString().slice(0, 10) + currentDate.toLocaleString().slice(11, -3)}`;
  
  posts.push({
    dt: dt,
    title: title,
    text: text
  });
}

// // 3.отображаем: создаем функцию "Отобрази пост" , сначала создаем функци getPost(), которая будет возвращать retorn post, так как при разработке программ, если нужно какие-то данные установить или получить, не делать это обращаясь напрямую в переменную, а делать это через функцию  
  function getPosts() {
  return posts;
}

// function renderPost() {

  // postsNode.innerText = post; опирается на глобальную штуку postsNode или, чтобы вывести текст в ленту пишем через шаблонные строки `` html внутри js:

  //   const post = getPost();

//   const postHTML = `
//     <div class='post'>
//       <p class='post__title'>${post.title}</p> - обращаясь к посту, (который в переменной, но мы его получаем от функции getpost()), который объект, через точку к свойству этого объекта .titlt
//       <p class='post__text'>${post.text}</p>
//     </div>
//   `;
// и теперь уже можем написать:
//   postsNode.innerHTML = postHTML;
// }

function renderPosts() {
  const posts = getPosts();

  let postsHTML = ''; //формируем postsHTML изначально пустой

posts.forEach(post => { //на каждой итерации цикла делай прибавление всей конструкции, которая в `шаблонной строке` .поскольку внутри цикла каждый пост есть, то обращаясь к каждому посту выводи его title & text 
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
  newPostBtnNode.setAttribute('disabled', true);
}

// выводим список постов
// let c объектом переименовываем в конст. массива
// метод setPost меняем на addPost, он получает пост, состоящий из массива и добавлят к массиву
// также меняем вызов этой функции 

// в функции getPost в getPosts возвращаем posts
// меняем в функции renderPost на renderPosts, константу, формируем список HTML. для чего используем цикл на каждой итерации которого будем делать прибавление кусочка кода html, который был уже написан

// валидация
// в html создаем див с записью об ограничении количества символов, добавляем класс hidden - с дисплей нан, (запись скрыта по умолчанию)
// ему даем id и добавляем конст.
// мы будем его запускать при изменении чего-то в заголовке. для запуска используем событие "нажатие даун" keydown, input. или chenge проверяем, что оно работает, подставляем в параметры функции event (событие) => функция передает событие и функция сама является параметром метода addEventListener Движок браузера сам подставляет это event и мы можем работь с ним внутри функции
// размещаем обработчик после обработчика click
// чтобы напрямую выводил в консоль значение на момент происхождения события (это записывается в target). в вызове пишем event.target.value
// выводим это в специальную переменную currentValue, ее подставляем в консоль, проверяем c помощью свойства length (длина этого значения)
// проверяем с помощью if если больше 10, то выводим в консоль error 

// создаем 2 переменных limit и присваиваем им ограничение по длине заголовка и текста
//дополнительные фичи:
// лимит превышен на N символов: в If вместо сравнения  - разница (из одного числа вычитаем другое)
// в html присвоить кнопке disablet 

// ДОБАВЛЕНИЕ ДАТЫ И ВРЕМЕНИ
// В DIV функции renderPosts добавляем параграф {post.dt} с классом post__data  и назначаем свойства css 
// в функции addPost создаем константу new Date() это будет объект с большим количеством свойств, отформатируем его под нужный нам вид, для чего создаем втору константу, ей пишем шаблонную строку с теми свойствами, которые нам нужны
// в объект функции addPost добавляем dt 




