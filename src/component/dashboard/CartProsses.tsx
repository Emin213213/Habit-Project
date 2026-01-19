'use client';

import {useEffect, useState} from "react";
import HabitCard from "@/component/dashboard/HabitCard";
import { useParams } from "next/navigation";
import {Habit} from "@/types/habit";

export default function CartProsses() {
    const { id } = useParams<{ id: string }>();
    const [habitsUser, setHabitsUser] = useState<Habit[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!id) return;

        const storageKey = `habits_user_${id}`;
        const stored = localStorage.getItem(storageKey);

        if (stored) {
            setHabitsUser(JSON.parse(stored));
        }

        setIsLoaded(true);
    }, [id]);

    // -----
    useEffect(() => {
        if (!id || !isLoaded) return;

        const storageKey = `habits_user_${id}`;
        localStorage.setItem(storageKey, JSON.stringify(habitsUser));
    }, [habitsUser, id, isLoaded]);

    const totalHabits = habitsUser.length;

 const  completedToday = habitsUser.filter((item) => item.week.some(Boolean)).length


    const progress = totalHabits === 0 ? 0 : Math.round((completedToday / totalHabits)* 100)

    return (
        <main className="max-w-6xl   mx-auto px-6 py-8">

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 ">
                <div className="bg-white/40 rounded-lg p-4 shadow-sm backdrop-blur-lg">
                    <p className="text-sm text-gray-500">Total habits</p>
                    <p className="text-2xl font-semibold">{totalHabits}</p>
                </div>

                <div className="bg-white/40 rounded-lg p-4 shadow-sm backdrop-blur-lg">
                    <p className="text-sm text-gray-500">Completed today</p>
                    <p className="text-2xl font-semibold text-green-600">
                        {completedToday}
                    </p>
                </div>

                <div className="bg-white/40 rounded-lg p-4 shadow-sm backdrop-blur-lg">
                    <p className="text-sm text-gray-500">Progress</p>
                    <p className="text-2xl font-semibold">{progress}%</p>
                </div>
            </section>

            <section>
                <h2 className="text-lg font-semibold mb-4">
                    Your habits
                </h2>

                <HabitCard
                    habits={habitsUser}
                    setHabits={setHabitsUser}
                />
            </section>

        </main>
    );
}
