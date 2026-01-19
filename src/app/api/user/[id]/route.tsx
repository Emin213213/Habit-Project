    import { NextResponse } from "next/server";
    import { prisma } from "@/lib/prisma";

    export async function GET(request: Request, { params }: { params: { id: string } }) {

        const userId = Number(params.id);

        if (isNaN(userId)) {
            return NextResponse.json(
                { error: "Invalid user id" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    }
