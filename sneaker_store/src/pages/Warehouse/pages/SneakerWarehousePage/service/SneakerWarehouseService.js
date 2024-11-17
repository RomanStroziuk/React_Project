import { HttpClient } from "../../../../../utils/http/HttpClient";

export class SneakerWarehouseService {
  constructor(signal) {
    this.httpClient = new HttpClient({
      baseURL: `https://localhost:7144/sneaker-warehouse`,
      timeout: 10000,
      signal,
    });
  }
  async getAllSneakerWarehouses() {
    return await this.httpClient.get("");
  }

  async getSneakerWarehouseById(id) {
    return await this.httpClient.get(`/${id}`);
  }

  async createSneakerWarehouse(sneakerWarehouse) {
    return await this.httpClient.post("", sneakerWarehouse);
  }

  async updateSneakerWarehouse(sneakerWarehouse) {
    return await this.httpClient.put("", sneakerWarehouse);
  }

  async deleteSneakerWarehouse(id) {
    return await this.httpClient.delete(`/${id}`);
  }
}
