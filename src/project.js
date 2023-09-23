class Project {
    constructor(name, isDefault = false) {
        this.name = name;
        this.tasks = [];
        this.isDefault = isDefault;
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

    deleteTask(taskName) {
        this.tasks = this.tasks.filter((task) => task.name !== taskName);
    }
}

export default Project;