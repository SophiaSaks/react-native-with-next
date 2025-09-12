import express from "express"; 
import cors from "cors"; 
import type {Request, Response} from "express";

const app = express();
const PORT = 5000; 

app.use(cors()); 
app.use(express.json());

type User = {
    id: number,
    name: string;
};

const users:User[] = [
        {id: 1, name: "Sophia"},
        {id: 2, name: "Mia"},
        {id: 3, name: "Lovis"}
]

app.get("/", (req: Request, res: Response) => {
    res.send("Hello from Express BE 👋")
});

app.get("/api/users", (req: Request, res: Response) => {
    res.json(users);
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});