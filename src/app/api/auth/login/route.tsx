import { NextResponse } from "next/server";
import { login} from "@/lib/login";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();


        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password required" },
                { status: 400 }
            );
        }

        const result = await login(email, password);

        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Login error" },
            { status: 401 }
        );
    }
}
