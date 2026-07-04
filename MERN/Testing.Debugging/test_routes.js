test("access protected route with token", async () => {
    const loginRes = await request(app)
        .post("/api/login")
        .send({ email: "a@b.com", password: "123" });

    const token = loginRes.body.token;

    const protectedRes = await request(app)
        .get("/api/dashboard")
        .set("Authorization", `Bearer ${token}`);

    expect(protectedRes.statusCode).toBe(200);
});
