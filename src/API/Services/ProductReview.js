import { HttpClient } from "../HttpClient ";

export class ProductReviewService extends HttpClient {

    constructor() {
        super("https://localhost:7094")
    }

    async getAllProductReviews() {
        return await this.get(`api/ProductReview`);
    }

    async getProductReviewById(id) {
        return await this.get(`api/ProductReview/${id}`);
    }

    async deleteProductReviewById(id) {
        return await this.delete(`api/ProductReview/${id}`);
    }
}