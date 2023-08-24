import Task from "./task";
import Project from "./project";
import TodoList from "./todolist";

class UI {
    static loadHomePage(todoList) {
        UI.loadProjects(todoList);
    }

    static loadProjects(todoList) {
        todoList.getProjects().forEach((project) => {
            UI.createProject(project.name); 
        });
    }

    static createProject(name) {
        const projects = document.getElementById('projects');

        const projectName = document.createElement('button');
        projectName.classList.add('project-name');
        projectName.textContent = `${name}`;

        projects.appendChild(projectName);
    }
}

export default UI;