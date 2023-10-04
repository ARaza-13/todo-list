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

    getTask(taskId) {
        return this.tasks.find(task => task.taskId === taskId);
    }

    getTaskIndex(taskId) {
        return this.tasks.findIndex(task => task.taskId === taskId);
    }

    addTask(newTask) {
        this.tasks.push(newTask);
    }

    deleteTask(taskId) {
        const taskIndex = this.getTaskIndex(taskId);
        this.tasks.splice(taskIndex, 1);
    }
}

export default Project;