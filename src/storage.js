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

    loadData() {
        const data = localStorage.getItem(this.localStorageKey);
        return data ? JSON.parse(data) : null;  // returns data as object or null if data is not found
    }
}