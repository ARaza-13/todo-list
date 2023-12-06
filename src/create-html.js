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
}