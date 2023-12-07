import Storage from "./storage";

class CreateHtml {
    constructor() {
        this.main = document.querySelector('main');
    }

    createNav() {
        const nav = document.createElement('div');
        nav.classList.add('nav');
        nav.setAttribute('id', 'nav');

        return nav;
    }

    createDefaultProjects() {
        const defaultProjects = document.createElement('div');
        defaultProjects.classList.add('default-projects');
        defaultProjects.setAttribute('id', 'default-projects');

        return defaultProjects;
    }

    createProjects() {
        const projects = document.createElement('div');
        projects.classList.add('projects');
        projects.setAttribute('id', 'projects');

        return projects;
    }

    createDefaultProject(project) {
        const defaultProjectContainer = document.createElement('button');
        defaultProjectContainer.classList.add('project');
        defaultProjectContainer.setAttribute('data-project', project.projectId);
        defaultProjectContainer.setAttribute('id', `${project.projectId}-project-button`);
        defaultProjectContainer.textContent = project.name;

        const defaultProjectsList = document.getElementById('default-projects');
        defaultProjectsList.appendChild(defaultProjectContainer);
    }

    createProject(project) {
        const projectContainer = document.createElement('button');
        projectContainer.classList.add('project');
        projectContainer.setAttribute('data-project', project.projectId);
        projectContainer.setAttribute('data-project-button');
        projectContainer.textContent = project.name;

        const projectsList = document.getElementById('projects');
        projectsList.appendChild(projectContainer);
    }

    createAddProjectBtn() {
        const addProjectBtn = document.createElement('button');
        addProjectBtn.classList.add('add-project-btn');
        addProjectBtn.setAttribute('id', 'add-project-btn');
        addProjectBtn.textContent = '+ Add Project';

        return addProjectBtn;
    }
}