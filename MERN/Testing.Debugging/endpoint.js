import request from "supertest";
import app from "../app"; // your Express app

describe("POST /api/login", () => {
    it("should return token on valid credentials", async () => {
        const res = await request(app)
            .post("/api/login")
            .send({ email: "test@example.com", password: "123456" });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
    });
});
