export default class Controller {
    initProjectButtons() {
        const inboxProjectButton = document.getElementById('inbox-project-button');
        const todayProjectButton = document.getElementById('today-project-button');
        const weekProjectButton = document.getElementById('week-project-button');
        const importantProjectButton = document.getElementById('important-project-button');
        const projectButtons = document.querySelectorAll('[data-project-button]');

        inboxProjectButton.addEventListener('click', this.openInboxTasks);
        todayProjectButton.addEventListener('click', this.openTodayTasks);
        weekProjectButton.addEventListener('click', this.openWeekTasks);
        importantProjectButton.addEventListener('click', this.openImportantTasks);
        projectButtons.forEach((projectButton) => 
            projectButton.addEventListener('click', this.handleProjectButton)
        );
    }

    openInboxTasks() {
        console.log('Inbox Opened');
    }

    openTodayTasks() {
        console.log('Today Opened');
    }

    openWeekTasks() {
        console.log('This Week Opened');
    }

    openImportantTasks() {
        console.log('Important Opened');
    }

    handleProjectButton(e) {
        console.log(this.textContent);
    }
}