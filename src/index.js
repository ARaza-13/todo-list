import Task from "./task";

const gym = new Task("Gym");
console.log(gym.getName());
console.log(gym.getDate());
console.log(gym.getDescription());
console.log(gym.getPriority());
gym.setName("Push Day");
gym.setDate("8/21/2023");
gym.setDescription("Train chest and triceps from 9:45pm to 11:00pm");
gym.setPriority("High");
console.log(gym.getName());
console.log(gym.getDate());
console.log(gym.getDescription());
console.log(gym.getPriority());