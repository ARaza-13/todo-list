import Task from "./task";
import Project from "./project";
import TodoList from "./todolist";

class Storage {
    constructor() {
        this.localStorageKey = 'todoList';
    }

    saveData(data) {
        localStorage.setItem(this.localStorageKey, JSON.stringify(data));
    }
}