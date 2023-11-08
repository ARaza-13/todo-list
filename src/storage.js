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

    addTask(project, task) {
        const todoList = this.getTodoList();
        todoList.getProject(project.projectId).addTask(task);
        this.saveTodoList(todoList);
    }
}

export default Storage;