import { HttpClient } from "../../../../../utils/http/HttpClient";

export class SneakerService {
  constructor(signal) {
    this.httpClient = new HttpClient({
      baseURL: `https://localhost:7144/sneakers`,
      timeout: 10000,
      signal,
    });
  }
  async getAllSneakers() {
    return await this.httpClient.get("");
  }
  async getSneakerById(id) {
    return await this.httpClient.get(`/${id}`);
  }
  async createSneaker(sneaker) {
    return await this.httpClient.post("", sneaker);
  }
  async updateSneaker(sneaker) {
    return await this.httpClient.put(`/${sneaker.id}`, sneaker);
  }
  async deleteSneaker(id) {
    return await this.httpClient.delete(`/${id}`);
  }
}
