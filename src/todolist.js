import Project from "./project";

class TodoList {
    constructor() {
        this.projects = [];
        this.projects.push(new Project('Inbox', true));
        this.projects.push(new Project('Today', true));
        this.projects.push(new Project('This week', true));
        this.projects.push(new Project('This month', true));
        this.projects.push(new Project('This year', true));
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