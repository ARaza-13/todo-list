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

        Storage.initTasksToInbox();
        Controller.openProject(projectId, this);
    }

    static openTodayTasks() {
        const projectId = this.getAttribute('data-project');

        Storage.initTasksToday();
        Controller.openProject(projectId, this);
    }

    static openWeekTasks() {
        const projectId = this.getAttribute('data-project');

        Storage.initTasksThisWeek();
        Controller.openProject(projectId, this);
    }

    static openImportantTasks() {
        const projectId = this.getAttribute('data-project');

        Storage.initTasksImportant();
        Controller.openProject(projectId, this);
    }

    static handleProjectButton(e) {
        const projectId = Number(this.getAttribute('data-project'));

        if (e.target.classList.contains('delete')) {
            Controller.deleteProject(projectId, this);
            return;
        }
        if (e.target.classList.contains('edit')) {
            Controller.openEditProjectForm(this);
            Controller.initEditProjectButtons();
            return;
        }

        Controller.openProject(projectId, this);
    }

    static openProject(projectId, projectButton) {
        const buttons = document.querySelectorAll('.project');

        buttons.forEach((button) => button.classList.remove('active'));
        projectButton.classList.add('active');

        DOMManager.loadProjectContent(projectId);
    }

    static openEditProjectForm(projectButton) {
        if (document.getElementById('edit-project-form')) {
            Controller.closeEditProjectForm();
        }

        const editProjectForm = CreateHtml.createEditProjectForm();
        projectButton.after(editProjectForm);

        projectButton.classList.add('hidden');
        editProjectForm.classList.remove('hidden');
    }

    static deleteProject(projectId, projectButton) {
        Storage.deleteProject(projectId);

        const currentProject = document.querySelector('.active');
        if (projectButton.classList.contains('active') || (currentProject && currentProject.classList.contains('default'))) {
            DOMManager.clearProjectContent();
            currentProject.classList.remove('active');
        }

        projectButton.remove();
    }

    // edit project event listeners

    static initEditProjectButtons() {
        const editProjectButton = document.getElementById('edit-project-button');
        const cancelProjectButton = document.getElementById('cancel-edit-project-button');

        editProjectButton.addEventListener('click', Controller.editProject);
        cancelProjectButton.addEventListener('click', Controller.closeEditProjectForm);
    }

    static editProject() {
        const editProjectInput = document.getElementById('edit-project-input');
        const projectName = editProjectInput.value.trim();

        if (projectName === '') {
            alert('Please enter a valid Project name');
            return;
        }

        const editProjectForm = document.getElementById('edit-project-form');
        const projectButton = editProjectForm.previousSibling;
        const oldProjectName = projectButton.firstChild;
        let projectId = projectButton.getAttribute('data-project');

        if (!isNaN(projectId)) {
            projectId = Number(projectId);
        }

        Storage.editProject(projectId, projectName);
        oldProjectName.textContent = projectName;

        if (projectButton.classList.contains('active')) {
            const projectHeader = document.getElementById('project-header');
            projectHeader.textContent = projectName;
        }

        Controller.closeEditProjectForm();
    }

    static closeEditProjectForm() {
        const editProjectForm = document.getElementById('edit-project-form');
        const projectButton = editProjectForm.previousSibling;
        
        editProjectForm.remove();
        projectButton.classList.remove('hidden');
    }

    // add project event listeners

    static initAddProjectButtons() {
        const addProjectButton = document.getElementById('add-project-button');
        const submitProjectButton = document.getElementById('submit-project-button');
        const cancelProjectButton = document.getElementById('cancel-add-project-button');

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

    // task event listeners 

    static initTaskButtons() {
        const taskButtons = document.querySelectorAll('[data-task]');

        taskButtons.forEach((taskButton) =>
            taskButton.addEventListener('click', Controller.handleTaskButton)
        );
    }

    static handleTaskButton(e) {
        if (e.target.classList.contains('task-bubble')) {
            Controller.toggleTaskComplete(this);
            return;
        }
        if (e.target.classList.contains('star-icon')) {
            Controller.toggleTaskImportant(this);
            return;
        }
        if (e.target.classList.contains('edit')) {
            Controller.openEditTaskForm(this);
            Controller.initEditTaskButtons();
            return;
        }
        if (e.target.classList.contains('delete')) {
            Controller.deleteTask(this);
            return;
        }
    }

    static toggleTaskComplete(taskCard) {
        const task = Controller.getCurrentTask(taskCard);
        const taskBubble = taskCard.querySelector('.task-bubble');
        const taskDetails = taskCard.querySelector('.task-details');

        Storage.toggleTaskComplete(task);
        
        taskBubble.classList.toggle('completed');
        taskDetails.classList.toggle('line-through');
        taskDetails.classList.toggle('faded');
    }

    static toggleTaskImportant(taskCard) {
        const task = Controller.getCurrentTask(taskCard);
        const starIcon = taskCard.querySelector('.star-icon');
        
        Storage.toggleTaskImportant(task);
        starIcon.classList.toggle('important');

        const currentProject = document.querySelector('.active').getAttribute('data-project');
        if (currentProject === 'important') {
            taskCard.remove();
        }
    }

    static deleteTask(taskCard) {
        const taskId = Number(taskCard.getAttribute('data-task'));
        const projectId = Controller.getProjectId(taskCard);

        Storage.deleteTask(projectId, taskId);
        taskCard.remove();
    }

    static openEditTaskForm(taskCard) {
        if (document.getElementById('edit-task-form')) {
            Controller.closeEditTaskForm();
        }

        const editTaskForm = CreateHtml.createEditTaskForm();
        taskCard.after(editTaskForm);
        Controller.populateEditTaskForm(taskCard);

        taskCard.classList.add('hidden');
        editTaskForm.classList.remove('hidden');
    }

    // edit task event listeners 

    static initEditTaskButtons() {
        const editTaskButton = document.getElementById('edit-task-button');
        const cancelEditButton = document.getElementById('cancel-edit-task-button');

        editTaskButton.addEventListener('click', Controller.editTask);
        cancelEditButton.addEventListener('click', Controller.closeEditTaskForm);
    }

    static editTask() {
        const editInputs = Controller.getEditTaskInputs();
        const editedName = editInputs.nameInput.value.trim();
        const editedDescription = editInputs.descriptionInput.value.trim();
        let editedDueDate = editInputs.dateInput.value;
        if (editInputs.dateInput.value.trim() === '') editedDueDate = 'No date';

        const editTaskForm = document.getElementById('edit-task-form');
        const taskCard = editTaskForm.previousSibling;
        const currentTask = Controller.getCurrentTask(taskCard);

        Storage.editTask(currentTask, editedName, editedDescription, editedDueDate);
        Controller.editTaskCard(taskCard, editedName, editedDescription, editedDueDate);

        const currentProject = document.querySelector('.active').getAttribute('data-project');;
        if (currentProject === 'today') {
            Storage.initTasksToday();
            DOMManager.clearProjectContent();
            DOMManager.loadProjectContent(currentProject);
            return;
        }
        if (currentProject === 'week') {
            Storage.initTasksThisWeek();
            DOMManager.clearProjectContent();
            DOMManager.loadProjectContent(currentProject);
            return;
        }

        Controller.closeEditTaskForm();
    }

    static editTaskCard(taskCard, editedName, editedDescription, editedDueDate) {
        const taskName = taskCard.querySelector('.task-name');
        const taskDescription = taskCard.querySelector('.task-description');
        const taskDate = taskCard.querySelector('.task-date');

        taskName.textContent = editedName;
        taskDescription.textContent = editedDescription;
        taskDate.textContent = editedDueDate;
    }

    static closeEditTaskForm() {
        const editTaskForm = document.getElementById('edit-task-form');
        const taskCard = editTaskForm.previousSibling;
        
        editTaskForm.remove();
        taskCard.classList.remove('hidden');
    }

    // add task event listeners

    static initAddTaskButtons() {
        const addTaskButton = document.getElementById('add-task-button');
        const addTaskForm = document.getElementById('add-task-form');
        const cancelTaskButton = document.getElementById('cancel-task-button');

        addTaskButton.addEventListener('click', Controller.openTaskForm);
        addTaskForm.addEventListener('submit', Controller.addTask);
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

    static addTask(e) {
        e.preventDefault();

        const newTask = Controller.getAddTaskInput();
        // const currentProjectId = Controller.getCurrentProjectId();
        let currentProjectId = document.querySelector('.active').getAttribute('data-project');

        if (!isNaN(currentProjectId)) {
            currentProjectId = Number(currentProjectId);
        }

        newTask.projectId = currentProjectId;
        
        Storage.addTask(currentProjectId, newTask);
        DOMManager.clearTasks();
        DOMManager.loadTasks(currentProjectId);
        Controller.closeTaskForm();
    }

    // project functions 
    static getProjectId(taskCard) {
        const projectId = (taskCard.getAttribute('data-project'));

        if (!isNaN(projectId)) {
            return Number(projectId);
        }
        return projectId;
    }

    // task functions 

    static getCurrentTask(taskCard) {
        const projectId = Controller.getProjectId(taskCard);
        const taskId = Number(taskCard.getAttribute('data-task'));

        return Storage.getTodoList().getProject(projectId).getTask(taskId);
    }

    static getAddTaskInput() {
        const taskNameInput = document.getElementById('add-task-name').value.trim();
        const taskDescriptionInput = document.getElementById('add-task-description').value.trim();
        let taskDateInput = document.getElementById('add-task-date').value;
        if (taskDateInput.trim() === '') taskDateInput = 'No date';

        return new Task(taskNameInput, taskDescriptionInput, taskDateInput);
    }

    static getEditTaskInputs() {
        return {
            nameInput: document.getElementById('edit-task-name'),
            descriptionInput: document.getElementById('edit-task-description'),
            dateInput: document.getElementById('edit-task-date')
        };
    }

    static populateEditTaskForm(taskCard) {
        const task = Controller.getCurrentTask(taskCard);
        const editInputs = Controller.getEditTaskInputs();

        editInputs.nameInput.value = task.name;
        editInputs.descriptionInput.value = task.description;
        editInputs.dateInput.value = task.dueDate;
    }
}