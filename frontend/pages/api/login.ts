import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { email, password } = req.body;
    console.log("incoming login request:", {email, password});

    try {

        const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const data = await response.json();
            return res.status(401).json({ error: data.error || "Invalid credentials"});
        }

        const data = await response.json();
        const token = data.token; 

        res.setHeader("Set-Cookie", serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60,
            path: "/",
        }));

        return res.status(200).json({success: true});

    } catch(err){
        console.log(err);
        return res.status(500).json({error: "Server error"});
    }
}