const main = document.querySelector('.main');
const mode = document.getElementById('mode');
const todoInput = document.querySelector('#todo-input');
const addTodoItem = document.getElementById('add-todo-item');
const todoListWrapper = document.querySelector('.todo-list-wrapper');
const todoItems = document.querySelectorAll('.todo-item');
const CHECK = "bi-check-circle-fill";
const UNCHECK = "bi-circle";
const lineThrough = "lineThrough";
let LIST, id;

// get item from local storage
let data = localStorage.getItem("MyTODO");
let switchTheme = localStorage.getItem("MyTheme");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}
else {
    LIST = [];
    id = 0;
}

function loadList(LIST){
    LIST.forEach(item => {
        addTodo(item.name, item.id, item.done, item.trash);
    });
}

if(switchTheme == 'darkmode'){
    enableDarkMode();
}

function addTodo(todo,id,done,trash) {
    if(trash){return;}
    const DONE = done ? CHECK : UNCHECK;
    const item = `<div class="todo-item">
                    <i class="bi ${DONE} pe-2 check" job="complete" id="${id}"></i>
                    <p class="text">${todo}</p>
                    <i class="bi bi-x-lg delete" job="delete" id="${id}"></i>
                </div>`;
    const position = 'beforeend';
    let itemTemp = document.createElement('div');
    itemTemp.innerHTML = item;
    todoListWrapper.insertAdjacentElement(position, itemTemp);
    todoInput.value = '';
}

function completeTodo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeTodo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

function enableDarkMode() {
    main.classList.add('dark');
    mode.src = "images/icon-sun.svg";
    localStorage.setItem('MyTheme', 'darkmode');
}

function disableDarkMode(){
    main.classList.remove('dark');
    mode.src = "images/icon-moon.svg";

    localStorage.setItem('MyTheme', null);
}

mode.addEventListener('click', function(){
    switchTheme = localStorage.getItem('MyTheme');

    if(switchTheme !== 'darkmode'){
        enableDarkMode();
    }
    else {
        disableDarkMode();
    }
});

addTodoItem.addEventListener('click', function(){
    let todo = todoInput.value;
    if(todo){
        addTodo(todo,id,false,false);

        LIST.push({
            name: todo,
            id: id,
            done: false,
            trash: false
        });
        localStorage.setItem("MyTODO", JSON.stringify(LIST));
        id++;
    }
});

document.addEventListener('keyup', function(event){
    let todoContent = todoInput.value;
    if(event.key == 'Enter'){
        if(todoContent){
            addTodo(todoContent,id,false,false);

            LIST.push({
                name: todoContent,
                id: id,
                done: false,
                trash: false
            });

            localStorage.setItem("MyTODO", JSON.stringify(LIST));
            id++;
        }
    }
});

todoListWrapper.addEventListener('click', function(event){
    let element = event.target;
    let elementJob = element.attributes.job.value;

    if(elementJob == 'complete'){
        completeTodo(element);
    }
    else {
        removeTodo(element);
    }

    // set item to local storage
    localStorage.setItem("MyTODO", JSON.stringify(LIST));
});
