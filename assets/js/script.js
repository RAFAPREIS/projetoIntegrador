document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addtaskBtn = document.getElementById('add-task-btn');
    const tasklist = document.getElementById('task-list');

    // Carregar tarefas salvas do armazenamento local:
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => addtaskToDOM(task.text, task.completed));

    // Adicionar tarefa ao clicar no botão:
    addtaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addtaskToDOM(taskText);
            savedTask(taskText);
            taskInput.value = ''; // Limpar o campo após adicionar
        }
    });

    // Adicionar tarefa ao DOM:
    function addtaskToDOM(text, completed = false) {
        const li = document.createElement('li');
        li.className = completed ? 'completed' : '';

        const taskSpan = document.createElement('span');
        taskSpan.textContent = text;
        taskSpan.addEventListener('click', () => {
            li.classList.toggle('completed');
            updateLocalStorage();
        });

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remover';
        removeBtn.className = 'remove-btn';
        removeBtn.addEventListener('click', () => {
            li.remove();
            updateLocalStorage();
        });

        li.append(taskSpan, removeBtn);
        tasklist.appendChild(li);
    }

    // Salvar tarefa no armazenamento local:
    function savedTask(text) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text, completed: false }); // Adiciona a nova tarefa
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Atualiza o localStorage
    }

    // Atualizar o armazenamento local após alterações:
    function updateLocalStorage() {
        const tasks = [];
        document.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Atualiza as tarefas no localStorage
    }
});
