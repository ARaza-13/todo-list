import Project from "./project";

class TodoList {
    constructor() {
        this.projects = [];
        this.nextProjectId = 0;
        this.nextTaskId = 0;

        // create default projects
        this.inbox = new Project('Inbox', true);
        this.today = new Project('Today', true);
        this.thisWeek = new Project('This week', true);
        this.important = new Project('Important', true);

        // add projectId to default projects
        this.inbox.projectId = 'inbox';
        this.today.projectId = 'today';
        this.thisWeek.projectId = 'week';
        this.important.projectId = 'important';

        // add default projects to array
        this.projects.push(this.inbox);
        this.projects.push(this.today);
        this.projects.push(this.thisWeek);
        this.projects.push(this.important);
    }

    // methods for retrieving project data
    setProjects(projects) {
        this.projects = projects;
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

    setNextProjectId(project) {
        project.projectId = this.nextProjectId += 1;
    }

    setNextTaskId(task) {
        task.taskId = this.nextTaskId += 1;
    }

    // methods for handling user projects
    addProject(newProject) {
        this.projects.push(newProject);
    }

    deleteProject(projectId) {
        const projectIndex = this.getProjectIndex(projectId);
        this.projects.splice(projectIndex, 1);
    }
}

export default TodoList;