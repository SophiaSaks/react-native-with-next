import express from "express"; 
import cors from "cors"; 
import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { config as importDotEnvConfig } from "dotenv";
importDotEnvConfig();

const app = express();
const PORT = process.env.PORT || 5000; 
const SECRET = process.env.JWT_SECRET as string;


app.use(cors()); 
app.use(express.json());

type User = {
    id: number,
    name: string;
    email: string; 
    passwordHash: string; 
};

interface MyJwtPayload extends JwtPayload {
    userId: number
}

const users:User[] = [
        {id: 1, name: "Sophia", email: "sophia@example.com", passwordHash: bcrypt.hashSync("password123", 10)},
        {id: 2, name: "Mia", email: "mia@example.com", passwordHash: bcrypt.hashSync("secret123", 10)},
        {id: 3, name: "Lovis", email: "lovis@example.com", passwordHash: bcrypt.hashSync("hemligt123", 10)}
]

app.get("/", (req: Request, res: Response) => {
    res.send("Hello from Express BE 👋")
});

app.get("/api/users", (req: Request, res: Response) => {
    res.json(users);
});

app.post("/api/auth/login", async (req: Request, res: Response) => {
    const {email, password } = req.body;
    const user = users.find((u) => u.email === email);
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials"});
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if(!isMatch){
        return res.status(401).json({error: "Invalid credentials"})
    }

    const token = jwt.sign({userId: user.id}, SECRET, { expiresIn: "1h"}); 

    res.json({token}); 
})

app.get("/api/auth/me", (req: Request, res: Response) => {

    const authHeader = req.headers.authorization;  
    if(!authHeader?.startsWith("Bearer ")){
        return res.status(401).json({ error: "No token provided"});
    } 

const token:string = authHeader.split(" ")[1]!;
    try {
        const decoded = jwt.verify(token, SECRET) as unknown as MyJwtPayload;
        const user = users.find((u) => u.id === decoded.userId);
        if(!user) return res.status(404).json({error:  "User not found"});

        res.json({ id: user.id, name: user.name, email: user.email})
    } catch(err){
        res.status(401).json({ error: "Invalid token"});
    }
})

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});