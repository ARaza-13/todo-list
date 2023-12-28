import DOMManager from "./dom";
import Storage from "./storage";
import CreateHtml from "./create-html";
import Project from "./project";
import Task from "./task";

export default class Controller {

    // project event listeners 

    static initProjectButtons() {
        const inboxProjectButton = document.getElementById('inbox-project-button');
        const todayProjectButton = document.getElementById('today-project-button');
        const weekProjectButton = document.getElementById('week-project-button');
        const importantProjectButton = document.getElementById('important-project-button');
        const projectButtons = document.querySelectorAll('[data-project-button]');

        inboxProjectButton.addEventListener('click', Controller.openInboxTasks);
        todayProjectButton.addEventListener('click', Controller.openTodayTasks);
        weekProjectButton.addEventListener('click', Controller.openWeekTasks);
        importantProjectButton.addEventListener('click', Controller.openImportantTasks);
        projectButtons.forEach((projectButton) => 
            projectButton.addEventListener('click', Controller.handleProjectButton)
        );
    }

    static openInboxTasks() {
        const projectId = this.getAttribute('data-project');

        Controller.openProject(projectId, this);
    }

    static openTodayTasks() {
        const projectId = this.getAttribute('data-project');

        Controller.openProject(projectId, this);
    }

    static openWeekTasks() {
        const projectId = this.getAttribute('data-project');

        Controller.openProject(projectId, this);
    }

    static openImportantTasks() {
        const projectId = this.getAttribute('data-project');

        Controller.openProject(projectId, this);
    }

    static handleProjectButton(e) {
        const projectId = Number(this.getAttribute('data-project'));

        Controller.openProject(projectId, this);
    }

    static openProject(projectId, projectButton) {
        const buttons = document.querySelectorAll('.project');

        buttons.forEach((button) => button.classList.remove('active'));
        projectButton.classList.add('active');

        DOMManager.loadProjectContent(projectId);
    }

    // add project event listeners

    static initAddProjectButtons() {
        const addProjectButton = document.getElementById('add-project-button');
        const submitProjectButton = document.getElementById('submit-project-button');
        const cancelProjectButton = document.getElementById('cancel-project-button');

        addProjectButton.addEventListener('click', Controller.openProjectForm);
        submitProjectButton.addEventListener('click', Controller.addProject);
        cancelProjectButton.addEventListener('click', Controller.closeProjectForm);
    }

    static openProjectForm() {
        const addProjectButton = document.getElementById('add-project-button');
        const addProjectForm = document.getElementById('add-project-form');

        addProjectButton.classList.add('hidden');
        addProjectForm.classList.remove('hidden');
    }

    static closeProjectForm() {
        const addProjectForm = document.getElementById('add-project-form');
        const addProjectButton = document.getElementById('add-project-button');
        const addProjectInput = document.getElementById('add-project-input');

        addProjectForm.classList.add('hidden');
        addProjectButton.classList.remove('hidden');
        addProjectInput.value = '';
    }

    static addProject() {
        const addProjectInput = document.getElementById('add-project-input');
        const projectName = addProjectInput.value.trim();

        if (projectName === '') {
            alert('Please enter a valid Project name');
            return;
        }

        const project = new Project(projectName)

        Storage.addProject(project);
        CreateHtml.createProject(project);
        Controller.closeProjectForm();
    }

    // add task event listeners

    static initAddTaskButtons() {
        const addTaskButton = document.getElementById('add-task-button');
        // const addTaskForm = document.getElementById('add-task-form');
        const cancelTaskButton = document.getElementById('cancel-task-button');

        addTaskButton.addEventListener('click', Controller.openTaskForm);
        // addTaskForm.addEventListener('submit', Controller.addTask);
        cancelTaskButton.addEventListener('click', Controller.closeTaskForm);
    }

    static openTaskForm() {
        const addTaskButton = document.getElementById('add-task-button');
        const addTaskForm = document.getElementById('add-task-form');

        addTaskButton.classList.add('hidden');
        addTaskForm.classList.remove('hidden');
    }

    static closeTaskForm() {
        const addTaskForm = document.getElementById('add-task-form');
        const addTaskButton = document.getElementById('add-task-button');

        addTaskForm.classList.add('hidden');
        addTaskForm.reset();
        addTaskButton.classList.remove('hidden');
    }
}