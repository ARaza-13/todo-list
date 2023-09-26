import Project from "./project";

class TodoList {
    constructor() {
        this.projects = [];
        this.defaultProjects = [];
        this.defaultProjects.push(new Project('Inbox', true));
        this.defaultProjects.push(new Project('Today', true));
        this.defaultProjects.push(new Project('This week', true));
        this.defaultProjects.push(new Project('Low Priority', true));
        this.defaultProjects.push(new Project('Medium Priority', true));
        this.defaultProjects.push(new Project('High Priority', true));
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

    deleteProject(index) {
        this.projects.splice(index, 1);
    }
}

export default TodoList;