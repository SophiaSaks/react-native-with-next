import {useState} from "react"; 
import {useRouter} from "next/router"; 

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try{
            const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ email, password})
            });

            if(!res.ok){
                const data = await res.json();
                setError(data.error || "Login failed0");
                return;
            }

            const data = await res.json();
            const token = data.token;

            localStorage.setItem("token", token);

            router.push("/");
        }catch(err){
            console.error(err);
            setError("Network error");
        }
    };

    return (
        <div className="p-8">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
                <button type="submit">Login</button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );


}