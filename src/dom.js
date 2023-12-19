import Task from "./task";
import Project from "./project";
import TodoList from "./todolist";
import Storage from "./storage";
import CreateHtml from "./create-html";
import Controller from "./controller";

class DOMManager {
    constructor() {
        this.html = new CreateHtml();
        this.storage = new Storage();

        // DOM elements
        this.main = document.querySelector('main');
        this.defaultProjectsContainer = document.getElementById('default-projects');
        this.projectsContainer = document.getElementById('projects');
        this.addProjectForm = document.getElementById('add-project-form');
        this.projectNameInput = document.getElementById('input-project-add-popup');
        this.addProjectButton = document.getElementById('button-project-add');
        this.cancelProjectButton = document.getElementById('button-project-cancel-popup');
        this.tasksContainer = document.getElementById('tasks');

        // Initialize openDropdown to keep track of the currently open dropdown
        this.openDropdown = null;

        // keeps track of the current project/task that is being edited
        this.currentlyEditing = null;

        // keeps track of the current project that is being confirmed to delete
        this.currentlyDeleting = null;

        // keeps track of the current project that is being viewed
        this.currentProject = null;

        // Event listeners
        // this.addProjectForm.addEventListener('submit', this.handleProjectFormSubmit.bind(this));
        // this.addProjectButton.addEventListener('click', this.toggleProjectForm.bind(this));
        // this.cancelProjectButton.addEventListener('click', this.toggleProjectForm.bind(this));
        // document.addEventListener('click', this.handleDocumentClick.bind(this));
    }

    initialize() {
        this.html.initializeHtml();
        this.loadProjects();
        Controller.initProjectButtons();
        // this.renderDefaultProjects();
        // this.renderProjects();
        // this.displayInbox();
    }

    // loading content 

    loadProjects() {
        this.storage.getTodoList().getProjects().forEach((project) => {
            if (!project.isDefault) {
                this.html.createProject(project);
            } else {
                this.html.createDefaultProject(project);
            }
        });
    }

    updateDefaultProjects() {
        this.storage.displayInbox();
        this.storage.displayToday();
        this.storage.displayThisWeek();
        this.storage.displayImportant();
    }

    displayInbox() {
        const inbox = this.storage.getTodoList().getProject('inbox');
        this.renderTasks(inbox);
        this.currentProject = inbox;
    }

    // Handle clicks outside of dropdowns to hide them
    handleDocumentClick(e) {
        if (!this.openDropdown) return;
        
        const dropdownButton = e.target.closest('.dropdown-action');
        if (!dropdownButton) {
            // click was not on the 3-dot menu, hide all dropdowns
            this.hideOpenDropdown();
        }
    }

    handleProjectFormSubmit(e) {
        e.preventDefault();

        const projectName = this.projectNameInput.value;
        if (projectName.trim() === '') {
            alert('Please enter a valid Project name');
            return;
        }
        const newProject = new Project(projectName);
        this.storage.addProject(newProject);
        this.renderProject(newProject);
        this.toggleProjectForm();
    }

    handleEditProjectForm(e) {
        e.preventDefault();

        const editProjectForm = document.getElementById('edit-project-form');
        const newName = editProjectForm.querySelector('.input-popup').value;

        const projectContainer = this.currentlyEditing;
        const projectId = Number(projectContainer.getAttribute('data-project'));

        if (newName.trim() !== '') {
            this.storage.editProject(projectId, newName);
            this.hideAllForms();
            this.renderProjects();
        }
    }

    handleDeleteProject(projectContainer) {
        const projectId = Number(projectContainer.getAttribute('data-project'));
        this.storage.deleteProject(projectId);
        this.updateDefaultProjects();

        this.hideAllForms();
        this.renderProjects();
        this.displayInbox();
    }

    handleDeleteTask(taskContainer) {
        const task = this.getCurrentTask(taskContainer);
        this.storage.deleteTask(task.projectId, task.taskId);
        this.updateDefaultProjects();
        
        this.hideAllForms();
        this.renderTasks(this.currentProject);
        console.log(this.currentProject.getTasks());
    }

    handleAddTask(e) {
        e.preventDefault();
        const newTask = this.getAddTaskInput();
        newTask.projectId = this.currentProject.projectId;

        this.storage.addTask(this.currentProject.projectId, newTask);
        this.updateDefaultProjects();

        this.toggleAddTaskForm();
        this.renderTasks(this.currentProject);
    }

    handleEditTask(e) {
        e.preventDefault();
        const editInputs = this.getEditTaskInputs();
        const editedName = editInputs.nameInput.value.trim();
        const editedDescription = editInputs.descriptionInput.value.trim();
        let editedDueDate = editInputs.dateInput.value;
        if (editInputs.dateInput.value.trim() === '') editedDueDate = 'No date';
        
        const currentTask = this.getCurrentTask(this.currentlyEditing);
        this.storage.editTask(currentTask, editedName, editedDescription, editedDueDate);
        this.updateDefaultProjects();

        this.hideAllForms();
        this.renderTasks(this.currentProject);
    }

    // check to see if project or task is being edited
    handleShowEditForm(container) {
        // closes previously open forms (if any)
        this.hideAllForms();

        if (container.classList.contains('project')) {
            this.showEditProjectForm(container); // pass over the project container to hide when the form pops up 
        } else {
            this.showEditTaskForm(container); // pass over the task object to populate the task inputs on the form
        }
    }

    getCurrentTask(taskContainer) {
        const taskId = Number(taskContainer.getAttribute('data-task'));
        return this.storage.getTodoList().getProject(this.currentProject.projectId).getTask(taskId);
    }

    getAddTaskInput() {
        const taskNameInput = document.getElementById('add-task-name').value.trim();
        const taskDescriptionInput = document.getElementById('add-task-description').value.trim();
        let taskDateInput = document.getElementById('add-task-date').value;
        if (taskDateInput.trim() === '') taskDateInput = 'No date';

        return new Task(taskNameInput, taskDescriptionInput, taskDateInput);
    }

    getEditTaskInputs() {
        return {
            nameInput: document.getElementById('edit-task-name'),
            descriptionInput: document.getElementById('edit-task-description'),
            dateInput: document.getElementById('edit-task-date')
        };
    }

    populateEditTaskForm(taskContainer) {
        const task = this.getCurrentTask(taskContainer);
        const editInputs = this.getEditTaskInputs();

        editInputs.nameInput.value = task.name;
        editInputs.descriptionInput.value = task.description;
        editInputs.dateInput.value = task.dueDate;
    }

    createDeleteMessage() {
        const message = document.createElement('div');
        message.classList.add('delete-message-popup', 'hidden');
        message.setAttribute('id', 'delete-message');

        const text = document.createElement('p');
        text.textContent = 'Are you sure you want to delete?';

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('popup-buttons');

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('button-confirm-popup');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
            if (this.currentlyDeleting.classList.contains('project')) {
                this.handleDeleteProject();
            } else {
                this.handleDeleteTask();
            }
        };

        const cancelBtn = document.createElement('button');
        cancelBtn.classList.add('button-cancel-popup');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.onclick = () => this.hideDeleteMessage();

        buttonsContainer.appendChild(deleteBtn);
        buttonsContainer.appendChild(cancelBtn);

        message.appendChild(text);
        message.appendChild(buttonsContainer);

        return message;
    }

    createEditProjectForm() {
        const editProjectForm = document.createElement('form');
        editProjectForm.classList.add('project-form', 'hidden');
        editProjectForm.setAttribute('id', 'edit-project-form');

        const input = document.createElement('input');
        input.classList.add('input-popup');
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Enter new project name');

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('popup-buttons');

        const submitBtn = document.createElement('button');
        submitBtn.classList.add('button-confirm-popup');
        submitBtn.setAttribute('type', 'submit');
        submitBtn.textContent = 'Edit';
        submitBtn.onclick = (e) => this.handleEditProjectForm(e);

        const cancelBtn = document.createElement('button');
        cancelBtn.classList.add('button-cancel-popup');
        cancelBtn.setAttribute('type', 'button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.onclick = () => this.hideEditProjectForm();

        buttonsContainer.appendChild(submitBtn);
        buttonsContainer.appendChild(cancelBtn);

        editProjectForm.appendChild(input);
        editProjectForm.appendChild(buttonsContainer);

        return editProjectForm;
    }

    createEditTaskForm() {
        const editTaskForm = document.createElement('form');
        editTaskForm.classList.add('task-form', 'hidden');
        editTaskForm.setAttribute('id', 'edit-task-form');

        const formHeader = document.createElement('h1');
        formHeader.classList.add('form-header');
        formHeader.textContent = 'Edit Task';

        const taskName = document.createElement('input');
        taskName.classList.add('input-popup', 'task-name-input');
        taskName.setAttribute('id', 'edit-task-name');
        taskName.setAttribute('type', 'text');
        taskName.setAttribute('placeholder', 'Enter task name');
        taskName.setAttribute('required', '');

        const taskDescription = document.createElement('textarea');
        taskDescription.classList.add('input-popup', 'task-description-input');
        taskDescription.setAttribute('id','edit-task-description');
        taskDescription.setAttribute('type', 'text');
        taskDescription.setAttribute('rows', '3');
        taskDescription.setAttribute('placeholder', 'Enter task description');

        const taskDate = document.createElement('input');
        taskDate.classList.add('input-popup', 'task-date-input');
        taskDate.setAttribute('id', 'edit-task-date');
        taskDate.setAttribute('type', 'date');
        taskDate.setAttribute('placeholder', 'Enter task date');

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('popup-buttons');

        const editBtn = document.createElement('button');
        editBtn.classList.add('button-confirm-popup');
        editBtn.setAttribute('type', 'submit');
        editBtn.textContent = 'Edit';
        editBtn.onclick = (e) => this.handleEditTask(e);

        const cancelBtn = document.createElement('button');
        cancelBtn.classList.add('button-cancel-popup');
        cancelBtn.setAttribute('type', 'button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.onclick = () => this.hideEditTaskForm();

        buttonsContainer.appendChild(editBtn);
        buttonsContainer.appendChild(cancelBtn);

        editTaskForm.appendChild(formHeader);
        editTaskForm.appendChild(taskName);
        editTaskForm.appendChild(taskDescription);
        editTaskForm.appendChild(taskDate);
        editTaskForm.appendChild(buttonsContainer);

        return editTaskForm;
    }

    createDropdownActions(container) {
        const dropdownActions = document.createElement('div');
        dropdownActions.classList.add('dropdown-actions');
        dropdownActions.onclick = (e) => this.toggleActionsMenu(e);

        const dropdownAction = document.createElement('span');
        dropdownAction.classList.add('material-symbols-outlined', 'dropdown-action');
        dropdownAction.textContent = 'more_vert';

        const dropdownMenu = document.createElement('div');
        dropdownMenu.classList.add('dropdown-menu', 'hidden');

        const editButton = document.createElement('button');
        editButton.classList.add('edit-dropdown');
        editButton.textContent = 'Edit';
        editButton.onclick = () => this.handleShowEditForm(container);

        const deleteButton = document.createElement('button')
        deleteButton.classList.add('delete-dropdown');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            if (container.classList.contains('project')) {
                this.handleDeleteProject(container);
            } else {
                this.handleDeleteTask(container);
            }
        };

        dropdownMenu.appendChild(editButton);
        dropdownMenu.appendChild(deleteButton);
        dropdownActions.appendChild(dropdownAction);
        dropdownActions.appendChild(dropdownMenu);

        return dropdownActions;
    }

    createAddTaskForm() {
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

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('popup-buttons');

        const addBtn = document.createElement('button');
        addBtn.classList.add('button-confirm-popup');
        addBtn.setAttribute('type', 'submit');
        addBtn.textContent = 'Add';
        addBtn.onclick = (e) => this.handleAddTask(e);

        const cancelBtn = document.createElement('button');
        cancelBtn.classList.add('button-cancel-popup');
        cancelBtn.setAttribute('type', 'button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.onclick = () => this.toggleAddTaskForm();

        buttonsContainer.appendChild(addBtn);
        buttonsContainer.appendChild(cancelBtn);

        addTaskForm.appendChild(formHeader);
        addTaskForm.appendChild(taskName);
        addTaskForm.appendChild(taskDescription);
        addTaskForm.appendChild(taskDate);
        addTaskForm.appendChild(buttonsContainer);

        return addTaskForm;
    }

    createAddTaskBtn() {
        const addTaskBtn = document.createElement('button');
        addTaskBtn.classList.add('button-task-add');
        addTaskBtn.setAttribute('id', 'add-task-btn');
        addTaskBtn.textContent = '+ Add Task';
        addTaskBtn.onclick = () => this.toggleAddTaskForm();

        return addTaskBtn;
    }

    renderDefaultProjects() {
        const homeHeading = document.createElement('h2');
        homeHeading.classList.add('projects-heading');
        homeHeading.textContent = 'Home';

        this.defaultProjectsContainer.appendChild(homeHeading);

        this.storage.getTodoList().getProjects().forEach((project) => {
            if (project.isDefault) {
                this.renderProject(project);
            }
        });
    }

    renderProjects() {
        this.clearProjects();

        const projectsHeading = document.createElement('h2');
        projectsHeading.classList.add('projects-heading');
        projectsHeading.textContent = 'Projects';

        this.projectsContainer.appendChild(projectsHeading);

        this.storage.getTodoList().getProjects().forEach((project) => {
            if (!project.isDefault) {
                this.renderProject(project);
            }
        });
    }

    renderProject(project) {
        const projectContainer = document.createElement('button');
        projectContainer.classList.add('project');
        projectContainer.setAttribute('data-project', project.projectId);
        projectContainer.textContent = project.name;

        projectContainer.addEventListener('click', () => {
            this.currentProject = project;
            this.renderTasks(project);
        });

        if (project.isDefault) {
            this.defaultProjectsContainer.appendChild(projectContainer)
        } else {
            projectContainer.appendChild(this.createDropdownActions(projectContainer));
            this.projectsContainer.appendChild(projectContainer);
        }
    }

    renderTasks(project) {
        this.hideAllForms();
        this.clearTasks();
        console.log(project);

        const projectHeader = document.createElement('div');
        projectHeader.classList.add('project-header');
        projectHeader.setAttribute('id', 'project-header');
        projectHeader.textContent = `${project.name}`; 

        this.tasksContainer.appendChild(projectHeader);
        // create the add task button for only the inbox and user generated projects
        if (!project.isDefault || project.projectId === 'inbox') {
            this.tasksContainer.appendChild(this.createAddTaskBtn());
            this.tasksContainer.appendChild(this.createAddTaskForm());
        }

        this.storage.getTodoList().getProject(project.projectId).getTasks().forEach((task) => {
            this.renderTaskDetails(task);
        });
    }

    renderTaskDetails(task) {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task');

        taskContainer.setAttribute('data-task', task.taskId);

        const checkBubble = document.createElement('div');
        checkBubble.classList.add('unchecked');
        checkBubble.onclick = (e) => this.toggleTaskComplete(e, task);

        const taskDetails = document.createElement('div');
        taskDetails.classList.add('task-details');

        if (task.completed) {
            checkBubble.classList.add('checked');
            taskDetails.classList.add('line-through', 'faded');
        };

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
        starIcon.addEventListener('click', (e) => this.toggleTaskImportant(e, task));

        if (task.important) starIcon.classList.add('important');

        const taskActions = document.createElement('div');
        taskActions.classList.add('task-actions');
        taskActions.appendChild(starIcon);
        taskActions.appendChild(this.createDropdownActions(taskContainer));

        taskContainer.appendChild(checkBubble);
        taskContainer.appendChild(taskDetails);
        taskContainer.appendChild(dueDateElement);
        taskContainer.appendChild(taskActions);

        this.tasksContainer.appendChild(taskContainer);
    }

    toggleTaskComplete(e, task) {
        const checkBubble = e.target;
        const taskDetails = e.target.closest('.task').querySelector('.task-details');

        this.storage.toggleTaskCompleted(task);
        this.updateDefaultProjects();

        checkBubble.classList.toggle('checked');
        taskDetails.classList.toggle('line-through');
        taskDetails.classList.toggle('faded');
    }

    toggleTaskImportant(e, task) {
        const star = e.target;
        
        this.storage.toggleTaskImportant(task);
        this.updateDefaultProjects();

        star.classList.toggle('important');
        this.renderTasks(this.currentProject);
    }

     // Handle clicks on project's actions (3 dot icon)
     toggleActionsMenu(e) {
        const dropdown = e.target.closest('.dropdown-actions').querySelector('.dropdown-menu');
        dropdown.classList.toggle('hidden');

        // close previously open dropdown (if any)
        if (this.openDropdown && this.openDropdown !== dropdown) {
            this.openDropdown.classList.add('hidden');
        }
        
        this.openDropdown = dropdown;
    }

    toggleProjectForm() {
        this.addProjectForm.classList.toggle('hidden');
        this.addProjectButton.classList.toggle('hidden');
        this.projectNameInput.value = '';
    }

    toggleAddTaskForm() {
        const addTaskForm = document.getElementById('add-task-form');
        const addTaskBtn = document.getElementById('add-task-btn');

        addTaskForm.reset();
        addTaskBtn.classList.toggle('hidden');
        addTaskForm.classList.toggle('hidden');
    }

    showEditProjectForm(projectContainer) {
        const editProjectForm = this.createEditProjectForm();
        projectContainer.after(editProjectForm);

        projectContainer.classList.add('hidden');
        editProjectForm.classList.remove('hidden');
        
        this.currentlyEditing = projectContainer;
    }

    showEditTaskForm(taskContainer) {
        const editTaskForm = this.createEditTaskForm();
        taskContainer.after(editTaskForm);
        this.populateEditTaskForm(taskContainer);

        taskContainer.classList.add('hidden');
        editTaskForm.classList.remove('hidden');

        this.currentlyEditing = taskContainer;
    }

    showDeleteMessage(container) {
        this.hideAllForms();

        const deleteMessage = this.createDeleteMessage();
        container.after(deleteMessage);

        container.classList.add('hidden');
        deleteMessage.classList.remove('hidden');

        this.currentlyDeleting = container;
    }

    hideOpenDropdown() {
        this.openDropdown.classList.add('hidden');
        this.openDropdown = null; // reset openDropdown variable
    }

    hideEditProjectForm() {
        // if there are no project forms opened, we exit the function
        if (!this.currentlyEditing || !this.currentlyEditing.classList.contains('project')) {
            return;
        };

        const editProjectForm = document.getElementById('edit-project-form');
        editProjectForm.remove();

        this.currentlyEditing.classList.remove('hidden');
        this.currentlyEditing = null; // reset currentlyEditing variable
    }

    hideEditTaskForm() {
        // if there are no tasks forms opened, we exit the function
        if (!this.currentlyEditing || !this.currentlyEditing.classList.contains('task')) {
            return;
        };

        const editTaskForm = document.getElementById('edit-task-form');
        editTaskForm.remove();
        
        this.currentlyEditing.classList.remove('hidden');
        this.currentlyEditing = null;
    }

    hideDeleteMessage() {
        // if there are no delete messages opened, we exit the function
        if (!this.currentlyDeleting) {
            return;
        };

        const deleteMessage = document.getElementById('delete-message');
        deleteMessage.remove();

        this.currentlyDeleting.classList.remove('hidden');
        this.currentlyDeleting = null;
    }

    hideAllForms() {
        this.hideEditTaskForm();
        this.hideEditProjectForm();
        this.hideDeleteMessage();
    }

    clearProjects() {
        this.projectsContainer.innerHTML = '';
    }

    clearTasks() {
        this.tasksContainer.innerHTML = '';
    }
}

export default DOMManager;