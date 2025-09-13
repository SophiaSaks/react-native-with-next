import {useState} from "react"; 

export default function LoginPage() {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try{
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ email, password})
            });

            if(!res.ok){
                const data = await res.json();
                setError(data.error || "Login failed");
                return;
            }

            window.location.href = "/";
        }catch(err){
            console.error(err);
            setError("Network error");
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2x1 font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
                 <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );


}