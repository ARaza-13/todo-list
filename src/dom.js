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

        // Event listeners
        this.addProjectForm.addEventListener('submit', this.handleProjectFormSubmit.bind(this));
        this.addProjectButton.addEventListener('click', this.toggleProjectForm.bind(this));
        this.cancelProjectButton.addEventListener('click', this.toggleProjectForm.bind(this));
        document.addEventListener('click', this.handleDocumentClick.bind(this));

        // DOM nodes 
        this.main.appendChild(this.createAddTaskForm());
        this.main.appendChild(this.createEditTaskForm());
        this.main.appendChild(this.createDeleteProjectMessage());
        this.main.appendChild(this.createOverlay());
    }

    initialize(todoList) {
        this.renderDefaultProjects(todoList);
        this.renderProjects(todoList);
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
        const projectIndex = projectContainer.getAttribute('data-project');

        if (newName.trim() !== '') {
            this.todoList.editProject(projectIndex, newName);
            this.hideEditProjectForm();
            this.renderProjects(this.todoList);
        }
    }

    handleDeleteProject() {
        const projectContainer = this.currentlyDeleting;
        const projectIndex = projectContainer.getAttribute('data-project');
        this.todoList.deleteProject(projectIndex);
        this.renderProjects(this.todoList);
        this.hideDeleteProjectMessage();
    }

    handleAddTask(e) {
        e.preventDefault();
        const newTask = this.getAddTaskInput();
        const currentProjectName = document.getElementById('project-title').textContent;
        const currentProject = this.todoList.getProject(currentProjectName);

        currentProject.addTask(newTask);
        this.toggleAddTaskForm();
        this.renderTasks(currentProject);
        console.log(currentProject.getTasks());
    }

    // check to see if project or task is being edited
    handleShowEditForm(container, todoItem) {
        // closes previously open edit form (if any)
        if (this.currentlyEditing) {
            this.hideEditProjectForm();
        }

        if (container.classList.contains('project')) {
            this.showEditProjectForm(container); // pass over the project container to hide when the form pops up 
        } else {
            this.showEditTaskForm(todoItem); // pass over the task object to populate the task inputs on the form
        }
    }

    getAddTaskInput() {
        const taskNameInput = document.getElementById('add-task-name').value.trim();
        const taskDescriptionInput = document.getElementById('add-task-description').value.trim();
        const taskPriorityInput = document.getElementById('add-task-priority').value;
        let taskDateInput = document.getElementById('add-task-date').value;
        if (taskDateInput.trim() === '') taskDateInput = 'No date';

        return new this.Task(taskNameInput, taskDescriptionInput, taskPriorityInput, taskDateInput);
    }

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay', 'hidden');
        overlay.setAttribute('id', 'overlay');

        return overlay;
    }

    createDeleteProjectMessage() {
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
        deleteBtn.onclick = () => this.handleDeleteProject();

        const cancelBtn = document.createElement('button');
        cancelBtn.classList.add('button-cancel-popup');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.onclick = () => this.hideDeleteProjectMessage();

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
        taskName.classList.add('input-popup', 'task-name');
        taskName.setAttribute('id', 'edit-task-name');
        taskName.setAttribute('type', 'text');
        taskName.setAttribute('placeholder', 'Enter task name');
        taskName.setAttribute('required', '');

        const taskDescription = document.createElement('textarea');
        taskDescription.classList.add('input-popup', 'task-description');
        taskDescription.setAttribute('id','edit-task-description');
        taskDescription.setAttribute('type', 'text');
        taskDescription.setAttribute('rows', '3');
        taskDescription.setAttribute('placeholder', 'Enter task description');

        const taskDate = document.createElement('input');
        taskDate.classList.add('input-popup', 'task-date');
        taskDate.setAttribute('id', 'edit-task-date');
        taskDate.setAttribute('type', 'date');
        taskDate.setAttribute('placeholder', 'Enter task date');

        const taskPriority = document.createElement('select');
        taskPriority.classList.add('select-popup', 'task-priority');
        taskPriority.setAttribute('id', 'edit-task-priority');

        const highPriority = document.createElement('option');
        highPriority.setAttribute('value', 'High');
        highPriority.textContent = 'High';

        const mediumPriority = document.createElement('option');
        mediumPriority.setAttribute('value', 'Medium');
        mediumPriority.textContent = 'Medium';

        const lowPriority = document.createElement('option');
        lowPriority.setAttribute('value', 'Low');
        lowPriority.textContent = 'Low';

        taskPriority.appendChild(lowPriority);
        taskPriority.appendChild(mediumPriority);
        taskPriority.appendChild(highPriority);

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
        editTaskForm.appendChild(taskPriority);
        editTaskForm.appendChild(buttonsContainer);

        return editTaskForm;
    }

    createDropdownActions(container, todoItem) {
        const dropdownActions = document.createElement('div');
        dropdownActions.classList.add('dropdown-actions');
        dropdownActions.onclick = (e) => this.toggleActionsMenu(e);

        const dropdownAction = document.createElement('span');
        dropdownAction.classList.add('dropdown-action');

        const dropdownMenu = document.createElement('div');
        dropdownMenu.classList.add('dropdown-menu', 'hidden');

        const editButton = document.createElement('button');
        editButton.classList.add('edit-dropdown');
        editButton.textContent = 'Edit';
        editButton.onclick = () => this.handleShowEditForm(container, todoItem);

        const deleteButton = document.createElement('button')
        deleteButton.classList.add('delete-dropdown');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => this.showDeleteProjectMessage(container);

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
        taskName.classList.add('input-popup', 'task-name');
        taskName.setAttribute('id', 'add-task-name');
        taskName.setAttribute('type', 'text');
        taskName.setAttribute('placeholder', 'Enter task name');
        taskName.setAttribute('required', '');

        const taskDescription = document.createElement('textarea');
        taskDescription.classList.add('input-popup', 'task-description');
        taskDescription.setAttribute('id','add-task-description');
        taskDescription.setAttribute('type', 'text');
        taskDescription.setAttribute('rows', '3');
        taskDescription.setAttribute('placeholder', 'Enter task description');

        const taskDate = document.createElement('input');
        taskDate.classList.add('input-popup', 'task-date');
        taskDate.setAttribute('id', 'add-task-date');
        taskDate.setAttribute('type', 'date');
        taskDate.setAttribute('placeholder', 'Enter task date');

        const taskPriority = document.createElement('select');
        taskPriority.classList.add('select-popup', 'task-priority');
        taskPriority.setAttribute('id', 'add-task-priority');

        const highPriority = document.createElement('option');
        highPriority.setAttribute('value', 'High');
        highPriority.textContent = 'High';

        const mediumPriority = document.createElement('option');
        mediumPriority.setAttribute('value', 'Medium');
        mediumPriority.textContent = 'Medium';

        const lowPriority = document.createElement('option');
        lowPriority.setAttribute('value', 'Low');
        lowPriority.textContent = 'Low';

        taskPriority.appendChild(lowPriority);
        taskPriority.appendChild(mediumPriority);
        taskPriority.appendChild(highPriority);

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
        addTaskForm.appendChild(taskPriority);
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
        projectContainer.textContent = project.name;

        projectContainer.addEventListener('click', () => this.renderTasks(project));

        if (project.isDefault) {
            this.defaultProjectsContainer.appendChild(projectContainer)
        } else {
            const dataIndex = this.findNextDataSet();
            projectContainer.setAttribute('data-project', dataIndex);
            this.createDropdownActions(projectContainer, project);
            this.projectsContainer.appendChild(projectContainer);
        }
    }

    renderTasks(project) {
        this.clearTasks();

        const projectTitle = document.createElement('div');
        projectTitle.classList.add('title');
        projectTitle.setAttribute('id', 'project-title');
        projectTitle.textContent = `${project.name}`; 

        this.tasksConatiner.appendChild(projectTitle);

        project.getTasks().forEach((task) => {
            this.renderTaskDetails(task);
        });

        this.tasksConatiner.appendChild(this.createAddTaskBtn());
    }

    renderTaskDetails(task) {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task');

        const checkBubble = document.createElement('div');
        checkBubble.classList.add('unchecked');

        const taskDetails = document.createElement('div');
        taskDetails.classList.add('task-details');

        const titleElement = document.createElement('p');
        titleElement.classList.add('task-title');
        titleElement.textContent = task.getName();

        const descriptionElement = document.createElement('p');
        descriptionElement.classList.add('task-description');
        descriptionElement.textContent = task.getDescription();

        taskDetails.appendChild(titleElement);
        taskDetails.appendChild(descriptionElement);

        const dueDateElement = document.createElement('p');
        dueDateElement.textContent = `${task.getDate()}`;

        const priorityColor = this.getPriorityColor(task.priority);
        taskContainer.style.borderRight = `8px solid ${priorityColor}`;

        taskContainer.appendChild(checkBubble);
        taskContainer.appendChild(taskDetails);
        taskContainer.appendChild(dueDateElement);
        this.createDropdownActions(taskContainer, task);

        this.tasksConatiner.appendChild(taskContainer);
    }

    findNextDataSet() {
        const allProjects = this.projectsContainer.querySelectorAll('[data-project]');
        return allProjects.length;
    }

    getPriorityColor(priority) {
        if (priority === 'High') {
            return 'red';
        } else if (priority === 'Medium') {
            return 'yellow';
        } else {
            return 'green';
        }
    }

    getEditTaskInputs() {
        return {
            nameInput: document.getElementById('edit-task-name'),
            descriptionInput: document.getElementById('edit-task-description'),
            dateInput: document.getElementById('edit-task-date'),
            priorityInput: document.getElementById('edit-task-priority')
        };
    }

    populateEditTaskForm(task) {
        const editInputs = this.getEditTaskInputs();

        editInputs.nameInput.value = task.name;
        editInputs.descriptionInput.value = task.description;
        editInputs.dateInput.value = task.dueDate;
        editInputs.priorityInput.value = task.priority;
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

    showEditTaskForm(task) {
        this.populateEditTaskForm(task);

        const editTaskForm = document.getElementById('edit-task-form');
        editTaskForm.classList.remove('hidden');

        const overlay = document.getElementById('overlay');
        overlay.classList.remove('hidden');

        this.currentlyEditing = task;
    }

    showDeleteProjectMessage(projectContainer) {
        const message = document.getElementById('message-popup-confirmation');
        message.classList.remove('hidden');

        const overlay = document.getElementById('overlay');
        overlay.classList.remove('hidden');

        this.currentlyDeleting = projectContainer;
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

    hideDeleteProjectMessage() {
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