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

    getTasksInbox() {
        return this.tasks.filter((task) => {
            if (task.projectId === 'inbox') return task;
        })
    }

    getTasksToday() {
        return this.tasks.filter((task) => {
            let today = Date.parse(format(new Date(), 'yyyy-MM-dd'));
            const taskDate = task.getDateFormatted();
            if (isEqual(taskDate, today)) return taskDate;
        });
    }

    getTasksThisWeek() {
        const currentWeek = this.getCurrentWeek();
        return this.tasks.filter((task) => {
            const taskWeek = task.getTaskWeek();
            if (taskWeek === currentWeek) return taskWeek;
        });
    }

    getTasksImportant() {
        return this.tasks.filter((task) => {
            if (task.important) return task;
        });
    }

    addTasksToInbox(tasks) {
        Array.prototype.push.apply(this.tasks, tasks);
    }

    addTask(newTask) {
        this.tasks.unshift(newTask);
    }

    deleteTask(taskId) {
        const taskIndex = this.getTaskIndex(taskId);
        this.tasks.splice(taskIndex, 1);
    }

    getCurrentWeek() {
        // get the current date and starting date of the current year
        let currentDate = new Date();
        let startDate = new Date(currentDate.getFullYear(), 0, 1); 
        
        // calculate the difference between the two dates (in milliseconds)
        // divide the result by total milliseconds in a day to get the difference converted in days
        let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
        
        // divide the number of days by 7 to get the current week number
        let currentWeek = Math.ceil(days / 7);
        return currentWeek;
    }
}

export default Project;