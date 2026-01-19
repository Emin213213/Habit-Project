'use client';

import {useEffect, useState} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "@/lib/redux/loginSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useParams } from "next/navigation";
export function LoginHabit() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const { id } = useParams();

    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, user } = useSelector(
        (state: RootState) => state.login
    );
    const router = useRouter();


    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const action = await dispatch(loginThunk({ email, password }));

        console.log(action);

        const userId = action.payload.user.id

            router.push(`/user/${userId}`);
    };



    return (
        <div className="h-screen w-screen bg-[url('/background-login.gif')] bg-cover bg-center flex items-center justify-center">
            <form
                onSubmit={handlerSubmit}
                className="opacity-0 translate-y-5 animate-[fadeIn_0.5s_ease-out_forwards]  mx-auto w-full max-w-md rounded-3xl backdrop-blur-lg border border-white/50 p-8 shadow-xl flex flex-col gap-5"
            >
                <h2 className="text-2xl font-semibold">Login</h2>

                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600">
                        Email
                    </label>
                    <input
                        className="rounded-full border px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600 flex justify-between">
                        Password
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-sm text-gray-500 hover:text-black"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </label>

                    <input
                        className="rounded-full border px-4 py-3 outline-none
            focus:ring-2 focus:ring-gray-300"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error && (
                    <p className="text-sm text-red-500">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className={`mt-2 rounded-full py-3 font-medium transition  `}
                >
                    {loading ? "Waiting please..." : "Login"}
                </button>

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                        />
                        Remember me
                    </label>
                </div>

                <p className="text-sm text-center">
                    Don’t have an account?{" "}
                    <Link href="/">Sign up</Link>
                </p>
            </form>
        </div>
    );
}
