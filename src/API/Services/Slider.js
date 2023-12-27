import { HttpClient } from "../HttpClient ";

export class SliderService extends HttpClient {

    constructor() {
        super("https://localhost:7094")
    }

    async getAllSliders() {
        return await this.get(`api/Slider/all`);
    }

    async getSliderItemById(id) {
        return await this.get(`api/Slider/${id}`);
    }
}