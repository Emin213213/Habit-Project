import jwt from "jsonwebtoken";
import { AuthPayload } from "./jwt";

const JWT_SECRET = process.env.JWT_SECRET!;

export function verifyToken(token: string): AuthPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as AuthPayload;
    } catch {
        return null;
    }
}
