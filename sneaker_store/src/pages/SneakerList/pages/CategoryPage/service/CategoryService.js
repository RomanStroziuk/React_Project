import { HttpClient } from "../../../../../utils/http/HttpClient";

export class CategoryService {
  constructor(signal) {
    this.httpClient = new HttpClient({
      baseURL: `https://localhost:7144/categories`,
      timeout: 10000,
      signal,
    });
  }
  async getAllCategories() {
    return await this.httpClient.get("/list");
  }
  async getCategoryById() {
    return await this.httpClient.get(`/${id}`);
  }
  async createCategory(category) {
    return await this.httpClient.post("/create", category);
  }
  async updateCategory(category) {
    return await this.httpClient.put("/update", category);
  }
  async deleteCategory(id) {
    return await this.httpClient.delete(`/delete/${id}`);
  }
}
