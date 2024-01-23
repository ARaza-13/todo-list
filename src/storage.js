import Task from "./task";
import Project from "./project";
import TodoList from "./todolist";

export default class Storage {
    constructor() {
        this.localStorageKey = 'todoList';
    }

    static saveTodoList(data) {
        localStorage.setItem(this.localStorageKey, JSON.stringify(data));
    }

    static getTodoList() {
        const todoList = Object.assign(
            new TodoList(), 
            JSON.parse(localStorage.getItem(this.localStorageKey))
        );

        todoList.setProjects(
            todoList.getProjects().map(
                (project) => Object.assign(new Project(), project)
            )
        );

        todoList.getProjects().forEach(
            (project) => project.setTasks(
                project.getTasks().map(
                    (task) => Object.assign(new Task(), task)
                )
            )
        );

        return todoList;
    }

    static addProject(project) {
        const todoList = this.getTodoList();

        todoList.setNextProjectId(project);
        todoList.addProject(project);

        this.saveTodoList(todoList);
    }

    static deleteProject(projectId) {
        const todoList = this.getTodoList();
        todoList.deleteProject(projectId);
        this.saveTodoList(todoList);
    }

    static editProject(projectId, newName) {
        const todoList = this.getTodoList();
        todoList.getProject(projectId).setName(newName);
        this.saveTodoList(todoList);
    }

    static addTask(projectId, task) {
        const todoList = this.getTodoList();

        todoList.getProject(projectId).addTask(task);
        todoList.setNextTaskId(task);

        this.saveTodoList(todoList);
    }

    static deleteTask(projectId, taskId) {
        const todoList = this.getTodoList();
        todoList.getProject(projectId).deleteTask(taskId);
        this.saveTodoList(todoList);
    }

    static editTask(task, editedName, editedDescription, editedDueDate) {
        const todoList = this.getTodoList();
        todoList.getProject(task.projectId).getTask(task.taskId).editTask(editedName, editedDescription, editedDueDate);
        this.saveTodoList(todoList);
    }

    static toggleTaskComplete(task) {
        const todoList = this.getTodoList();
        todoList.getProject(task.projectId).getTask(task.taskId).setComplete();
        this.saveTodoList(todoList);
    }

    static toggleTaskImportant(task) {
        const todoList = this.getTodoList();
        todoList.getProject(task.projectId).getTask(task.taskId).setImportant();
        this.saveTodoList(todoList);
    }

    static initTasksToInbox() {
        const todoList = this.getTodoList();
        const inboxTasks = todoList.getProject('inbox').getTasksInbox();
        todoList.getProject('inbox').setTasks([]);

        todoList.getProjects().forEach((project) => {
            if (!project.isDefault) {
                const tasks = project.getTasks();
                todoList.getProject('inbox').addTasksToInbox(tasks);
            }
        });
        todoList.getProject('inbox').addTasksToInbox(inboxTasks);
        this.saveTodoList(todoList);
    }

    static initTasksToday() {
        const todoList = this.getTodoList();
        todoList.getProject('today').setTasks([]);

        todoList.getProjects().forEach((project) => {
            if (!project.isDefault) {
                project.getTasksToday().forEach((task) => {
                    todoList.getProject('today').addTask(task);
                });
            }
        });

        this.saveTodoList(todoList);
    }

    static initTasksThisWeek() {
        const todoList = this.getTodoList();
        todoList.getProject('week').setTasks([])

        todoList.getProjects().forEach((project) => {
            if (!project.isDefault) {
                project.getTasksThisWeek().forEach((task) => {
                    todoList.getProject('week').addTask(task);
                });
            }
        });

        this.saveTodoList(todoList);
    }

    static initTasksImportant() {
        const todoList = this.getTodoList();
        todoList.getProject('important').setTasks([]);

        todoList.getProjects().forEach((project) => {
            if (!project.isDefault) {
                project.getTasksImportant().forEach((task) => {
                    todoList.getProject('important').addTask(task);
                });
            }
        });

        this.saveTodoList(todoList);
    }
}