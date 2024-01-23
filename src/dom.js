import Storage from "./storage";
import CreateHtml from "./create-html";
import Controller from "./controller";

class DOMManager {
    
    static initialize() {
        CreateHtml.initializeHtml();
        DOMManager.loadDefaultProjects();
        DOMManager.loadProjects();
        Controller.initAddProjectButtons();
        Controller.initProjectButtons();
    }

    // loading content 

    static loadDefaultProjects() {
        Storage.getTodoList().getProjects().forEach((project) => {
            if (project.isDefault) {
                CreateHtml.createDefaultProject(project);
            }
        });
    }

    static loadProjects() {
        Storage.getTodoList().getProjects().forEach((project) => {
            if (!project.isDefault) {
                CreateHtml.createProject(project);
            }
        });
    }

    static loadProjectContent(projectId) {
        DOMManager.clearProjectContent();

        const project = Storage.getTodoList().getProject(projectId);

        CreateHtml.createProjectHeader(project.name);
        if (!project.isDefault || project.projectId === 'inbox') {
            CreateHtml.createAddTaskButton();
            CreateHtml.createAddTaskForm();
        }

        CreateHtml.createTasksList();
        DOMManager.loadTasks(projectId);
    }

    static loadTasks(projectId) {
        Storage.getTodoList().getProject(projectId).getTasks().forEach((task) => {
            CreateHtml.createTask(task);
        });

        if (!isNaN(projectId) || projectId === 'inbox') {
            Controller.initAddTaskButtons();
        }
    }

    // clearing content 

    static clearProjects() {
        const projects = document.getElementById('projects');
        projects.textContent = '';
    }

    static clearProjectContent() {
        const projectContent = document.getElementById('project-content');
        projectContent.textContent = '';
    }

    static clearTasks() {
        const tasksList = document.getElementById('tasks-list');
        tasksList.textContent = '';
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

}

export default DOMManager;