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

        this.projectsContainer.appendChild(projectConatiner);
    }
}

export default DOMManager