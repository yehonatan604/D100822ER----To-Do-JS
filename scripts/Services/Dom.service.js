import { Task } from "../Models/Task.js";

export class DomService {
    taskContent = document.querySelector("#taskContent");
    addBtn = document.querySelector("#AddBtn");
    taskTable = document.querySelector("#taskTable");

    taskTable = document.getElementsByTagName("tbody")[0];
    rows = document.getElementsByTagName("tr");

    #tasks = [];
    #storage;

    constructor(localStorageService) {
        if (localStorageService) {
            this.#storage = localStorageService;
            this.#tasks = this.#storage.getData();

            this.addBtn.addEventListener('click', () => {
                const task = new Task(this.taskContent.value);
                this.#tasks.push(task);
                this.fillTable();
            });
        } else {
            throw new Error('must provide storage!!!');
        }
    }

    addButtons = (row) => {
        let cell = row.insertCell();

        let iconsDiv = document.createElement("div");
        let trash = document.createElement("i");
        let pencil = document.createElement("i");

        trash.className = 'fa fa-trash pr-4';
        pencil.className = 'fa fa-pencil pl-4';

        trash.addEventListener('click', (event) => {
            console.log(event);

            const filteredTasks = this.#tasks.filter((item) => {
                return item.id !== +row.cells[0].textContent;
            });
            console.log(filteredTasks);
            this.removeRow(row, filteredTasks);
        });

        iconsDiv.appendChild(trash);
        iconsDiv.appendChild(pencil);

        cell.appendChild(iconsDiv);
    }

    fillTable = () => {
        this.resetTable();
        for (let item of this.#tasks) {
            let row = this.taskTable.insertRow();
            for (let key in item) {
                let cell = row.insertCell();
                cell.textContent = item[key];
            }
            this.addButtons(row);
        }
    }

    removeRow = (row, filteredTasks = this.#tasks) => {
        row.parentNode.removeChild(row);
        this.#tasks = filteredTasks;
        this.#storage.updateData(filteredTasks);
    }

    resetTable = () => {
        for (let i = this.rows.length - 1; i >= 1; i--) {
            const row = this.rows[i];
            this.removeRow(row)
        }
    }
}
