import Task from "./task";
import Project from "./project";
import TodoList from "./todolist";
import DOMManager from "./dom";

const todoList = new TodoList();

const gym = new Project();
gym.setName("Gym");
todoList.addProject(gym);

const push = new Task("Gym");
push.setName("Push Day");
push.setDate("2023-10-16");
push.setDescription("Train chest and triceps from 9:45pm to 11:15pm");

const pull = new Task();
pull.setName("Pull Day");
pull.setDescription("Train back and biceps from 9:45pm to 11:15pm");
pull.setDate("2023-10-18");

const legs = new Task();
legs.setName("Leg Day");
legs.setDescription("Train legs from 9:45pm to 11:00pm");
legs.setDate("2023-10-19");

todoList.addTaskToProject(gym, push);
todoList.addTaskToProject(gym, pull);
todoList.addTaskToProject(gym, legs);

const trophyHunting = new Project();
trophyHunting.setName('Trophy Hunting');
todoList.addProject(trophyHunting);

const trophyTask = new Task();
trophyTask.setName('The Last of Us Part 2');
trophyTask.setDescription('Complete The Last of Us Part 2 on Grounded diffculty');

const trophyTask2 = new Task();
trophyTask2.setName('GTA IV');
trophyTask2.setDescription('Get 100% in game completion in GTA IV');

todoList.addTaskToProject(trophyHunting, trophyTask);
todoList.addTaskToProject(trophyHunting, trophyTask2);

const coding = new Project();
coding.setName('Programming');
todoList.addProject(coding);

const codeTask = new Task();
codeTask.setName('Todo List');
codeTask.setDescription('Complete todo list');

todoList.addTaskToProject(coding, codeTask);

console.log(todoList.getProjects());

const domManager = new DOMManager(todoList, Project, Task);

domManager.initialize(todoList);