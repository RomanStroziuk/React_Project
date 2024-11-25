import { HttpClient } from "../../../utils/http/HttpClient";

export class UserService {
  constructor(signal) {
    this.httpClient = new HttpClient({
      baseURL: `https://localhost:7144/user`,
      signal,
    });
  }
  
  async getAllUsers() {
    return await this.httpClient.get("/list");
  }
  async getUserById() {
    return await this.httpClient.get(`/${id}`);
  }
  async deleteUser(id) {
    return await this.httpClient.delete(`/delete/${id}`);
  }
}
