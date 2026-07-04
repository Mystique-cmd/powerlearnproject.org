// components/SignupForm.jsx
import axios from "axios";
export default function SignupForm() {
    const [msg, setMsg] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("/api/signup", { email: "a@b.com" });
        setMsg(res.data.message);
    };
    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">Sign Up</button>
            <p>{msg}</p>
        </form>
    );
}
