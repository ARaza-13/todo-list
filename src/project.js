class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
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

    getTask(taskName) {
        return this.tasks.find((task) => task.getName() === taskName);
    }

    addTask(newTask) {
        if (this.tasks.find((task) => task.getName() === newTask.name)) return;
        this.tasks.push(newTask);
    }

    deleteTask(taskName) {
        this.tasks = this.tasks.filter((task) => task.name !== taskName);
    }
}

export default Project;