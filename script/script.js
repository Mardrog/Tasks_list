{
    const tasks = [];
    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
                <li class = "section__tasksListItem">
                   <button class = "section__taskButton section__taskButton--checked js-checkTask ">${task.done ? "✔" : ""}</button> <span class = "section__task js-task ${task.done ? "section__task--completed" : ""}">${task.content} </span> <button class = "section__taskButton section__taskButton--deleted js-deleteTask">🗑</delete>
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
        const toggleCheckedTaskButton = document.querySelectorAll(".js-checkTask");
        toggleCheckedTaskButton.forEach((toggleTask, index) => {
            toggleTask.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        })
    };
    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
            done: false,
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
        resetTaskArea();
    };
    const resetTaskArea = () => {
        document.querySelector(".js-newTask").focus();
        document.querySelector(".js-newTask").value = "";

    }
    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit)
    };
    init();

}