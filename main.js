/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass DOMManager {\n    constructor(todoList, Project, Task) {\n        this.todoList = todoList;\n        this.Project = Project;\n        this.Task = Task;\n\n        this.defaultProjectsContainer = document.getElementById('default-projects');\n        this.projectsContainer = document.getElementById('projects');\n        this.projectForm = document.getElementById('project-form');\n        this.projectNameInput = document.getElementById('input-add-project-popup');\n        this.addProjectButton = document.getElementById('button-add-project');\n        this.cancelProjectButton = document.getElementById('button-cancel-project-popup');\n\n        this.tasksConatiner = document.getElementById('tasks');\n\n        this.projectForm.addEventListener('submit', this.handleProjectFormSubmit.bind(this));\n        this.addProjectButton.addEventListener('click', this.toggleProjectForm.bind(this));\n        this.cancelProjectButton.addEventListener('click', this.toggleProjectForm.bind(this));\n    }\n\n    initialize(todoList) {\n        todoList.getProjects().forEach((project) => this.renderProject(project));\n    }\n\n    handleProjectFormSubmit(e) {\n        e.preventDefault();\n\n        const projectName = this.projectNameInput.value;\n        if (projectName.trim() === '') {\n            alert('Please enter a valid Project name');\n            return;\n        }\n        const newProject = new this.Project(projectName);\n        this.todoList.addProject(newProject);\n        this.renderProject(newProject);\n        this.toggleProjectForm();\n    }\n\n    renderProject(project) {\n        const projectContainer = document.createElement('button');\n        projectContainer.classList.add('project','nav-button');\n        projectContainer.textContent = project.name;\n\n        projectContainer.addEventListener('click', () => this.renderTasks(project));\n\n        if (project.isDefault) {\n            this.defaultProjectsContainer.appendChild(projectContainer)\n        } else {\n            this.createProjectActions(projectContainer);\n            this.projectsContainer.appendChild(projectContainer);\n        }\n    }\n\n    createProjectActions(projectContainer) {\n        const projectActions = document.createElement('div');\n        projectActions.classList.add('project-actions');\n\n        const projectAction = document.createElement('span');\n        projectAction.classList.add('project-action');\n\n        const projectDropdown = document.createElement('div');\n        projectDropdown.classList.add('project-dropdown', 'hidden');\n\n        const editButton = document.createElement('button');\n        editButton.classList.add('edit-project');\n        editButton.textContent = 'Edit';\n\n        const deleteButton = document.createElement('button')\n        deleteButton.classList.add('delete-project');\n        deleteButton.textContent = 'Delete';\n\n        projectDropdown.appendChild(editButton);\n        projectDropdown.appendChild(deleteButton);\n        projectActions.appendChild(projectAction);\n        projectActions.appendChild(projectDropdown);\n\n        projectContainer.appendChild(projectActions);\n    }\n\n    renderTasks(project) {\n        this.clearTasks();\n\n        const projectTitle = document.createElement('div');\n        projectTitle.classList.add('title');\n        projectTitle.textContent = `${project.name}`; \n\n        this.tasksConatiner.appendChild(projectTitle);\n\n        project.getTasks().forEach((task) => {\n            this.renderTaskDetails(task);\n        });\n    }\n\n    renderTaskDetails(task) {\n        const taskContainer = document.createElement('div');\n        taskContainer.classList.add('task');\n\n        const checkBubble = document.createElement('div');\n        checkBubble.classList.add('unchecked');\n\n        const taskDetails = document.createElement('div');\n        taskDetails.classList.add('task-details');\n\n        const titleElement = document.createElement('p');\n        titleElement.classList.add('task-title');\n        titleElement.textContent = task.getName();\n\n        const descriptionElement = document.createElement('p');\n        descriptionElement.classList.add('task-description');\n        descriptionElement.textContent = task.getDescription();\n\n        taskDetails.appendChild(titleElement);\n        taskDetails.appendChild(descriptionElement);\n\n        const dueDateElement = document.createElement('p');\n        dueDateElement.textContent = `${task.getDate()}`;\n\n        const priorityColor = this.getPriorityColor(task.getPriority());\n        taskContainer.style.borderRight = `8px solid ${priorityColor}`;\n\n        taskContainer.appendChild(checkBubble);\n        taskContainer.appendChild(taskDetails);\n        taskContainer.appendChild(dueDateElement);\n\n        this.tasksConatiner.appendChild(taskContainer);\n    }\n\n    getPriorityColor(priority) {\n        if (priority === 'High') {\n            return 'red';\n        } else if (priority === 'Medium') {\n            return 'yellow';\n        } else {\n            return 'green';\n        }\n    }\n\n    toggleProjectForm() {\n        this.projectForm.classList.toggle('hidden');\n        this.addProjectButton.classList.toggle('hidden');\n        this.projectNameInput.value = '';\n    }\n\n    clearTasks() {\n        this.tasksConatiner.innerHTML = '';\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOMManager);\n\n//# sourceURL=webpack://todo-list/./src/dom.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n/* harmony import */ var _todolist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todolist */ \"./src/todolist.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n\n\n\n\n\nconst project = new _project__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nproject.setName(\"Gym\");\n\nconst task = new _task__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"Gym\");\ntask.setName(\"Push Day\");\ntask.setDate(\"8/21/2023\");\ntask.setDescription(\"Train chest and triceps from 9:45pm to 11:15pm\");\ntask.setPriority(\"High\");\n\nconst task2 = new _task__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\ntask2.setName(\"Pull Day\");\ntask2.setDescription(\"Train back and biceps from 9:45pm to 11:15pm\");\ntask2.setPriority(\"High\");\ntask2.setDate(\"8/23/2023\");\n\nconst task3 = new _task__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\ntask3.setName(\"Leg Day\");\ntask3.setDescription(\"Train legs from 9:45pm to 11:00pm\");\ntask3.setPriority(\"High\");\ntask3.setDate(\"8/25/2023\");\n\nproject.addTask(task);\nproject.addTask(task2);\nproject.addTask(task3);\nconsole.log(project.getTasks());\n\nconst trophyTask = new _task__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\ntrophyTask.setName('The Last of Us Part 2');\ntrophyTask.setDescription('Complete The Last of Us Part 2 on Grounded diffculty');\ntrophyTask.setPriority('Medium');\n\nconst trophyTask2 = new _task__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\ntrophyTask2.setName('GTA IV');\ntrophyTask2.setDescription('Get 100% in game completion in GTA IV');\ntrophyTask2.setPriority('Medium');\n\nconst trophyHunting = new _project__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\ntrophyHunting.setName('Trophy Hunting');\ntrophyHunting.addTask(trophyTask);\ntrophyHunting.addTask(trophyTask2);\n\nconst codeTask = new _task__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\ncodeTask.setName('Todo List');\ncodeTask.setDescription('Complete todo list');\ncodeTask.setPriority('High');\n\nconst coding = new _project__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\ncoding.setName('Programming');\ncoding.addTask(codeTask);\n\nconst todoList = new _todolist__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\nconsole.log(todoList.getProjects());\ntodoList.addProject(project);\ntodoList.addProject(trophyHunting);\ntodoList.addProject(coding);\n\nconst domManager = new _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"](todoList, _project__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _task__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\ndomManager.initialize(todoList);\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Project {\n    constructor(name, isDefault = false) {\n        this.name = name;\n        this.tasks = [];\n        this.isDefault = isDefault;\n    }\n\n    setName(name) {\n        this.name = name;\n    }\n\n    getName() {\n        return this.name;\n    }\n\n    getTasks() {\n        return this.tasks;\n    }\n\n    getTask(taskName) {\n        return this.tasks.find((task) => task.getName() === taskName);\n    }\n\n    addTask(newTask) {\n        if (this.tasks.find((task) => task.getName() === newTask.name)) return;\n        this.tasks.push(newTask);\n    }\n\n    deleteTask(taskName) {\n        this.tasks = this.tasks.filter((task) => task.name !== taskName);\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);\n\n//# sourceURL=webpack://todo-list/./src/project.js?");

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Task {\n    constructor(name, description, priority, dueDate = 'No date') {\n        this.name = name;\n        this.description = description;\n        this.priority = priority;\n        this.dueDate = dueDate;\n        this.completed = false;\n    }\n\n    setName(name) {\n        this.name = name;\n    }\n\n    getName() {\n        return this.name;\n    }\n\n    setDescription(description) {\n        this.description = description;\n    }\n\n    getDescription() {\n        return this.description;\n    }\n\n    setPriority(priority) {\n        this.priority = priority;\n    }\n\n    getPriority() {\n        return this.priority;\n    }\n\n    setDate(dueDate) {\n        this.dueDate = dueDate;\n    }\n\n    getDate() {\n        return this.dueDate;\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Task);\n\n//# sourceURL=webpack://todo-list/./src/task.js?");

/***/ }),

/***/ "./src/todolist.js":
/*!*************************!*\
  !*** ./src/todolist.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n\n\nclass TodoList {\n    constructor() {\n        this.projects = [];\n        this.projects.push(new _project__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('Inbox', true));\n        this.projects.push(new _project__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('Today', true));\n        this.projects.push(new _project__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('This week', true));\n        this.projects.push(new _project__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('This month', true));\n        this.projects.push(new _project__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('This year', true));\n    }\n\n    getProjects() {\n        return this.projects;\n    }\n\n    getProject(projectName) {\n        return this.projects.find((project) => project.getName() === projectName);\n    }\n\n    addProject(newProject) {\n        if (this.projects.find((project) => project.name === newProject.name)) return;\n        this.projects.push(newProject);\n    }\n\n    deleteProject(projectName) {\n        this.projects = this.projects.filter((project) => project.name != projectName);\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TodoList);\n\n//# sourceURL=webpack://todo-list/./src/todolist.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;