'use client'

import { useParams } from "next/navigation";
import CartProsses from "@/component/dashboard/CartProsses";
import {useQuery} from "@tanstack/react-query";
import {findUserId} from "@/fetch/auth";
import NotFound from "@/component/Not-Found";
import Loading from "@/component/Loading";

export default function Dashboard() {
    const { id } = useParams<{ id: string }>();


    const isValidId = typeof id === "string" && id.trim().length > 0;

    const { data: user, isLoading, isError } = useQuery({
        queryKey: ["user", id],
        queryFn: () => findUserId(id!),
        enabled: isValidId,
    });


    if (isLoading) return <Loading/>
    if (isError) return <NotFound/>




    return (
        <div className="min-h-screen bg-[url('/background-dashboard.jpeg')] bg-cover bg-center">
            <div className="bg-white/30 border-b backdrop-blur-xl">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-900">
                        Habit Tracker
                    </h1>

                    <div className="text-sm text-gray-600">
                       Hello, { user.id}
                    </div>
                </div>
            </div>

            <CartProsses />
        </div>
    );
}
