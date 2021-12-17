const main = document.querySelector('.main');
const mode = document.getElementById('mode');
const todoInput = document.querySelector('#todo-input');
const todoItem = document.querySelectorAll('.todo-item');

mode.addEventListener('click', darkMode);

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

