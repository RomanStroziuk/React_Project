import { HttpClient } from "../../../utils/http/HttpClient";

export class WarehouseService {
  constructor(signal) {
    this.httpClient = new HttpClient({
      baseURL: `https://localhost:7144/warehouse`,
      timeout: 10000,
      signal,
    });
  }
  async getAllWarehouses() {
    return await this.httpClient.get("");
  }
  async getWarehouseById() {
    return await this.httpClient.get(`/${id}`);
  }
  async createWarehouse(warehouse) {
    return await this.httpClient.post("", warehouse);
  }
  async updateWarehouse(warehouse) {
    return await this.httpClient.put("", warehouse);
  }
  async deleteWarehouse(id) {
    return await this.httpClient.delete(`/${id}`);
  }
}
