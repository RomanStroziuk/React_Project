import { HttpClient } from"@/utils/http/HttpClient";

export class AuthService {
   
    
        static async login(email, password, signal) {
            const httpClient = new HttpClient({
                baseURL: "https://localhost:7144/user",
                signal
            });
            return await httpClient.post("/authenticate", { email, password });
        }

        static async register(firstName, lastName, email, password, signal) {
            const httpClient = new HttpClient({
                baseURL: "https://localhost:7144/user",
                signal
            });
            const userDto = { firstName, lastName, email, password };
            return await httpClient.post("/register", userDto);

    }
}