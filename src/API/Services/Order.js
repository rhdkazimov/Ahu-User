import { HttpClient } from "../HttpClient ";

export class OrderService extends HttpClient {
  constructor() {
    super("https://localhost:7094");
  }

  async createOrder(body) {
    return await this.post(`api/orders/createorder`,body);
  }

  async getAllOrders() {
    return await this.get(`api/Orders`);
  }

  async getOrderById(id) {
    return await this.get(`api/Orders/${id}`);
  }
}
