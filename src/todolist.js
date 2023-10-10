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

        // add projectId to default projects
        this.inbox.projectId = 'inbox';
        this.today.projectId = 'today';
        this.thisWeek.projectId = 'week';
        this.lowPriority.projectId = 'low';
        this.mediumPriority.projectId = 'medium';
        this.highPriority.projectId = 'high';

        // add default projects to array
        this.defaultProjects.push(this.inbox);
        this.defaultProjects.push(this.today);
        this.defaultProjects.push(this.thisWeek);
        this.defaultProjects.push(this.lowPriority);
        this.defaultProjects.push(this.mediumPriority);
        this.defaultProjects.push(this.highPriority);
    }

    addTaskToInbox(task) {
        this.inbox.addTask(task);
    }

    deleteTaskFromInbox(taskId) {
        this.inbox.deleteTask(taskId);
    }

    deleteProjectTasksFromInbox(projectId) {
        return this.inbox.tasks.filter((task) => task.projectId !== projectId);
    }

    addTaskBasedOnPriority(task) {
        const project = this.getProject(task.priority.toLowerCase());
        project.addTask(task);
    }

    deleteTaskBasedOnPriority(task) {
        const project = this.getProject(task.priority.toLowerCase());
        project.deleteTask(task.taskId);
    }

    updatePriorityProject(task, previousPriority) {
        if (task.priority === previousPriority) {
            return;
        }

        const project = this.getProject(previousPriority.toLowerCase());
        project.deleteTask(task.taskId);
        this.addTaskBasedOnPriority(task);
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
        this.inbox.tasks = this.deleteProjectTasksFromInbox(projectId);
    }

    addTaskToProject(project, task) {
        if (project) {
            task.projectId = project.projectId;
            task.taskId = this.getNextTaskId();

            project.addTask(task);
            this.addTaskBasedOnPriority(task);  // add task to correct priority project
        }

        // if the project is not the "Inbox", add the task to the Inbox project
        if (project.projectId !== 'inbox') {
            this.addTaskToInbox(task);
        }
    }

    deleteTaskFromProject(project, taskId) {
        if (project) {
            const task = project.getTask(taskId);
            project.deleteTask(taskId);
            this.deleteTaskBasedOnPriority(task);
        }

        // if the project is not the "Inbox", delete the task to the Inbox project
        if (project.projectId !== 'inbox') {
            this.deleteTaskFromInbox(taskId);
        }
    };
}

export default TodoList;