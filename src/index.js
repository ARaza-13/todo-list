import Task from "./task";
import Project from "./project";

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

project.setTasks([task, task2, task3]);
console.log(project.getTasks());
console.log(project.getTask("Push Day"));
console.log(project.getTask("Pull Day"));
console.log(project.getTask("Leg Day"));