import { HttpClient } from "../../../../../utils/http/HttpClient";

export class RoleService {
  constructor(signal) {
    this.httpClient = new HttpClient({
      baseURL: `https://localhost:7144/role`,
      timeout: 10000,
      signal,
    });
  }
  async getAllRoles() {
    return await this.httpClient.get("");
  }
  async getRoleById() {
    return await this.httpClient.get(`/${id}`);
  }
  async createRole(role) {
    return await this.httpClient.post("", role);
  }
  async updateRole(role) {
    return await this.httpClient.put("", role);
  }
  async deleteRole(id) {
    return await this.httpClient.delete(`/${id}`);
  }
}
