{
    const tasks = [];
    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
                <li>
                   <button class = "section__checkTask js-checkTask">&#x2714;</button> <span class = "js-task">${task.content}</span> <button class = "section__deleteTask js-deleteTask">&#x1F5D1;</delete>
                </li >
        `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
        const deleteTasks = document.querySelectorAll(".js-deleteTask");
        deleteTasks.forEach((deleteTask, index) => {
            deleteTask.addEventListener("click", () => {
                removeTask(index);
            });
        })
        const toggleTaskButton = document.querySelectorAll(".js-checkTask");
        toggleTaskButton.forEach((toggleTask, index) => {
            toggleTask.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        })
    };
    const toggleTextDecoration = () => {
        const task = document.querySelector(".js-task");
        task.classList.toggle("container__textDecoration");
    };
    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
            done: true,
        });
        render();
    };
    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    }
    const toggleTaskDone = (index) => {
        tasks[index].done = !tasks[index].done;
        render();
    }
    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);
    };
    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit)
    };
    init();

}