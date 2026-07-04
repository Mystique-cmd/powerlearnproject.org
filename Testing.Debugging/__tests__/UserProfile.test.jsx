import React from "react";
import { render, screen } from "@testing-library/react";
import UserProfile from "../components/UserProfile";
import { fetchUser } from "../api";

jest.mock("../api");

test("renders user name after fetch", async () => {
    fetchUser.mockResolvedValue({ name: "Alice" });
    render(<UserProfile id="123" />);
    expect(await screen.findByText("Alice")).toBeInTheDocument();
});
