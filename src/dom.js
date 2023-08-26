class DOMManager {
    constructor(todoList, Project, Task) {
        this.todoList = todoList;
        this.Project = Project;
        this.Task = Task;
        this.taskDetailsContainer = document.createElement('div');
        this.taskDetailsContainer.classList.add('todo-details');

        this.projectsContainer = document.getElementById('projects');
        this.tasksConatiner = document.getElementById('tasks');
    }

    renderProject(project) {
        const projectConatiner = document.createElement('div');
        projectConatiner.classList.add('project');
        projectConatiner.textContent = project.name;

        projectConatiner.addEventListener('click', () => this.renderTasks(project));

        this.projectsContainer.appendChild(projectConatiner);
    }

    renderTasks(project) {
        this.clearTasks();

        project.getTasks().forEach((task) => {
            const taskContainer = document.createElement('div');
            taskContainer.classList.add('task');
            taskContainer.textContent = task.getName();

            taskContainer.addEventListener('click', () => this.renderTaskDetails(task));

            this.tasksConatiner.appendChild(taskContainer);
        });
    }

    renderTaskDetails(task) {
        this.clearTaskDetails();

        const titleElement = document.createElement('h2');
        titleElement.textContent = task.getName();

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = task.getDescription();

        const dueDateElement = document.createElement('p');
        dueDateElement.textContent = `Due: ${task.getDate()}`;

        const priorityElement = document.createElement('p');
        priorityElement.textContent = `Priority: ${task.getPriority()};`;

        this.taskDetailsContainer.appendChild(titleElement);
        this.taskDetailsContainer.appendChild(descriptionElement);
        this.taskDetailsContainer.appendChild(dueDateElement);
        this.taskDetailsContainer.appendChild(priorityElement);

        this.tasksConatiner.appendChild(this.taskDetailsContainer);
    }

    clearTasks() {
        this.tasksConatiner.innerHTML = '';
    }

    clearTaskDetails() {
        this.taskDetailsContainer.innerHTML = '';
    }
}

export default DOMManager