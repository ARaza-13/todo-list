import Project from "./project";

class TodoList {
    constructor() {
        this.projects = [];
        this.defaultProjects = [];

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
        this.initializeInbox();
    }
}

export default TodoList;