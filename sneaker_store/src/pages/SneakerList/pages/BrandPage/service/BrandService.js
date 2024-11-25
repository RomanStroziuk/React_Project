import { HttpClient } from "../../../../../utils/http/HttpClient";

export class BrandService {
  constructor(signal) {
    this.httpClient = new HttpClient({
      baseURL: `https://localhost:7144/brands`,
      signal,
    });
  }

  async getAllBrands() {
    return await this.httpClient.get("/list"); 
  }

  async getBrandById(id) {
    return await this.httpClient.get(`/${id}`);
  }

  async createBrand(brand) {
    return await this.httpClient.post("/create", brand); 
  }

  async updateBrand(brand) {
    return await this.httpClient.put("/update", brand); 
  }

  async deleteBrand(id) {
    return await this.httpClient.delete(`/delete/${id}`); 
  }
}
