// __tests__/useToggle.test.js
import { renderHook, act } from "@testing-library/react";

import useToggle from "../hooks/useToggle";

test("toggles value", () => {
  const { result } = renderHook(() => useToggle());
  expect(result.current[0]).toBe(false);
  act(() => result.current[1]());
  expect(result.current[0]).toBe(true);
});
