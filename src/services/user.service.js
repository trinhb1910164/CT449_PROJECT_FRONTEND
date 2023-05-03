import createApiClient from "./api.service";

class UserService {
    constructor(baseUrl = "/api/user") {
    this.api = createApiClient(baseUrl);
    }
    async addcart(data) {

        return (await this.api.post("/cart", data)).data;
    }
    async register(data) {
        return (await this.api.post("/register", data)).data;
    }
    async login(data) {
        return (await this.api.post("/login", data)).data;
    }
    async addOrder(data) {
        return (await this.api.post(`/cart/create-order`, data)).data;
    }
    async getcart(data) {
        return (await this.api.get("/acart",data)).data;
    }
    async getAll(data) {
        return (await this.api.get(`/cart`,data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/cart/${id}`)).data;
    }
}

export default new UserService();