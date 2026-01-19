'use client';

import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import Link from "next/link";

import {AppDispatch, RootState} from "@/lib/redux/store";
import {registerThunk} from "@/lib/redux/authSlice";

const RegisterForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const {user, load, err} = useSelector(
        (state: RootState) => state.auth
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const isDisabled = load || !name || !email || !password;

    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isDisabled) return;

        const action = await dispatch(registerThunk({name, email, password}));
        const userId = action.payload.user.id;
        router.push(`/user/${userId}`);
    };


    return (
        <div
            className="h-screen w-screen bg-[url('/background.gif')] bg-cover bg-center flex items-center justify-center">
            <form
                onSubmit={handlerSubmit}
                className="opacity-0 translate-y-5 animate-[fadeIn_0.5s_ease-out_forwards]
        mx-auto backdrop-blur-lg mt-20 w-full max-w-md rounded-2xl
        p-6 shadow-sm flex flex-col gap-4"
            >
                <h2 className="text-2xl font-semibold">Register</h2>

                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600">Name</label>
                    <input
                        className="rounded-full border px-4 py-3 outline-none  focus:ring-2 focus:ring-gray-300"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600">
                        Email
                    </label>
                    <input
                        className="rounded-full border px-4 py-3 outline-none  focus:ring-2 focus:ring-gray-300"
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

                {err && (
                    <p className="text-sm text-red-500">
                        {err}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isDisabled}
                    className={`mt-2 rounded-full py-3 font-medium transition
                     ${isDisabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-800 text-white hover:bg-black"}`}>
                    {load ? "Creating account..." : "Sign up"}
                </button>

                <p className="text-sm text-center">
                    Already have an account?{" "}
                    <Link href="/login" className="underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
