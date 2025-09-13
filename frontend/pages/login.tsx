import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error || "Login failed");
                return;
            }

            window.location.href = "/";
        } catch (err) {
            console.error(err);
            setError("Network error");
        }
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-backgroundGreen">

            <form
                onSubmit={handleSubmit}
                className="bg-lighterGreen p-8 rounded-2xl shadow-lg w-80 flex flex-col gap-6" >
                <h1
                    className="text-2xl font-bold text-center text-primary" >
                    Login
                </h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <button
                    type="submit"
                    className="bg-primary text-white rounded-lg py-2 hover:bg-okGreen disabled:opacity-50"
                >
                    Login
                </button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );


}