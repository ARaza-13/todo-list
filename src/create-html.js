import Controller from "./controller";

export default class CreateHtml {

    static initializeHtml() {
        this.createPageElements();
        this.createHeader();
        this.createNav();
        this.createProjectPreview();
        this.createDefaultProjects();
        this.createProjects();
        this.createAddProjectButton();
        this.createAddProjectForm();
    }

    // create main webpage elements

    static createPageElements() {
        const header = document.createElement('header');
        const main = document.createElement('main');
        const footer = document.createElement('footer');

        header.classList.add('header');
        main.classList.add('main');
        footer.classList.add('footer');

        header.setAttribute('id', 'header');
        main.setAttribute('id', 'main');
        footer.setAttribute('id', 'footer');

        const body = document.querySelector('body');
        body.appendChild(header);
        body.appendChild(main);
        body.appendChild(footer);
    }

    static createHeader() {
        const heading = document.createElement('h1');
        heading.textContent = 'ToDo List';

        const header = document.getElementById('header')
        header.appendChild(heading);
    }

    static createNav() {
        const nav = document.createElement('div');
        nav.classList.add('nav');
        nav.setAttribute('id', 'nav');

        const main = document.getElementById('main');
        main.appendChild(nav);
    }

    static createProjectPreview() {
        const projectContent = document.createElement('div');
        projectContent.classList.add('project-content');
        projectContent.setAttribute('id', 'project-content');

        const main = document.getElementById('main');
        main.appendChild(projectContent);
    }

    // create nav project elements

    static createDefaultProjects() {
        const defaultProjects = document.createElement('div');
        defaultProjects.classList.add('default-projects');
        defaultProjects.setAttribute('id', 'default-projects');

        const nav = document.getElementById('nav');
        nav.appendChild(defaultProjects);
    }

    static createProjects() {
        const projects = document.createElement('div');
        projects.classList.add('projects');
        projects.setAttribute('id', 'projects');

        const heading = document.createElement('div');
        heading.classList.add('projects-heading');
        heading.textContent = 'Projects';

        const nav = document.getElementById('nav');
        nav.appendChild(heading);
        nav.appendChild(projects);
    }

    static createDefaultProject(project) {
        const defaultProjectContainer = document.createElement('button');
        defaultProjectContainer.classList.add('project');
        defaultProjectContainer.setAttribute('data-project', project.projectId);
        defaultProjectContainer.setAttribute('id', `${project.projectId}-project-button`);
        defaultProjectContainer.textContent = project.name;

        const defaultProjectsList = document.getElementById('default-projects');
        defaultProjectsList.appendChild(defaultProjectContainer);
    }

    static createProject(project) {
        const projectContainer = document.createElement('button');
        projectContainer.classList.add('project');
        projectContainer.setAttribute('data-project', project.projectId);
        projectContainer.setAttribute('data-project-button', '');
        projectContainer.textContent = project.name;

        const editIcon = document.createElement('span');
        editIcon.classList.add('material-symbols-outlined', 'edit');
        editIcon.textContent = 'edit';

        const deleteIcon = document.createElement('span');
        deleteIcon.classList.add('material-symbols-outlined', 'delete');
        deleteIcon.textContent = 'delete';

        const projectActions = document.createElement('div');
        projectActions.classList.add('project-actions');
        projectActions.appendChild(editIcon);
        projectActions.appendChild(deleteIcon);

        projectContainer.appendChild(projectActions);

        const projectsList = document.getElementById('projects');
        projectsList.appendChild(projectContainer);

        Controller.initProjectButtons();
    }

    static createAddProjectButton() {
        const addProjectButton = document.createElement('button');
        addProjectButton.classList.add('add-project-button');
        addProjectButton.setAttribute('id', 'add-project-button');
        addProjectButton.textContent = '+ Add Project';

        const nav = document.getElementById('nav');
        nav.appendChild(addProjectButton);
    }

    static createAddProjectForm() {
        const addProjectForm = document.createElement('div');
        addProjectForm.classList.add('project-form', 'hidden');
        addProjectForm.setAttribute('id', 'add-project-form');

        const projectName = document.createElement('input');
        projectName.classList.add('input-popup');
        projectName.setAttribute('id', 'add-project-input')
        projectName.setAttribute('type', 'text');
        projectName.setAttribute('placeholder', 'Project Name');
        projectName.setAttribute('required', '');

        const submitButton = document.createElement('button');
        submitButton.classList.add('submit-button');
        submitButton.setAttribute('id', 'submit-project-button');
        submitButton.textContent = 'Add';

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('cancel-button');
        cancelButton.setAttribute('id', 'cancel-project-button');
        cancelButton.textContent = 'Cancel';

        const formButtons = document.createElement('div');
        formButtons.classList.add('form-buttons');
        formButtons.appendChild(submitButton);
        formButtons.appendChild(cancelButton);

        addProjectForm.appendChild(projectName);
        addProjectForm.appendChild(formButtons);

        const nav = document.getElementById('nav');
        nav.appendChild(addProjectForm);
    }

    // create project preview elements

    static createProjectHeader(projectName) {
        const projectHeader = document.createElement('div');
        projectHeader.classList.add('project-header');
        projectHeader.setAttribute('id', 'project-header');
        projectHeader.textContent = `${projectName}`; 

        const projectContent = document.getElementById('project-content');
        projectContent.appendChild(projectHeader);
    }

    static createAddTaskButton() {
        const addTaskButton = document.createElement('button');
        addTaskButton.classList.add('add-task-button');
        addTaskButton.setAttribute('id', 'add-task-button');
        addTaskButton.textContent = '+ Add Task';

        const projectContent = document.getElementById('project-content');
        projectContent.appendChild(addTaskButton);
    }

    static createAddTaskForm() {
        const addTaskForm = document.createElement('form');
        addTaskForm.classList.add('task-form', 'hidden');
        addTaskForm.setAttribute('id', 'add-task-form');

        const formHeader = document.createElement('h1');
        formHeader.classList.add('form-header');
        formHeader.textContent = 'Add Task';

        const taskName = document.createElement('input');
        taskName.classList.add('input-popup', 'task-name-input');
        taskName.setAttribute('id', 'add-task-name');
        taskName.setAttribute('type', 'text');
        taskName.setAttribute('placeholder', 'Enter task name');
        taskName.setAttribute('required', '');

        const taskDescription = document.createElement('textarea');
        taskDescription.classList.add('input-popup', 'task-description-input');
        taskDescription.setAttribute('id','add-task-description');
        taskDescription.setAttribute('type', 'text');
        taskDescription.setAttribute('rows', '3');
        taskDescription.setAttribute('placeholder', 'Enter task description');

        const taskDate = document.createElement('input');
        taskDate.classList.add('input-popup', 'task-date-input');
        taskDate.setAttribute('id', 'add-task-date');
        taskDate.setAttribute('type', 'date');
        taskDate.setAttribute('placeholder', 'Enter task date');

        const submitButton = document.createElement('button');
        submitButton.classList.add('submit-button');
        submitButton.setAttribute('type', 'submit');
        submitButton.textContent = 'Add';

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('cancel-button');
        cancelButton.setAttribute('type', 'button');
        cancelButton.setAttribute('id', 'cancel-task-button');
        cancelButton.textContent = 'Cancel';

        const formButtons = document.createElement('div');
        formButtons.classList.add('form-buttons');
        formButtons.appendChild(submitButton);
        formButtons.appendChild(cancelButton);

        addTaskForm.appendChild(formHeader);
        addTaskForm.appendChild(taskName);
        addTaskForm.appendChild(taskDescription);
        addTaskForm.appendChild(taskDate);
        addTaskForm.appendChild(formButtons);

        const projectContent = document.getElementById('project-content');
        projectContent.appendChild(addTaskForm);
    }

    // create task content 

    static createTasksList() {
        const tasksList = document.createElement('div');
        tasksList.classList.add('tasks-list');
        tasksList.setAttribute('id', 'tasks-list');

        const projectContent = document.getElementById('project-content');
        projectContent.appendChild(tasksList)
    }

    static createTask(task) {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task');

        taskContainer.setAttribute('data-task', task.taskId);

        const checkBubble = document.createElement('div');
        checkBubble.classList.add('unchecked');

        const taskDetails = document.createElement('div');
        taskDetails.classList.add('task-details');

        const titleElement = document.createElement('div');
        titleElement.classList.add('task-name');
        titleElement.setAttribute('id', 'task-name');
        titleElement.textContent = task.getName();

        const descriptionElement = document.createElement('div');
        descriptionElement.classList.add('task-description');
        descriptionElement.textContent = task.getDescription();

        taskDetails.appendChild(titleElement);
        taskDetails.appendChild(descriptionElement);

        const dueDateElement = document.createElement('div');
        dueDateElement.textContent = `${task.getDate()}`;

        const starIcon = document.createElement('span');
        starIcon.classList.add('material-symbols-outlined');
        starIcon.textContent = 'star';

        const editIcon = document.createElement('span');
        editIcon.classList.add('material-symbols-outlined', 'edit');
        editIcon.textContent = 'edit';

        const deleteIcon = document.createElement('span');
        deleteIcon.classList.add('material-symbols-outlined', 'delete');
        deleteIcon.textContent = 'delete';

        const taskActions = document.createElement('div');
        taskActions.classList.add('task-actions');
        taskActions.appendChild(starIcon);
        taskActions.appendChild(editIcon);
        taskActions.appendChild(deleteIcon);

        taskContainer.appendChild(checkBubble);
        taskContainer.appendChild(taskDetails);
        taskContainer.appendChild(dueDateElement);
        taskContainer.appendChild(taskActions);

        const tasksList = document.getElementById('tasks-list');
        tasksList.appendChild(taskContainer);

        Controller.initTaskButtons();
    }
}