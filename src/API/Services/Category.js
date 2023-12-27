import { HttpClient } from "../HttpClient ";

export class CategoryService extends HttpClient {

    constructor() {
        super("https://localhost:7094")
    }

    async getAllCategorys() {
        return await this.get(`api/Category`);
    }

    async getCategoryById(id) {
        return await this.get(`api/Category/${id}`);
    }
}