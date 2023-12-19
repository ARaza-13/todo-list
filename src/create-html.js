export default class CreateHtml {
    constructor() {
        this.body = document.querySelector('body');

        this.header = document.createElement('header');
        this.main = document.createElement('main');
        this.footer = document.createElement('footer');

        this.header.classList.add('header');
        this.main.classList.add('main');
        this.footer.classList.add('footer');

        this.body.appendChild(this.header);
        this.body.appendChild(this.main);
        this.body.appendChild(this.footer);
    }

    initializeHtml() {
        this.createHeader();
        this.createNav();
        this.createDefaultProjects();
        this.createProjects();
        this.createAddProjectBtn();
        this.createAddProjectForm();
    }

    createHeader() {
        const heading = document.createElement('h1');
        heading.textContent = 'ToDo List';

        this.header.appendChild(heading);
    }

    createNav() {
        const nav = document.createElement('div');
        nav.classList.add('nav');
        nav.setAttribute('id', 'nav');

        this.main.appendChild(nav);
    }

    createDefaultProjects() {
        const defaultProjects = document.createElement('div');
        defaultProjects.classList.add('default-projects');
        defaultProjects.setAttribute('id', 'default-projects');

        const nav = document.getElementById('nav');
        nav.appendChild(defaultProjects);
    }

    createProjects() {
        const projects = document.createElement('div');
        projects.classList.add('projects');
        projects.setAttribute('id', 'projects');

        const heading = document.createElement('h2');
        heading.classList.add('projects-heading');
        heading.textContent = 'Projects';

        projects.appendChild(heading);

        const nav = document.getElementById('nav');
        nav.appendChild(projects);
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
        projectContainer.setAttribute('data-project-button', '');
        projectContainer.textContent = project.name;

        const projectsList = document.getElementById('projects');
        projectsList.appendChild(projectContainer);
    }

    createAddProjectBtn() {
        const addProjectBtn = document.createElement('button');
        addProjectBtn.classList.add('add-project-btn');
        addProjectBtn.setAttribute('id', 'add-project-btn');
        addProjectBtn.textContent = '+ Add Project';

        const nav = document.getElementById('nav');
        nav.appendChild(addProjectBtn);
    }

    createAddProjectForm() {
        const addProjectForm = document.createElement('form');
        addProjectForm.classList.add('project-form', 'hidden');
        addProjectForm.setAttribute('id', 'add-project-form');

        const projectName = document.createElement('input');
        projectName.classList.add('input-popup');
        projectName.setAttribute('id', 'add-project-input')
        projectName.setAttribute('type', 'text');
        projectName.setAttribute('placeholder', 'Project Name');
        projectName.setAttribute('required', '');

        const submitBtn = document.createElement('button');
        submitBtn.classList.add('submit-btn');
        submitBtn.setAttribute('type', 'submit');
        submitBtn.textContent = 'Add';

        const cancelBtn = document.createElement('button');
        cancelBtn.classList.add('cancel-btn');
        cancelBtn.setAttribute('type', 'button');
        cancelBtn.textContent = 'Cancel';

        const formBtns = document.createElement('div');
        formBtns.classList.add('form-btns');
        formBtns.appendChild(submitBtn);
        formBtns.appendChild(cancelBtn);

        addProjectForm.appendChild(projectName);
        addProjectForm.appendChild(formBtns);

        const nav = document.getElementById('nav');
        nav.appendChild(addProjectForm);
    }
}