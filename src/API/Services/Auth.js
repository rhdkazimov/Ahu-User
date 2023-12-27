import { HttpClient } from "../HttpClient ";

export class AuthService extends HttpClient {

    constructor() {
        super("https://localhost:7094")
    }

    async login(body) {
        return await this.post(`api/auth/login`, body).then(({ data: { token, user } }) => {
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
        });
    }

    async register(body) {
        return await this.post(`api/auth/register`, body);
    }

    async logout() {
        return await this.get(`api/auth/logout`).then(() => {
            localStorage.removeItem("user")
            localStorage.removeItem("token")
        })
    }

    async forgotPassword(body) {
        return await this.post(`api/accounts/forgotpassword`, body)
    }

    async resetPassword(body) {
        return await this.post(`api/accounts/resetpasswordchange`, body)
    }
}