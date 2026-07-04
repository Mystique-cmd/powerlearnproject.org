// __tests__/SignupForm.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import SignupForm from "../components/SignupForm";
import axios from "axios";

jest.mock("axios");

test("submits form and shows message", async () => {
    axios.post.mockResolvedValue({ data: { message: "Welcome!" } });
    render(<SignupForm />);
    fireEvent.click(screen.getByText("Sign Up"));
    expect(await screen.findByText("Welcome!")).toBeInTheDocument();
});
