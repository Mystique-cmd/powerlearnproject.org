// __tests__/formatDate.test.js
import { formatDate } from "../utils/formatDate";

test("formats ISO string to locale date", () => {
  const result = formatDate("2025-11-04T00:00:00Z");
  expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
});
