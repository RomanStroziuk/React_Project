import { HttpClient } from "../../../../../utils/http/HttpClient";

export class BrandService {
  constructor(signal) {
    this.httpClient = new HttpClient({
      baseURL: `https://localhost:44353/brands`,
      timeout: 10000,
      signal,
    });
  }
  async getAllBrands() {
    return await this.httpClient.get("");
  }
  async getBrandById() {
    return await this.httpClient.get(`/${id}`);
  }
  async createBrand(brand) {
    return await this.httpClient.post("", brand);
  }
  async updateBrand(brand) {
    return await this.httpClient.put("", { brand });
  }
  async deleteBrand(id) {
    return await this.httpClient.delete(`/${id}`);
  }
}
