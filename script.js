const form = document.querySelector(".task-form");
const input = document.querySelector(".task-form input");
const taskList = document.querySelector(".task-list");
const filter = document.querySelector("#filter");

const spinner = document.createElement("div");
spinner.classList.add("spinner");
spinner.style.display = "none";
document.body.appendChild(spinner);

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// =========================
// ADICIONAR TAREFA
// =========================
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Digite uma tarefa!");
        input.focus();
        return;
    }

    if (taskText.length < 3) {
        alert("A tarefa deve ter no mínimo 3 caracteres.");
        input.focus();
        return;
    }

    if (taskText.length > 50) {
        alert("A tarefa pode ter no máximo 50 caracteres.");
        input.focus();
        return;
    }

    const taskExists = tasks.some(task => task.text.toLowerCase() === taskText.toLowerCase());

    if (taskExists) {
        alert("Essa tarefa já existe.");
        input.focus();
        return;
    }

    spinner.style.display = "block";

    setTimeout(() => {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();

        input.value = "";
        spinner.style.display = "none";
    }, 1000);
});
taskList.addEventListener("change", function (event) {
    if (event.target.type === "checkbox") {
        const taskItem = event.target.parentElement;
        const taskId = Number(taskItem.dataset.id);
        
        const task = tasks.find(t => t.id === taskId);
        
        if (task) {
            task.completed = event.target.checked;
            saveTasks();
            renderTasks();
        }
    }
});

taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
        const confirmDelete = confirm("Deseja realmente excluir esta tarefa?");

        if (!confirmDelete) return;

        const taskItem = event.target.parentElement;
        const taskId = Number(taskItem.dataset.id);

        tasks = tasks.filter(t => t.id !== taskId);
        saveTasks();
        renderTasks();
    }
});

filter.addEventListener("change", applyFilter);

function applyFilter() {
    const taskItems = document.querySelectorAll(".task-item");
    const filterValue = filter.value;

    taskItems.forEach(task => {
        const completed = task.classList.contains("completed");

        if (filterValue === "all") {
            task.style.display = "flex";
        } else if (filterValue === "pending") {
            task.style.display = completed ? "none" : "flex";
        } else if (filterValue === "completed") {
            task.style.display = completed ? "flex" : "none";
        }
    });
}


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";
    
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.classList.add("task-item");
        li.dataset.id = task.id;
        
        if (task.completed) {
            li.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `task-${task.id}`;
        checkbox.checked = task.completed;

        const label = document.createElement("label");
        label.setAttribute("for", `task-${task.id}`);
        label.textContent = task.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Excluir";

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    applyFilter();
}
renderTasks();

// =========================
// MODO ESCURO (DARK MODE)
// =========================
const themeToggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Verifica se o usuário já havia escolhido o tema escuro antes
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    themeToggleBtn.textContent = "☀️"; // Muda o ícone para o sol
}

// Evento de clique para alternar o tema
themeToggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    
    // Verifica se a classe foi adicionada e salva a preferência
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeToggleBtn.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        themeToggleBtn.textContent = "🌙";
    }
});