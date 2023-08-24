import Task from "./task";
import Project from "./project";
import TodoList from "./todolist";
import UI from "./user-interface";

const task = new Task("Gym");
task.setName("Push Day");
task.setDate("8/21/2023");
task.setDescription("Train chest and triceps from 9:45pm to 11:15pm");
task.setPriority("High");
console.log(task.getName());
console.log(task.getDate());
console.log(task.getDescription());
console.log(task.getPriority());

const project = new Project();
project.setName("Gym");
project.addTask(task);
console.log(project.getName());
console.log(project.getTasks());
console.log(project.getTask("Push Day"));

project.deleteTask("Push Day");
console.log(project.getTasks());
console.log(project.getTask("Push Day"));

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
console.log(project.getTask("Push Day"));
console.log(project.getTask("Pull Day"));
console.log(project.getTask("Leg Day"));

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
console.log(todoList.getProjects());
console.log(todoList.getProject(project.getName()));
console.log(todoList.getProject(trophyHunting.getName()));
console.log(todoList.getProject(coding.getName()));

UI.loadHomePage(todoList);