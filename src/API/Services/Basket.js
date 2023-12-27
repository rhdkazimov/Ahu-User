import { HttpClient } from "../HttpClient ";

export class BasketService extends HttpClient {

    constructor() {
        super("https://localhost:7094")
    }

    async getAllBasketItems() {
        return await this.get(`api/BasketItems/all`);
    }

    async postBasketItem(body) {
        return await this.post(`api/BasketItems/add`,body);
    }

    async deleteBasketItemById(id) {
        return await this.delete(`api/BasketItems/${id}`);
    }
}