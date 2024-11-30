import { HttpClient } from "../../../../../utils/http/HttpClient";

export class RoleService {
  constructor(signal) {
    this.httpClient = new HttpClient({
      baseURL: `https://localhost:7144/role`,
      signal,
    });
  }
  async getAllRoles() {
    return await this.httpClient.get("/list");
  }
  async getRoleById() {
    return await this.httpClient.get(`/${id}`);
  }
  async createRole(role) {
    return await this.httpClient.post("/create", role);
  }
  async updateRole(role) {
    return await this.httpClient.put("/update", role);
  }
  async deleteRole(id) {
    return await this.httpClient.delete(`/delete/${id}`);
  }
}
