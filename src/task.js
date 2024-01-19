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

    editTask(name, description, dueDate = 'No date') {
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

    getDateFormatted() {
        return Date.parse(this.dueDate);
    }

    // get the week number of the task
    getTaskWeek() {
        // get the task date and starting date of the current year
        let taskDate = new Date(this.dueDate.replace(/-/g, '\/'));  // change date format from yyyy-mm-dd to yyyy/mm//dd
        let startDate = new Date(taskDate.getFullYear(), 0, 1); 

        // calculate the difference between the two dates (in milliseconds)
        // divide the result by total milliseconds in a day to get the difference converted in days
        let days = Math.floor(((taskDate - startDate) / (24 * 60 * 60 * 1000)) + 1); // +1 at the end to account being a day behind

        // divide the number of days by 7 to get the task week number
        let taskWeek = Math.ceil(days / 7);
        return taskWeek;
    }

    setNextTaskId(taskId) {
        this.taskId = taskId;
    }

    setComplete() {
        if (!this.completed) {
            this.completed = true;
        } else {
            this.completed = false;
        }
    }

    setImportant() {
        if (!this.important) {
            this.important = true;
        } else {
            this.important = false;
        }
    }
}

export default Task;