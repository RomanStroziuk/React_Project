import { HttpClient } from "../../../../../utils/http/HttpClient";

export class StatusService {
  constructor(signal) {
    this.httpClient = new HttpClient({
      baseURL: `https://localhost:7144/status`,
      timeout: 10000,
      signal,
    });
  }
  async getAllStatutes() {
    return await this.httpClient.get("/list");
  }
  async getStatusById() {
    return await this.httpClient.get(`/${id}`);
  }
  async createStatus(status) {
    return await this.httpClient.post("/create", status);
  }
  async updateStatus(status) {
    return await this.httpClient.put("/update", status);
  }
  async deleteStatus(id) {
    return await this.httpClient.delete(`/delete/${id}`);
  }
}
