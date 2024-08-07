const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const doneMessage = document.getElementById('done-message');

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;

        let deleteSpan = document.createElement('span');
        deleteSpan.innerHTML = "\u00d7";
        deleteSpan.onclick = function() {
            this.parentElement.remove();
            checkAllDone();
            saveData();
        };

        li.appendChild(deleteSpan);
        li.onclick = function() {
            this.classList.toggle('checked');
            checkAllDone();
            saveData();
        };

        listContainer.appendChild(li);
        inputBox.value = '';
        checkAllDone();
        saveData();
    }
}

function deleteAllTasks() {
    listContainer.innerHTML = '';
    doneMessage.style.display = 'none';
    saveData();
}

function saveData() {
    localStorage.setItem('tasks', listContainer.innerHTML);
}

function showTasks() {
    listContainer.innerHTML = localStorage.getItem('tasks');
    document.querySelectorAll('li').forEach(item => {
        item.querySelector('span').onclick = function() {
            this.parentElement.remove();
            checkAllDone();
            saveData();
        };
        item.onclick = function() {
            this.classList.toggle('checked');
            checkAllDone();
            saveData();
        };
    });
    checkAllDone();
}

function checkAllDone() {
    const tasks = document.querySelectorAll('li');
    const allDone = Array.from(tasks).every(task => task.classList.contains('checked'));
    doneMessage.style.display = allDone && tasks.length > 0 ? 'block' : 'none';
}

showTasks();
