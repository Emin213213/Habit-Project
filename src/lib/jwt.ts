import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export type AuthPayload = {
    userId: number;
    email: string;
};

export function generateToken(user: { userId: any; email: any }) {
    return jwt.sign(user, JWT_SECRET, {
        expiresIn: "1h",
    });
}
