import {prisma} from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/jwt";

export async function login(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
        throw new Error("Wrong password");
    }

    const token = generateToken({
        userId: user.id,
        email: user.email,
    });


    return {
        user: {
            id: user.id,
            email: user.email,
        },
    };
}
