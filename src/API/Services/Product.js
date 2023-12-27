import { HttpClient } from "../HttpClient ";

export class ProductService extends HttpClient {

    constructor() {
        super("https://localhost:7094")
    }

    async getAllProducts() {
        return await this.get(`api/Product`);
    }

    async getProductById(id) {
        return await this.get(`api/Product/${id}`);
    }
}