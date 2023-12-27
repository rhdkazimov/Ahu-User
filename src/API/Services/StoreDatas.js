import { HttpClient } from "../HttpClient ";

export class StoreDatasService extends HttpClient {

    constructor() {
        super("https://localhost:7094")
    }

    async getAllStoreDatas() {
        return await this.get(`api/StoreDatas`);
    }

    async getStoreDataById(id) {
        return await this.get(`api/StoreDatas/${id}`);
    }

    async updateStoreDataById(id, body) {
        return await this.put(`api/StoreDatas/${id}`, body);
    }
}