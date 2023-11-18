import Task from "./task";
import Project from "./project";
import TodoList from "./todolist";

class Storage {
    constructor() {
        this.localStorageKey = 'todoList';
    }

    saveTodoList(data) {
        localStorage.setItem(this.localStorageKey, JSON.stringify(data));
    }

    getTodoList() {
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

    addProject(project) {
        const todoList = this.getTodoList();
        todoList.addProject(project);
        this.saveTodoList(todoList);
    }

    deleteProject(projectId) {
        const todoList = this.getTodoList();
        todoList.deleteProject(projectId);
        this.saveTodoList(todoList);
    }

    editProject(projectId, newName) {
        const todoList = this.getTodoList();
        todoList.getProject(projectId).setName(newName);
        this.saveTodoList(todoList);
    }

    addTask(projectId, task) {
        const todoList = this.getTodoList();
        todoList.getProject(projectId).addTask(task);
        this.saveTodoList(todoList);
    }

    deleteTask(projectId, taskId) {
        const todoList = this.getTodoList();
        todoList.getProject(projectId).deleteTask(taskId);
        this.saveTodoList(todoList);
    }

    editTask(task, editedName, editedDescription, editedDueDate) {
        const todoList = this.getTodoList();
        todoList.getProject(task.projectId).getTask(task.taskId).editTask(editedName, editedDescription, editedDueDate);
        this.saveTodoList(todoList);
    }

    toggleTaskCompleted(task) {
        const todoList = this.getTodoList();
        todoList.getProject(task.projectId).getTask(task.taskId).setComplete();
        this.saveTodoList(todoList);
    }

    toggleTaskImportant(task) {
        const todoList = this.getTodoList();
        todoList.getProject(task.projectId).getTask(task.taskId).setImportant();
        this.saveTodoList(todoList);
    }

    displayImportant() {
        const todoList = this.getTodoList();
        todoList.getProject('important').setTasks([]);
        todoList.getProjects().forEach(
            (project) => project.getTasks().forEach(
                (task) => {
                    if (task.important) todoList.getProject('important').addTask(task);
                }
            )
        );
        this.saveTodoList(todoList);
    }
}

export default Storage;