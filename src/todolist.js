import Project from "./project";

class TodoList {
    constructor() {
        this.projects = [];
        this.projects.push(new Project('Inbox'));
        this.projects.push(new Project('Today'));
        this.projects.push(new Project('This week'));
        this.projects.push(new Project('This month'));
        this.projects.push(new Project('This year'));
    }

    getProjects() {
        return this.projects;
    }

    getProject(projectName) {
        return this.projects.find((project) => project.getName() === projectName);
    }

    addProject(newProject) {
        if (this.projects.find((project) => project.name === newProject.name)) return;
        this.projects.push(newProject);
    }

    deleteProject(projectName) {
        this.projects = this.projects.filter((project) => project.name != projectName);
    }
}

export default TodoList;