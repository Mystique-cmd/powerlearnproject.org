test("rejects invalid email", async () => {
    const res = await request(app)
        .post("/api/signup")
        .send({ email: "not-an-email", password: "123" });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/invalid email/i);
});
