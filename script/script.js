{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent,
            },
        ];

        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];
        render();
    };


    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) =>
            index === taskIndex ?
                { ...task, done: !task.done }
                : task);
        render();
    };

    const finishAllTasks = () => {
        tasks = tasks.map(task => ({
            ...task,
            done: true,
        }));
        render();
    };

    const toggleHideTasksDone = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    bindToggleHideTasksDoneEvent = () => {
        const hideAllDoneTasksButton = document.querySelector(".js-hideAllDoneTasks");
        hideAllDoneTasksButton.addEventListener("click", () => {
            toggleHideTasksDone();
        });
    };

    bindToggleTasksDone = () => {
        const toggleCheckedTaskButton = document.querySelectorAll(".js-select");

        toggleCheckedTaskButton.forEach((toggleTask, index) => {
            toggleTask.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    bindDeleteTasksEvent = () => {
        const deleteTasks = document.querySelectorAll(".js-deleteTask");

        deleteTasks.forEach((deleteTask, index) => {
            deleteTask.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    bindFinishAllTasksEvent = () => {
        const setAllTasksAsDone = document.querySelector(".section__buttons--rightButton");
        if (tasks.length !== 0) {
            setAllTasksAsDone.addEventListener("click", () => {
                finishAllTasks();
            });
            return;
        };
    };

    const disabledButton = () => {
        if (tasks.every(task => task.done)) {
            document.querySelector(".section__buttons--rightButton").disabled = true
        };
        return;
    };

    const renderTask = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
                <li class = "section__tasksListItem ${hideDoneTasks && task.done ? "section__tasksListItem--hidden" : ""}">
                   <button class = "section__taskButton section__taskButton--checked js-select">
                        ${task.done ? "✔" : ""}
                   </button>
                   <span class = "section__task js-task ${task.done ? "section__task--completed" : ""}">
                        ${task.content} 
                   </span>
                   <button class = "section__taskButton section__taskButton--deleted js-deleteTask">
                        🗑
                   </delete>
                </li >
                        `;
        };
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let htmlButtons = "";
        if (tasks.length !== 0) {
            htmlButtons += `
            <button class = "section__buttons section__buttons--leftButton js-hideAllDoneTasks"> 
                ${hideDoneTasks === true ? "Pokaż ukończone" : "Ukryj ukończone"} 
            </buttons> 
            <button class = "section__buttons section__buttons--rightButton js-setAllTasksAsDone"> 
            Ukończ wszystkie
            `
            document.querySelector(".section__buttonsContainer").innerHTML = htmlButtons;
        };
    };
    const render = () => {
        renderTask();
        renderButtons();
        bindToggleTasksDone();
        bindDeleteTasksEvent();
        bindFinishAllTasksEvent();
        disabledButton();
        bindToggleHideTasksDoneEvent();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        };
        addNewTask(newTaskContent);

        focusTaskArea();
    };
    const focusTaskArea = () => {
        document.querySelector(".js-newTask").focus();
        document.querySelector(".js-newTask").value = "";

    }
    const init = () => {
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit)
    };

    init();
}


