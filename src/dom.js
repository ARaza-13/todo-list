class DOMManager {
    constructor(todoList, Project, Task) {
        this.todoList = todoList;
        this.Project = Project;
        this.Task = Task;

        // DOM elements
        this.main = document.querySelector('main');
        this.defaultProjectsContainer = document.getElementById('default-projects');
        this.projectsContainer = document.getElementById('projects');
        this.addProjectForm = document.getElementById('add-project-form');
        this.projectNameInput = document.getElementById('input-project-add-popup');
        this.addProjectButton = document.getElementById('button-project-add');
        this.cancelProjectButton = document.getElementById('button-project-cancel-popup');
        this.tasksConatiner = document.getElementById('tasks');

        // Initialize openDropdown to keep track of the currently open dropdown
        this.openDropdown = null;

        // keeps track of the current project/task that is being edited
        this.currentlyEditing = null;

        // keeps track of the current project that is being confirmed to delete
        this.currentlyDeleting = null;

        // keeps track of the current project that is being viewed
        this.currentProject = null;

        // Event listeners
        this.addProjectForm.addEventListener('submit', this.handleProjectFormSubmit.bind(this));
        this.addProjectButton.addEventListener('click', this.toggleProjectForm.bind(this));
        this.cancelProjectButton.addEventListener('click', this.toggleProjectForm.bind(this));
        document.addEventListener('click', this.handleDocumentClick.bind(this));

        // DOM nodes 
        this.main.appendChild(this.createAddTaskForm());
        this.main.appendChild(this.createEditTaskForm());
        this.main.appendChild(this.createDeleteMessage());
        this.main.appendChild(this.createOverlay());
    }

    initialize(todoList) {
        this.renderDefaultProjects(todoList);
        this.renderProjects(todoList);
        this.displayInbox();
    }

    displayInbox() {
        // const inbox = document.querySelector('[data-project="inbox"]');
        const inbox = this.todoList.getProject('inbox');
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
        const newProject = new this.Project(projectName);
        this.todoList.addProject(newProject);
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
            this.todoList.editProject(projectId, newName);
            this.hideEditProjectForm();
            this.renderProjects(this.todoList);
        }
    }

    handleDeleteProject() {
        const projectContainer = this.currentlyDeleting;
        const projectId = Number(projectContainer.getAttribute('data-project'));
        this.todoList.deleteProject(projectId);
        this.renderProjects(this.todoList);
        this.hideDeleteMessage();
        this.displayInbox();
    }

    handleDeleteTask() {
        const taskContainer = this.currentlyDeleting;
        const taskId = Number(taskContainer.getAttribute('data-task'));
        const projectId = this.getCurrentTask(taskContainer).projectId;
        const currentProject = this.todoList.getProject(projectId);
        
        this.todoList.deleteTaskFromProject(currentProject, taskId);
        this.renderTasks(this.currentProject);
        console.log(this.currentProject.getTasks());
        this.hideDeleteMessage();
    }

    handleAddTask(e) {
        e.preventDefault();
        const newTask = this.getAddTaskInput();
        
        this.todoList.addTaskToProject(this.currentProject, newTask);
        this.toggleAddTaskForm();
        this.renderTasks(this.currentProject);
        console.log(this.currentProject.getTasks());
    }

    handleEditTask(e) {
        e.preventDefault();
        const editInputs = this.getEditTaskInputs();
        const updatedName = editInputs.nameInput.value.trim();
        const updatedDescription = editInputs.descriptionInput.value.trim();
        let updatedDueDate = editInputs.dateInput.value;
        if (editInputs.dateInput.value.trim() === '') updatedDueDate = 'No date';
        
        const currentTask = this.getCurrentTask(this.currentlyEditing);
        currentTask.updateTask(updatedName, updatedDescription, updatedDueDate);

        this.renderTasks(this.currentProject);
        this.hideEditTaskForm();
    }

    // check to see if project or task is being edited
    handleShowEditForm(container) {
        // closes previously open edit form (if any)
        if (this.currentlyEditing) {
            this.hideEditProjectForm();
        }

        if (container.classList.contains('project')) {
            this.showEditProjectForm(container); // pass over the project container to hide when the form pops up 
        } else {
            this.showEditTaskForm(container); // pass over the task object to populate the task inputs on the form
        }
    }

    getCurrentTask(taskContainer) {
        const taskId = Number(taskContainer.getAttribute('data-task'));
        return this.currentProject.getTask(taskId);
    }

    getAddTaskInput() {
        const taskNameInput = document.getElementById('add-task-name').value.trim();
        const taskDescriptionInput = document.getElementById('add-task-description').value.trim();
        let taskDateInput = document.getElementById('add-task-date').value;
        if (taskDateInput.trim() === '') taskDateInput = 'No date';

        return new this.Task(taskNameInput, taskDescriptionInput, taskDateInput);
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

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay', 'hidden');
        overlay.setAttribute('id', 'overlay');

        return overlay;
    }

    createDeleteMessage() {
        const message = document.createElement('div');
        message.classList.add('delete-message','popup', 'hidden');
        message.setAttribute('id', 'message-popup-confirmation');

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
        editTaskForm.classList.add('task-form', 'popup', 'hidden');
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
        deleteButton.onclick = () => this.showDeleteMessage(container);

        dropdownMenu.appendChild(editButton);
        dropdownMenu.appendChild(deleteButton);
        dropdownActions.appendChild(dropdownAction);
        dropdownActions.appendChild(dropdownMenu);

        container.appendChild(dropdownActions);
    }

    createAddTaskForm() {
        const addTaskForm = document.createElement('form');
        addTaskForm.classList.add('task-form', 'popup', 'hidden');
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
        addTaskBtn.textContent = '+ Add Task';
        addTaskBtn.onclick = () => this.toggleAddTaskForm();

        return addTaskBtn;
    }

    renderDefaultProjects(todoList) {
        const homeHeading = document.createElement('h2');
        homeHeading.classList.add('projects-heading');
        homeHeading.textContent = 'Home';

        this.defaultProjectsContainer.appendChild(homeHeading);

        todoList.defaultProjects.forEach((project) => this.renderProject(project));
    }

    renderProjects(todoList) {
        this.clearProjects();

        const projectsHeading = document.createElement('h2');
        projectsHeading.classList.add('projects-heading');
        projectsHeading.textContent = 'Projects';

        this.projectsContainer.appendChild(projectsHeading);

        todoList.getProjects().forEach((project) => this.renderProject(project));
    }

    renderProject(project) {
        const projectContainer = document.createElement('button');
        projectContainer.classList.add('project');
        projectContainer.setAttribute('data-project', project.projectId);
        projectContainer.textContent = project.name;

        projectContainer.addEventListener('click', () => {
            this.renderTasks(project);
            this.currentProject = project;
        });

        if (project.isDefault) {
            this.defaultProjectsContainer.appendChild(projectContainer)
        } else {
            this.createDropdownActions(projectContainer);
            this.projectsContainer.appendChild(projectContainer);
        }
    }

    renderTasks(project) {
        this.clearTasks();

        const projectHeader = document.createElement('div');
        projectHeader.classList.add('project-header');
        projectHeader.setAttribute('id', 'project-header');
        projectHeader.textContent = `${project.name}`; 

        this.tasksConatiner.appendChild(projectHeader);

        this.todoList.setTasksToday();
        this.todoList.setTasksThisWeek();
        project.getTasks().forEach((task) => {
            this.renderTaskDetails(task);
        });

        // create the add task button for only the inbox and user generated projects
        if (!project.isDefault || project.projectId === 'inbox') {
            this.tasksConatiner.appendChild(this.createAddTaskBtn());
        }

        console.log(project);
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

        // const priorityColor = this.getPriorityColor(task.priority);
        // taskContainer.style.borderRight = `8px solid ${priorityColor}`;

        taskContainer.appendChild(checkBubble);
        taskContainer.appendChild(taskDetails);
        taskContainer.appendChild(dueDateElement);
        this.createDropdownActions(taskContainer);

        this.tasksConatiner.appendChild(taskContainer);
    }

    toggleTaskComplete(e, task) {
        const checkBubble = e.target;
        const taskDetails = e.target.closest('.task').querySelector('.task-details');

        if (!task.completed) {
            task.completed = true;
            checkBubble.classList.add('checked');
            taskDetails.classList.add('line-through', 'faded');
        } else {
            task.completed = false;
            checkBubble.classList.remove('checked');
            taskDetails.classList.remove('line-through', 'faded');
        }
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
        addTaskForm.reset();
        addTaskForm.classList.toggle('hidden');

        const overlay = document.getElementById('overlay');
        overlay.classList.toggle('hidden');
    }

    showEditProjectForm(projectContainer) {
        const editProjectForm = this.createEditProjectForm();
        projectContainer.classList.add('hidden');

        editProjectForm.classList.remove('hidden');
        
        projectContainer.after(editProjectForm);
        this.currentlyEditing = projectContainer;
    }

    showEditTaskForm(taskContainer) {
        this.populateEditTaskForm(taskContainer);

        const editTaskForm = document.getElementById('edit-task-form');
        editTaskForm.classList.remove('hidden');

        const overlay = document.getElementById('overlay');
        overlay.classList.remove('hidden');

        this.currentlyEditing = taskContainer;
    }

    showDeleteMessage(container) {
        const message = document.getElementById('message-popup-confirmation');
        message.classList.remove('hidden');

        const overlay = document.getElementById('overlay');
        overlay.classList.remove('hidden');

        this.currentlyDeleting = container;
    }

    hideOpenDropdown() {
        this.openDropdown.classList.add('hidden');
        this.openDropdown = null; // reset openDropdown variable
    }

    hideEditProjectForm() {
        const editProjectForm = document.getElementById('edit-project-form');

        editProjectForm.remove();
        this.currentlyEditing.classList.remove('hidden');

        this.currentlyEditing = null; // reset currentlyEditing variable
    }

    hideEditTaskForm() {
        const editTaskForm = document.getElementById('edit-task-form');
        editTaskForm.classList.add('hidden');

        const overlay = document.getElementById('overlay');
        overlay.classList.add('hidden');

        this.currentlyEditing = null;
    }

    hideDeleteMessage() {
        const message = document.getElementById('message-popup-confirmation');
        message.classList.add('hidden');

        const overlay = document.getElementById('overlay');
        overlay.classList.add('hidden');

        this.currentlyDeleting = null;
    }

    clearProjects() {
        this.projectsContainer.innerHTML = '';
    }

    clearTasks() {
        this.tasksConatiner.innerHTML = '';
    }
}

export default DOMManager;