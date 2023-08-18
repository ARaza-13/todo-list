import Task from "./task";

const gym = new Task("Gym", "8/17/2023");
console.log(gym.getName());
console.log(gym.getDate());
gym.setName("Push Day");
gym.setDate("8/21/2023");
console.log(gym.getName());
console.log(gym.getDate());