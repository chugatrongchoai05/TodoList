const todolist = document.getElementById('todo-list');

let todo = JSON.parse(localStorage.getItem('todo')) || [];
let currentfilter = 'all';

function rendertodolist() {
    todolist.innerHTML = '';
    let filteredtodolist = todo;
    if (currentfilter === 'done') {
        filteredtodolist = todo.filter(todo => todo.done);
    } else if (currentfilter === 'doing') {
        filteredtodolist = todo.filter(todo => !todo.done);
    }

    filteredtodolist.forEach((todo) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <input type="checkbox" data-id="${todo.id}" ${todo.done ? 'checked' : ''} class="toggle-button">
        <span style="text-decoration:${todo.done ? 'line-through' : 'none'}; cursor: pointer;">${todo.text}</span>
        <button data-id="${todo.id}" class="delete-button">Delete</button>
        `;
        todolist.appendChild(li);
    });
    updatecount();
    localStorage.setItem('todo',JSON.stringify(todo));
}

function updatecount() {
    const remainingtasks = todo.filter(todo => !todo.done).length;
    document.getElementById('todo-count').textContent = remainingtasks;
}

function addtodo() {
    const text = document.getElementById('todo-input').value.trim();
    if (text !== '') {
        const newtodo = {
            id: Date.now(),
            text: text,
            done: false,
        };
        todo.push(newtodo);
        document.getElementById('todo-input').value = '';
        rendertodolist();
    }
};

document.getElementById('add-button').addEventListener('click', addtodo)
document.getElementById('todo-input').addEventListener('keypress', function(event) {
    if (event.key === "Enter") addtodo();
});
document.getElementById('todo-list').addEventListener('click', function(event) {
    const id = parseInt(event.target.getAttribute('data-id'));
    if(event.target.classList.contains('delete-button')) {
        if(confirm('Do you want to delete this task from Todo list?')) {
            todo = todo.filter(todo => todo.id !== id);
            rendertodolist();
        }
    }
    if(event.target.classList.contains('toggle-button')) {
        todo = todo.map(todo => {
            if (todo.id === id) {
                return { ...todo, done: event.target.checked };
            }
            return todo;
        });
        rendertodolist();
    }
});
document.getElementById('filters').addEventListener('click', function(event) {
    if(event.target.classList.contains('filter-button')) {
        currentfilter = event.target.getAttribute('filter');
        rendertodolist();
    }
});

rendertodolist();