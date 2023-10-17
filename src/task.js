class Task {
    constructor(name, description, dueDate = 'No date', projectId, taskId) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.projectId = projectId;
        this.taskId = taskId;
        this.important = false;
        this.completed = false;
    }

    updateTask(name, description, dueDate = 'No date') {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setDescription(description) {
        this.description = description;
    }

    getDescription() {
        return this.description;
    }

    setDate(dueDate) {
        this.dueDate = dueDate;
    }

    getDate() {
        return this.dueDate;
    }
}

export default Task;