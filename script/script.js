{
    const tasks = [];

    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
                <li>
                   <button class = "container__checkTask js-checkTask">&#x2714;</button> ${task.content} <button class = "container__deleteTask js-deleteTask">&#x1F5D1;</delete>
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
    };
    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,

        });
        render();
    };
    const removeTask = (index) => {
        tasks.splice(index, 1);
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