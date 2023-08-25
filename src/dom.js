class DOMManager {
    constructor(todoList, Project, Task) {
        this.todoList = todoList;
        this.Project = Project;
        this.Task = Task;

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

            this.tasksConatiner.appendChild(taskContainer);
        });
    }

    clearTasks() {
        this.tasksConatiner.innerHTML = '';
    }
}

export default DOMManager