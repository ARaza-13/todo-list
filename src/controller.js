import DOMManager from "./dom";

export default class Controller {
    static initProjectButtons() {
        const inboxProjectButton = document.getElementById('inbox-project-button');
        const todayProjectButton = document.getElementById('today-project-button');
        const weekProjectButton = document.getElementById('week-project-button');
        const importantProjectButton = document.getElementById('important-project-button');
        const projectButtons = document.querySelectorAll('[data-project-button]');

        inboxProjectButton.addEventListener('click', Controller.openInboxTasks);
        todayProjectButton.addEventListener('click', Controller.openTodayTasks);
        weekProjectButton.addEventListener('click', Controller.openWeekTasks);
        importantProjectButton.addEventListener('click', Controller.openImportantTasks);
        projectButtons.forEach((projectButton) => 
            projectButton.addEventListener('click', Controller.handleProjectButton)
        );
    }

    static openInboxTasks() {
        const projectId = this.getAttribute('data-project');

        Controller.openProject(projectId, this);
    }

    static openTodayTasks() {
        const projectId = this.getAttribute('data-project');

        Controller.openProject(projectId, this);
    }

    static openWeekTasks() {
        const projectId = this.getAttribute('data-project');

        Controller.openProject(projectId, this);
    }

    static openImportantTasks() {
        const projectId = this.getAttribute('data-project');

        Controller.openProject(projectId, this);
    }

    static handleProjectButton(e) {
        const projectId = this.getAttribute('data-project');

        Controller.openProject(projectId, this);
    }

    static openProject(projectId, projectButton) {
        const buttons = document.querySelectorAll('.project');

        buttons.forEach((button) => button.classList.remove('active'));
        projectButton.classList.add('active');

        DOMManager.loadProjectContent(projectId);
    }
}