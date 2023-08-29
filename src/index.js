import Task from "./task";
import Project from "./project";
import TodoList from "./todolist";
import DOMManager from "./dom";

const project = new Project();
project.setName("Gym");

const task = new Task("Gym");
task.setName("Push Day");
task.setDate("8/21/2023");
task.setDescription("Train chest and triceps from 9:45pm to 11:15pm");
task.setPriority("High");

const task2 = new Task();
task2.setName("Pull Day");
task2.setDescription("Train back and biceps from 9:45pm to 11:15pm");
task2.setPriority("High");
task2.setDate("8/23/2023");

const task3 = new Task();
task3.setName("Leg Day");
task3.setDescription("Train legs from 9:45pm to 11:00pm");
task3.setPriority("High");
task3.setDate("8/25/2023");

project.addTask(task);
project.addTask(task2);
project.addTask(task3);
console.log(project.getTasks());

const trophyTask = new Task();
trophyTask.setName('The Last of Us Part 2');
trophyTask.setDescription('Complete The Last of Us Part 2 on Grounded diffculty');
trophyTask.setPriority('Medium');

const trophyTask2 = new Task();
trophyTask2.setName('GTA IV');
trophyTask2.setDescription('Get 100% in game completion in GTA IV');
trophyTask2.setPriority('Medium');

const trophyHunting = new Project();
trophyHunting.setName('Trophy Hunting');
trophyHunting.addTask(trophyTask);
trophyHunting.addTask(trophyTask2);

const codeTask = new Task();
codeTask.setName('Todo List');
codeTask.setDescription('Complete todo list');
codeTask.setPriority('High');

const coding = new Project();
coding.setName('Programming');
coding.addTask(codeTask);

const todoList = new TodoList();
console.log(todoList.getProjects());
todoList.addProject(project);
todoList.addProject(trophyHunting);
todoList.addProject(coding);

const domManager = new DOMManager(todoList, Project, Task);

domManager.initialize(todoList);