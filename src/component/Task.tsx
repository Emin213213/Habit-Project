'use client'
import React, {useState} from "react";
import {Habit} from "@/types/habit";

export  function  Task() {

    const [namePlan, setNamePlan] = useState("");
    const [habitsUser, setHabitsUser] = useState<Habit[]>([]);


    const handlerClick = () => {
        if (!namePlan.trim()) return;

        const newHabit: Habit = {
            id: Date.now(),
            name: namePlan,
            week:[false],
            description:''
        };

        setHabitsUser((prev) => [...prev, newHabit]);
        
        setNamePlan("");
    };

    /* ===================== DELETE HABIT ===================== */
    const handlerDelete = (habitId: number) => {
        setHabitsUser((prev) => prev.filter((item) => item.id !== habitId));
    };
    return (
        <>
            <div className="rounded-2xl p-6 shadow-lg backdrop-blur-xl bg-white/40">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">
                    Upcoming tasks
                </h2>

                <div className="flex gap-2 mb-4">
                    <input
                        value={namePlan}
                        onChange={(e) => setNamePlan(e.target.value)}
                        placeholder="Add new habit..."
                        className="flex-1 px-4 py-2 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"/>

                    <button
                        onClick={handlerClick}
                        className="px-5 py-2 rounded-2xl bg-blue-600 text-white font-medium hover:bg-blue-700 active:scale-95 transition">Add
                    </button>
                </div>

                <ul className="flex flex-col gap-3">
                    {habitsUser.map((item) => (
                        <li
                            key={item.id}
                            className="flex items-center justify-between rounded-2xl p-3 bg-white/50 backdrop-blur-md border border-white/40 shadow-sm hover:bg-white/70 transition">
                                        <span className="text-gray-800 font-medium">
                                          {item.name}
                                        </span>

                            <button
                                onClick={() => handlerDelete(item.id)}
                                className="text-xs px-3 py-1 rounded-xl text-red-600 border border-red-300 hover:bg-red-50 transition">
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>

                {habitsUser.length === 0 && (
                    <p className="text-sm text-gray-500 text-center mt-4">
                        No tasks yet. Add your first one
                    </p>
                )}
            </div>
        </>
    )
}