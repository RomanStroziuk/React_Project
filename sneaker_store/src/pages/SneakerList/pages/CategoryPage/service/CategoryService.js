import { HttpClient } from "../../../../../utils/http/HttpClient";

export class CategoryService {
  constructor(signal) {
    this.httpClient = new HttpClient({
      baseURL: `https://localhost:44353/categories`,
      timeout: 10000,
      signal,
    });
  }
  async getAllCategories() {
    return await this.httpClient.get("");
  }
  async getCategoryById() {
    return await this.httpClient.get(`/${id}`);
  }
  async createCategory(category) {
    return await this.httpClient.post("", category);
  }
  async updateCategory(category) {
    return await this.httpClient.put("", category);
  }
  async deleteCategory(id) {
    return await this.httpClient.delete(`/${id}`);
  }
}
