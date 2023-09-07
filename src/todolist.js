import Project from "./project";

class TodoList {
    constructor() {
        this.projects = [];
        this.defaultProjects = [];
        this.defaultProjects.push(new Project('Inbox', true));
        this.defaultProjects.push(new Project('Today', true));
        this.defaultProjects.push(new Project('This week', true));
        this.defaultProjects.push(new Project('This month', true));
        this.defaultProjects.push(new Project('This year', true));
    }

    getProjects() {
        return this.projects;
    }

    getProject(projectName) {
        return this.projects.find((project) => project.getName() === projectName);
    }

    addProject(newProject) {
        this.projects.push(newProject);
    }

    editProject(index, newName) {
        if (index >= 0 && index < this.projects.length) {
            this.projects[index].name = newName;
        }
    }

    deleteProject(projectName) {
        this.projects = this.projects.filter((project) => project.name != projectName);
    }
}

export default TodoList;