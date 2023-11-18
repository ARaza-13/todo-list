class Project {
    constructor(name, isDefault = false, projectId) {
        this.name = name;
        this.isDefault = isDefault;
        this.projectId = projectId;
        this.tasks = [];
        this.nextTaskId = 0;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setTasks(tasks) {
        this.tasks = tasks;
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

    getNextTaskId() {
        return this.nextTaskId += 1;
    }

    addTask(newTask) {
        if (!newTask.taskId) {
            newTask.taskId = this.getNextTaskId();
        }
        this.tasks.push(newTask);
    }

    deleteTask(taskId) {
        const taskIndex = this.getTaskIndex(taskId);
        this.tasks.splice(taskIndex, 1);
    }
}

export default Project;