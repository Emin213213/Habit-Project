"use client";

import {useParams} from "next/navigation";
import Header from "@/component/Header";
import React, {useState} from "react";
import Link from "next/link";
import {Calendar} from "@/components/ui/calendar";
import {info} from "@/lib/info";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {toggleTheme} from "@/lib/redux/ThemaSlice";
import {useQuery} from "@tanstack/react-query";
import {findUserId} from "@/fetch/auth";
import {Task} from "@/component/Task";
import NotFound from "@/component/Not-Found";
import Loading from "@/component/Loading";



type Habit = {
    id: number;
    name: string;
    week: boolean[];
};

export default function UserPage() {

    const [date, setDate] = useState<Date | undefined>(new Date());
    const {id} = useParams<{ id: string }>();

    const dispatch = useAppDispatch();
    const {theme}: any = useAppSelector((state) => state.theme);


    const isValidId = typeof id === "string" && id.trim().length > 0;

    const {data: user, isLoading} = useQuery({
        queryKey: ["user", id],
        queryFn: () => findUserId(id!),
        enabled: isValidId,
    });


    if (isLoading) {
        return <Loading/>
    }

    if (!user) return <NotFound/>


    return (
        <main
            className={`py-8 bg-cover bg-center transition-all duration-500 ${
                theme === "light"
                    ? "bg-[url('/user-background.jpg')] text-black"
                    : "bg-[url('/user-background-dark.jpg')] text-white"
            }`}
        >
            {/* ===================== HEADER ===================== */}
            <div className="flex justify-around items-baseline mx-auto">
                <Header user={user}/>
                <button
                    onClick={() => dispatch(toggleTheme())}
                    className="px-4 py-2 rounded-2xl bg-gray-200/35 backdrop-blur-xl"
                >
                    Current theme: {theme}
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* ===================== LEFT ===================== */}
                    <section className="flex flex-col gap-6 lg:w-[42%]">
                        <article className="rounded-2xl p-6 shadow-lg backdrop-blur-xl bg-white/40">
                            <h2 className="text-lg font-semibold text-gray-900">
                                <Link href={`/dashboard/${id}`} className="hover:text-blue-600">
                                    Dashboard
                                </Link>
                            </h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Overview of your habits and progress
                            </p>
                        </article>

                        <article className="rounded-2xl p-6 shadow-lg backdrop-blur-xl bg-white/40">
                            <h2 className="text-lg font-semibold mb-4 text-gray-900">
                                Useful articles
                            </h2>

                            <ul className="flex flex-col gap-4">
                                {info.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-4 rounded-xl p-4 hover:bg-white/30 transition">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-14 w-14 rounded-lg object-cover"
                                        />

                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                {item.title}
                                            </p>
                                            <a href={item.link} target="_blank" rel="noopener noreferrer"
                                               className="text-xs text-blue-600 hover:underline">
                                                Read article →
                                            </a>
                                        </div>

                                        <span className="text-lg">📘</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </section>

                    {/* ===================== CENTER ===================== */}
                    <section className="lg:w-[33%]">
                        <article className="rounded-2xl p-6 shadow-lg backdrop-blur-xl bg-white/40">
                            <h2 className="text-lg font-semibold mb-4 text-gray-900">
                                Calendar
                            </h2>

                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md text-black"
                                captionLayout="dropdown"
                            />
                        </article>
                    </section>

                    {/* ===================== RIGHT ===================== */}
                    <Task/>
                </div>
            </div>
        </main>
    );
}
