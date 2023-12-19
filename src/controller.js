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
        Controller.openProject('inbox', this);
    }

    static openTodayTasks() {
        Controller.openProject('today', this);
    }

    static openWeekTasks() {
        Controller.openProject('week', this);
    }

    static openImportantTasks() {
        Controller.openProject('important', this);
    }

    static handleProjectButton(e) {
        const projectName = this.textContent;

        Controller.openProject(projectName, this);
    }

    static openProject(projectName, projectButton) {
        const buttons = document.querySelectorAll('.project');

        buttons.forEach((button) => button.classList.remove('active'));
        projectButton.classList.add('active');

        console.log(projectName);
    }
}