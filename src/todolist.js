import Project from "./project";

class TodoList {
    constructor() {
        this.projects = [];
        this.defaultProjects = [];
        this.nextProjectId = 0;
        this.nextTaskId = 0;

        // create default projects
        this.inbox = new Project('Inbox', true);
        this.inbox.projectId = 'inbox';
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
    }

    addTaskToInbox(task) {
        this.inbox.addTask(task);
    }

    deleteTaskFromInbox(task) {
        this.inbox.deleteTask(task);
    }

    deleteProjectTasksFromInbox(projectId) {
        this.inbox.tasks.forEach((task) => {
            if (task.projectId === projectId) this.inbox.deleteTask(task.taskId);
        })
    }

    getProjects() {
        return this.projects;
    }

    getProject(projectId) {
        return (this.projects.find(project => project.projectId === projectId) 
        || this.defaultProjects.find(project => project.projectId === projectId));
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
        this.deleteProjectTasksFromInbox(projectId);
    }

    addTaskToProject(project, task) {
        if (project) {
            task.projectId = project.projectId;
            task.taskId = this.getNextTaskId();

            project.addTask(task);
        }

        // if the project is not the "Inbox", add the task to the Inbox project
        if (project.projectId !== 'inbox') {
            this.addTaskToInbox(task);
        }
    }

    deleteTaskFromProject(project, taskId) {
        console.log(project);
        console.log(project.projectId);
        if (project) {
            project.deleteTask(taskId);
        }

        // if the project is not the "Inbox", delete the task to the Inbox project
        if (project.projectId !== 'inbox') {
            this.deleteTaskFromInbox(taskId);
        }
    };
}

export default TodoList;