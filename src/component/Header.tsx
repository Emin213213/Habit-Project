"use client";


import {User} from "@/types/user";

type Props = {
    user: User
};


export default function Header({ user }: Props) {

    return (
        <section className=" rounded-2xl p-6   ">
            <h1 className="text-2xl font-semibold ">
                Good afternoon, {user.name}
            </h1>
        </section>
    );
}
