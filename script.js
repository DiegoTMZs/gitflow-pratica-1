const form = document.querySelector(".task-form");
const input = document.querySelector(".task-form input");
const taskList = document.querySelector(".task-list");
const filter = document.querySelector("#filter");

let taskId = 4;

// =========================
// CRIA SPINNER
// =========================
const spinner = document.createElement("div");
spinner.classList.add("spinner");
spinner.style.display = "none";

document.body.appendChild(spinner);

// =========================
// ADICIONAR TAREFA
// =========================
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = input.value.trim();

    // VALIDAÇÕES
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

    // verifica tarefa duplicada
    const labels = document.querySelectorAll(".task-item label");

    for (let label of labels) {
        if (label.textContent.toLowerCase() === taskText.toLowerCase()) {
            alert("Essa tarefa já existe.");
            input.focus();
            return;
        }
    }

    // MOSTRA SPINNER
    spinner.style.display = "block";

    // simula carregamento
    setTimeout(() => {

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

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

        input.value = "";

        taskId++;

        // ESCONDE SPINNER
        spinner.style.display = "none";

    }, 1000);
});

// =========================
// MARCAR COMO CONCLUÍDA
// =========================
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

// =========================
// EXCLUIR TAREFA
// =========================
taskList.addEventListener("click", function (event) {

    if (event.target.classList.contains("delete-btn")) {

        const confirmDelete = confirm("Deseja realmente excluir esta tarefa?");

        if (!confirmDelete) return;

        const taskItem = event.target.parentElement;

        taskItem.remove();
    }
});

// =========================
// FILTRAR TAREFAS
// =========================
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