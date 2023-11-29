import { Task } from "../Models/Task.js";

export class LocalStorageService {
    #initialData = [
        new Task('Program'),
        new Task('Eat'),
        new Task('Program some more')
    ];

    constructor() {
        this.getData();
    }

    getData = () => {
        const tasks = localStorage.getItem('tasks');

        if (!tasks || tasks === '[]') {
            localStorage.setItem('tasks', JSON.stringify(this.#initialData));
        }
        return JSON.parse(tasks);
    }

    updateData = (data) => {
        localStorage.setItem('tasks', JSON.stringify(data));
    }

}