import Project from "./project";
import { parse, format, isEqual, parseISO, addDays } from "date-fns";

class TodoList {
    constructor() {
        this.projects = [];
        this.nextProjectId = 0;

        // create default projects
        this.inbox = new Project('Inbox', true);
        this.today = new Project('Today', true);
        this.thisWeek = new Project('This week', true);
        this.important = new Project('Important', true);

        // add projectId to default projects
        this.inbox.projectId = 'inbox';
        this.today.projectId = 'today';
        this.thisWeek.projectId = 'week';
        this.important.projectId = 'important';

        // add default projects to array
        this.projects.push(this.inbox);
        this.projects.push(this.today);
        this.projects.push(this.thisWeek);
        this.projects.push(this.important);
    }

    // methods for retrieving project data
    setProjects(projects) {
        this.projects = projects;
    }

    getProjects() {
        return this.projects;
    }

    getProject(projectId) {
        return this.projects.find(project => project.projectId === projectId);
    }

    getProjectIndex(projectId) {
        return this.projects.findIndex(project => project.projectId === projectId);
    }

    getNextProjectId() {
        return this.nextProjectId += 1;
    }

    // methods for handling inbox project
    addTaskToInbox(task) {
        this.inbox.addTask(task);
    }

    deleteTaskFromInbox(taskId) {
        this.inbox.deleteTask(taskId);
    }

    deleteProjectTasksFromInbox(projectId) {
        return this.inbox.tasks.filter((task) => task.projectId !== projectId);
    }

    // methods for handling date specific project
    setTasksToday() {
        this.today.tasks = [];
        let today = Date.parse(format(new Date(), 'yyyy-MM-dd'));

        this.inbox.tasks.forEach((task) => {
            let date = Date.parse(task.dueDate);
            if (isEqual(date, today)) {
                this.today.addTask(task);
            }
        });
    }

    setTasksThisWeek() {
        this.thisWeek.tasks = [];
        const currentWeek = this.getCurrentWeek();

        this.inbox.tasks.forEach((task) => {
            // get the wekk number of the task using the logic from getCurrentWeek()
            let taskDate = new Date(task.dueDate.replace(/-/g, '\/'));  // change date format from yyyy-mm-dd to yyyy/mm//dd
            let startDate = new Date(taskDate.getFullYear(), 0, 1); 
            let days = Math.floor(((taskDate - startDate) / (24 * 60 * 60 * 1000)) + 1);  // +1 at the end to account being a day behind
            let taskWeek = Math.ceil(days / 7);
            
            if (taskWeek === currentWeek) {
                this.thisWeek.addTask(task);
            }
        });
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

    // methods for handling user projects
    addProject(newProject) {
        newProject.projectId = this.getNextProjectId();
        this.projects.push(newProject);
    }

    deleteProject(projectId) {
        const projectIndex = this.getProjectIndex(projectId);
        this.projects.splice(projectIndex, 1);
        // this.inbox.tasks = this.deleteProjectTasksFromInbox(projectId);
    }
}

export default TodoList;