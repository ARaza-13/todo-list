import { format, isEqual } from "date-fns";

class Project {
    constructor(name, isDefault = false, projectId) {
        this.name = name;
        this.isDefault = isDefault;
        this.projectId = projectId;
        this.tasks = [];
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

    getTasksToday() {
        return this.tasks.filter((task) => {
            let today = Date.parse(format(new Date(), 'yyyy-MM-dd'));
            const taskDate = task.getDateFormatted();
            if (isEqual(taskDate, today)) return taskDate;
        });
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