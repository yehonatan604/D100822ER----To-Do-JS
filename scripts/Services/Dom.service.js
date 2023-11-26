export class DomService {
    taskContent = document.querySelector("#taskContent");
    AddBtn = document.querySelector("#AddBtn");
    taskTable = document.querySelector("#taskTable");

    taskTable = document.getElementsByTagName("tbody")[0];
    rows = document.getElementsByTagName("tr");

    #tasks = [];
    #storage;

    constructor(localStorageService) {
        if (localStorageService) {
            this.#storage = localStorageService;
            this.#tasks = this.#storage.verifyData();
        } else {
            throw new Error('must provide storage!!!');
        }
    }
}