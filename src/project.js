class Project {
    constructor(name, isDefault = false, projectId) {
        this.name = name;
        this.tasks = [];
        this.isDefault = isDefault;
        this.projectId = projectId;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    getTasks() {
        return this.tasks;
    }

    getTask(index) {
        return this.tasks[index];
    }

    addTask(newTask) {
        this.tasks.push(newTask);
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
    }
}

export default Project;