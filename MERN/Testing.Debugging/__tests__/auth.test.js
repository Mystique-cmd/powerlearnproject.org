// __tests__/auth.test.js
const auth = require("../middleware/auth");

test("calls next if authorized", () => {
  const req = { headers: { authorization: "secret" } };
  const res = {};
  const next = jest.fn();
  auth(req, res, next);
  expect(next).toHaveBeenCalled();
});

test("returns 401 if unauthorized", () => {
  const req = { headers: {} };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const next = jest.fn();
  auth(req, res, next);
  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
});
