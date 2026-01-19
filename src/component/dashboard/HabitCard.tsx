'use client';

import { useState } from "react";
import {Habit} from "@/types/habit";

type Props = {
    habits: Habit[];
    setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
};

export default function HabitCard({ habits, setHabits }: Props) {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    /* ===================== ADD HABIT ===================== */
    const handlerClick = () => {
        if (!name.trim() || !description.trim()) return;

        const newHabit: Habit = {
            id: Date.now(),
            name,
            description,
            week: Array(7).fill(false),
        };

        setHabits(prev => [...prev, newHabit]);
        setName("");
        setDescription("");
    };

    /* ===================== DELETE HABIT ===================== */
    const handlerDelete = (habitId: number) => {
        setHabits(prev => prev.filter(item => item.id !== habitId));
    };

    /* ===================== TOGGLE DAY ===================== */
    const toggleDay = (habitId: number, dayIndex: number) => {
        setHabits(prev =>
            prev.map(item => item.id === habitId  ? {...item, week: item.week.map((v, i) => {
                    return i === dayIndex ? !v : v;
                }),} : item
            )
        );
    };

    return (
        <div className="space-y-10">
            {/* ===================== ADD HABIT ===================== */}
            <div className="border rounded-xl p-4 flex gap-3 bg-white">
                <input
                    className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Habit name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button
                    onClick={handlerClick}
                    className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                    Add
                </button>
            </div>

            {/* ===================== HABITS LIST ===================== */}
            <div className="space-y-6">
                {habits.map(habit => {
                    const completed = habit.week.filter(Boolean).length;
                    const progress = Math.round((completed / 7) * 100);

                    return (
                        <div
                            key={habit.id}
                            className="border rounded-xl p-5 bg-white" >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="text-sm font-semibold">
                                        {habit.name}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        {habit.description}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-gray-400">
                                        {completed} / 7
                                    </span>

                                    <button
                                        onClick={() => handlerDelete(habit.id)}
                                        className="
                                            text-xs px-3 py-1 rounded-lg
                                            text-red-600 border border-red-300
                                            hover:bg-red-50 transition
                                        "
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="h-1 bg-gray-200 rounded-full">
                                    <div
                                        className="h-1 bg-indigo-600 rounded-full transition-all"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                    {progress}% completed
                                </p>
                            </div>

                            {/* Days */}
                            <div className="grid grid-cols-7 gap-2">
                                {habit.week.map((done, i) => (
                                    <button
                                        key={i}
                                        onClick={() => toggleDay(habit.id, i)}
                                        className={`py-2 text-xs rounded-md border transition ${
                                            done
                                                ? "bg-indigo-600 text-white border-indigo-600"
                                                : "bg-white text-gray-500 hover:bg-gray-100"}`}>
                                        {days[i]}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
