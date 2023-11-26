export class Task {
    id;
    content;
    created;
    static #count = 0;

    constructor(content) {
        if (content) {
            this.content = content;
            this.created = new Date();

            Task.#count++;
            this.id = Task.#count;
        } else {
            throw new Error('must provide content');
        }
    }
}