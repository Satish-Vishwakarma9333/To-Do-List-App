const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const celebration = document.getElementById("celebration");

const messages = [
    "🏆 Awesome Work!",
    "🚀 You Did It!",
    "⭐ Great Job!",
    "🔥 Task Crushed!",
    "🎉 Congratulations!",
    "💯 Excellent!"
];

/* LOAD TASKS */
window.onload = () => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    saved.forEach(task => createTask(task.text, task.completed));
};

/* ADD BUTTON CLICK */
addBtn.addEventListener("click", addTask);

/* ENTER KEY SUPPORT */
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});

/* ADD TASK FUNCTION */
function addTask() {
    const text = taskInput.value.trim();

    if (!text) {
        alert("Please enter a task!");
        return;
    }

    createTask(text, false);
    saveTasks();

    taskInput.value = "";
}

/* CREATE TASK */
function createTask(text, completed) {

    const li = document.createElement("li");
    li.classList.add("task-item");

    const span = document.createElement("span");
    span.textContent = text;

    if (completed) {
        span.classList.add("completed");
    }

    const actions = document.createElement("div");
    actions.classList.add("actions");

    /* COMPLETE BUTTON */
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✓";
    completeBtn.classList.add("complete-btn");

    completeBtn.onclick = () => {

        if (!span.classList.contains("completed")) {
            span.classList.add("completed");
            showCelebration();
        } else {
            span.classList.remove("completed");
        }

        saveTasks();
    };

    /* DELETE BUTTON */
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.onclick = () => {
        li.remove();
        saveTasks();
    };

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    taskList.appendChild(li);
}

/* SAVE TASKS (LOCAL STORAGE) */
function saveTasks() {

    const tasks = [];

    document.querySelectorAll(".task-item").forEach(item => {
        tasks.push({
            text: item.querySelector("span").textContent,
            completed: item.querySelector("span").classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* 🎉 CELEBRATION POPUP */
function showCelebration() {

    const msg = messages[Math.floor(Math.random() * messages.length)];

    celebration.innerHTML = msg;
    celebration.classList.add("show");

    createConfetti();

    setTimeout(() => {
        celebration.classList.remove("show");
    }, 2000);
}

/* 🎊 CONFETTI EFFECT */
function createConfetti() {

    const colors = [
        "#ff1744",
        "#ffea00",
        "#00e676",
        "#2979ff",
        "#ff9100",
        "#d500f9"
    ];

    for (let i = 0; i < 120; i++) {

        const c = document.createElement("div");
        c.classList.add("confetti");

        c.style.left = Math.random() * 100 + "vw";
        c.style.background = colors[Math.floor(Math.random() * colors.length)];
        c.style.animationDuration = (Math.random() * 2 + 2) + "s";

        document.body.appendChild(c);

        setTimeout(() => {
            c.remove();
        }, 4000);
    }
}