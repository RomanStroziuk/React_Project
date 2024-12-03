import { HttpClient } from"@/utils/http/HttpClient";

export class LoginService {
// constructor(signal) {
//     this.httpClient = new HttpClient({
//         baseURL: "https://localhost:7144/user",
//         signal
//     });
// }

// async login(email, password, signal) {
//     return await this.httpClient.post("/authenticate", { email, password });
// }

    static async login(email, password, signal) {
        const httpClient = new HttpClient({
            baseURL: "https://localhost:7144/user",
            signal
        });
        return await httpClient.post("/authenticate", { email, password });
    }
}