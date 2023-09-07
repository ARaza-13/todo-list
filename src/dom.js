class DOMManager {
    constructor(todoList, Project, Task) {
        this.todoList = todoList;
        this.Project = Project;
        this.Task = Task;

        // DOM elements
        this.defaultProjectsContainer = document.getElementById('default-projects');
        this.projectsContainer = document.getElementById('projects');
        this.projectForm = document.getElementById('project-form');
        this.projectNameInput = document.getElementById('input-add-project-popup');
        this.addProjectButton = document.getElementById('button-add-project');
        this.cancelProjectButton = document.getElementById('button-cancel-project-popup');
        this.tasksConatiner = document.getElementById('tasks');

        // Initialize openDropdown to keep track of the currently open dropdown
        this.openDropdown = null;

        // Event listeners
        this.projectsContainer.addEventListener('click', this.handleProjectActions.bind(this));
        this.projectForm.addEventListener('submit', this.handleProjectFormSubmit.bind(this));
        this.addProjectButton.addEventListener('click', this.toggleProjectForm.bind(this));
        this.cancelProjectButton.addEventListener('click', this.toggleProjectForm.bind(this));
        document.addEventListener('click', this.handleDocumentClick.bind(this));
    }

    initialize(todoList) {
        this.renderProjects(todoList);
    }

    // Handle clicks on project's actions (3 dot icon)
    handleProjectActions(e) {
        const projectActions = e.target.closest('.project-actions');
        if (!projectActions) {
            return;
        }

        const dropdown = projectActions.querySelector('.project-dropdown');
        dropdown.classList.toggle('hidden');

        // close previously open dropdown (if any)
        if (this.openDropdown && this.openDropdown !== dropdown) {
            this.openDropdown.classList.add('hidden');
        }
        
        this.openDropdown = dropdown;
    }

    // Handle clicks outside of dropdowns to hide them
    handleDocumentClick(e) {
        const dropdownButton = e.target.closest('.project-actions .project-action');
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

    createProjectActions(projectContainer) {
        const projectActions = document.createElement('div');
        projectActions.classList.add('project-actions');

        const projectAction = document.createElement('span');
        projectAction.classList.add('project-action');

        const projectDropdown = document.createElement('div');
        projectDropdown.classList.add('project-dropdown', 'hidden');

        const editButton = document.createElement('button');
        editButton.classList.add('edit-project');
        editButton.textContent = 'Edit';

        const deleteButton = document.createElement('button')
        deleteButton.classList.add('delete-project');
        deleteButton.textContent = 'Delete';

        projectDropdown.appendChild(editButton);
        projectDropdown.appendChild(deleteButton);
        projectActions.appendChild(projectAction);
        projectActions.appendChild(projectDropdown);

        projectContainer.appendChild(projectActions);
    }

    renderProjects(todoList) {
        this.clearProjects();

        const homeHeading = document.createElement('h2');
        homeHeading.classList.add('projects-heading');
        homeHeading.textContent = 'Home';

        const projectsHeading = document.createElement('h2');
        projectsHeading.classList.add('projects-heading');
        projectsHeading.textContent = 'Projects';

        this.defaultProjectsContainer.appendChild(homeHeading);
        this.projectsContainer.appendChild(projectsHeading);

        todoList.getProjects().forEach((project) => this.renderProject(project));
    }

    renderProject(project) {
        const projectContainer = document.createElement('button');
        projectContainer.classList.add('project');
        projectContainer.textContent = project.name;

        const dataIndex = this.todoList.getProjects().length;
        projectContainer.setAttribute('data-index', dataIndex);

        projectContainer.addEventListener('click', () => this.renderTasks(project));

        if (project.isDefault) {
            this.defaultProjectsContainer.appendChild(projectContainer)
        } else {
            this.createProjectActions(projectContainer);
            this.projectsContainer.appendChild(projectContainer);
        }
    }

    renderTasks(project) {
        this.clearTasks();

        const projectTitle = document.createElement('div');
        projectTitle.classList.add('title');
        projectTitle.textContent = `${project.name}`; 

        this.tasksConatiner.appendChild(projectTitle);

        project.getTasks().forEach((task) => {
            this.renderTaskDetails(task);
        });
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

        const priorityColor = this.getPriorityColor(task.getPriority());
        taskContainer.style.borderRight = `8px solid ${priorityColor}`;

        taskContainer.appendChild(checkBubble);
        taskContainer.appendChild(taskDetails);
        taskContainer.appendChild(dueDateElement);

        this.tasksConatiner.appendChild(taskContainer);
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

    toggleProjectForm() {
        this.projectForm.classList.toggle('hidden');
        this.addProjectButton.classList.toggle('hidden');
        this.projectNameInput.value = '';
    }

    clearProjects() {
        this.projectsContainer.innerHTML = '';
    }

    clearTasks() {
        this.tasksConatiner.innerHTML = '';
    }

    hideOpenDropdown() {
        if (this.openDropdown) {
            this.openDropdown.classList.add('hidden');
            this.openDropdown = null; // reset openDropdown variable
        }
    }
}

export default DOMManager;