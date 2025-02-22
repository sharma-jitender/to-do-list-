document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo_input"); 
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo_list"); 
    const jumperButton = document.createElement("button");
    
    jumperButton.textContent = "Jump to Top";
    jumperButton.id = "jumper-btn";
    document.body.appendChild(jumperButton);
    jumperButton.style.display = "none"; 
    jumperButton.style.position = "fixed";
    jumperButton.style.bottom = "20px";
    jumperButton.style.right = "20px";
    jumperButton.style.padding = "10px 15px";
    jumperButton.style.background = "blue";
    jumperButton.style.color = "white";
    jumperButton.style.border = "none";
    jumperButton.style.cursor = "pointer";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => renderTask(task));

    addTaskButton.addEventListener("click", () => {
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };
        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        todoInput.value = ""; 
    });

    function renderTask(task) {
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn">Delete</button>
        `;

        li.querySelector("span").addEventListener("click", () => {
            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveTasks();
        });

        li.querySelector(".delete-btn").addEventListener("click", (e) => {
            e.stopPropagation(); 
            tasks = tasks.filter((t) => t.id !== task.id); 
            li.remove();
            saveTasks();
        });

        todoList.appendChild(li);
        checkJumperVisibility();
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function checkJumperVisibility() {
        if (todoList.children.length > 5) {
            jumperButton.style.display = "block";
        } else {
            jumperButton.style.display = "none";
        }
    }

    jumperButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            jumperButton.style.display = "block";
        } else {
            jumperButton.style.display = "none";
        }
    });
});
