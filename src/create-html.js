import Storage from "./storage";

class CreateHtml {
    constructor() {
        this.main = document.querySelector('main');
    }

    createNav() {
        const nav = document.createElement('div');
        nav.classList.add('nav');
        nav.setAttribute('id', 'nav');

        return nav;
    }

    createDefaultProjects() {
        const defaultProjects = document.createElement('div');
        defaultProjects.classList.add('default-projects');
        defaultProjects.setAttribute('id', 'default-projects');

        return defaultProjects;
    }
}