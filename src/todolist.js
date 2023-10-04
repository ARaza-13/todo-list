import Project from "./project";

class TodoList {
    constructor() {
        this.projects = [];
        this.defaultProjects = [];
        this.nextProjectId = 0;
        this.nextTaskId = 0;

        // create default projects
        this.inbox = new Project('Inbox', true);
        this.today = new Project('Today', true);
        this.thisWeek = new Project('This week', true);
        this.lowPriority = new Project('Low Priority', true);
        this.mediumPriority = new Project('Medium Priority', true);
        this.highPriority = new Project('High Priority', true);

        // add default projects to array
        this.defaultProjects.push(this.inbox);
        this.defaultProjects.push(this.today);
        this.defaultProjects.push(this.thisWeek);
        this.defaultProjects.push(this.lowPriority);
        this.defaultProjects.push(this.mediumPriority);
        this.defaultProjects.push(this.highPriority);
    }

    initializeInbox() {
        this.inbox.tasks = [];

        this.projects.forEach((project) => {
            const allTasks = project.getTasks();
            allTasks.forEach((task) => this.inbox.addTask(task));
        });

        console.log(this.inbox.getTasks());
    }

    getProjects() {
        return this.projects;
    }

    getProject(projectId) {
        return this.projects.find(project => project.projectId === projectId);
    }

    getProjectIndex(projectId) {
        return this.projects.findIndex(project => project.projectId === projectId);
    }

    getNextProjectId() {
        return this.nextProjectId += 1;
    }

    getNextTaskId() {
        return this.nextTaskId += 1;
    }

    addProject(newProject) {
        newProject.projectId = this.getNextProjectId();
        this.projects.push(newProject);
    }

    editProject(projectId, newName) {
        const projectIndex = this.getProjectIndex(projectId);
        if (projectIndex >= 0 && projectIndex < this.projects.length) {
            this.projects[projectIndex].name = newName;
        }
    }

    deleteProject(projectId) {
        const projectIndex = this.getProjectIndex(projectId);
        this.projects.splice(projectIndex, 1);
        this.initializeInbox();
    }

    addTaskToProject(project, task) {
        if (project) {
            task.projectId = project.projectId;
            task.taskId = this.getNextTaskId();

            project.addTask(task);
        }
        this.initializeInbox();
    }

    deleteTaskFromProject(project, taskId) {
        if (project) project.deleteTask(taskId);
        this.initializeInbox();
    };
}

export default TodoList;