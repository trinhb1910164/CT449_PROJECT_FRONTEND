import createApiClient from "./api.service";

class ProductService {
    constructor(baseUrl = "/api/product") {
    this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
}

export default new ProductService();