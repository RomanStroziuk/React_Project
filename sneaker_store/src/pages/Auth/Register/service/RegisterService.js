import { HttpClient } from "@/utils/http/HttpClient";

export class RegisterService {
    static async register(firstName, lastName, email, password, signal) {
        const httpClient = new HttpClient({
            baseURL: "https://localhost:7144/user",
            signal
        });

        return await httpClient.post("/register", {
            firstName,
            lastName,
            email,
            password
        });
    }
}
