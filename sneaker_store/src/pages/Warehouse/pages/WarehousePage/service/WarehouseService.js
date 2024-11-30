import { HttpClient } from "@/utils/http/HttpClient";

export class WarehouseService {
  constructor(signal) {
    this.httpClient = new HttpClient({
      baseURL: `https://localhost:7144/warehouse`,
      signal,
    });
  }
  async getAllWarehouses() {
    return await this.httpClient.get("/list");
  }
  async getWarehouseById() {
    return await this.httpClient.get(`/${id}`);
  }
  async createWarehouse(warehouse) {
    return await this.httpClient.post("/create", warehouse);
  }
  async updateWarehouse(warehouse) {
    return await this.httpClient.put("/update", warehouse);
  }
  async deleteWarehouse(id) {
    return await this.httpClient.delete(`/delete/${id}`);
  }
}
