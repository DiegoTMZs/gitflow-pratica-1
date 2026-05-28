const form = document.querySelector(".task-form");
const input = document.querySelector(".task-form input");
const taskList = document.querySelector(".task-list");
const filter = document.querySelector("#filter");

let taskId = 4;

// ADICIONAR TAREFA
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Digite uma tarefa!");
        return;
    }

    // cria os elementos
    const li = document.createElement("li");
    li.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `task-${taskId}`;

    const label = document.createElement("label");
    label.setAttribute("for", `task-${taskId}`);
    label.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Excluir";

    // adiciona tudo na li
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);

    // adiciona na lista
    taskList.appendChild(li);

    // limpa o input
    input.value = "";

    taskId++;
});

// MARCAR COMO CONCLUÍDA
taskList.addEventListener("change", function (event) {
    if (event.target.type === "checkbox") {
        const taskItem = event.target.parentElement;

        if (event.target.checked) {
            taskItem.classList.add("completed");
        } else {
            taskItem.classList.remove("completed");
        }

        applyFilter();
    }
});

// EXCLUIR TAREFA
taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
        const taskItem = event.target.parentElement;
        taskItem.remove();
    }
});

// FILTRAR TAREFAS
filter.addEventListener("change", applyFilter);

function applyFilter() {
    const tasks = document.querySelectorAll(".task-item");
    const filterValue = filter.value;

    tasks.forEach(task => {
        const completed = task.classList.contains("completed");

        if (filterValue === "all") {
            task.style.display = "flex";
        } 
        
        else if (filterValue === "pending") {
            task.style.display = completed ? "none" : "flex";
        } 
        
        else if (filterValue === "completed") {
            task.style.display = completed ? "flex" : "none";
        }
    });
}