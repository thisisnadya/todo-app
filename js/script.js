const main = document.querySelector('.main');
const mode = document.getElementById('mode');
const todoInput = document.querySelector('#todo-input');
const addTodoItem = document.getElementById('add-todo-item');
const todoListWrapper = document.querySelector('.todo-list-wrapper');

function addTodo() {
    console.log(todoInput.value);
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');
    todoListWrapper.appendChild(todoItem);

    const todo = document.createElement('p');
    todo.innerHTML = '<i class="bi bi-circle pe-2 check"></i>' + todoInput.value;
    todoItem.appendChild(todo);

    const iconCross = document.createElement('i');
    iconCross.classList.add('bi');
    iconCross.classList.add('bi-x-lg');
    todoItem.appendChild(iconCross);

    todoInput.value = '';
}


function darkMode() {
    if(main.classList.contains('dark-main')){
        main.classList.remove('dark-main');
        mode.src = '/images/icon-moon.svg';
        todoInput.classList.remove('dark');
        todoItem.forEach(item => {
            item.classList.remove('dark');
        });
    }
    else {
        main.classList.add('dark-main');
        mode.src = '/images/icon-sun.svg';
        todoInput.classList.add('dark');
        todoItem.forEach(item => {
            item.classList.add('dark');
        });
    }
}

mode.addEventListener('click', darkMode);
addTodoItem.addEventListener('click', addTodo);