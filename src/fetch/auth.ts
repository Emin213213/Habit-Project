import axios from "axios";
import {LoginBody, RegBody} from "@/types/user";

export const registerUser = async (data: RegBody) => {
    const res = await axios.post('http://localhost:3000/api/auth/register', data)
    return res.data
}


export const loginUser = async (data: LoginBody) => {
    const res = await axios.post('http://localhost:3000/api/auth/login', data)
    return res.data
}

export const findUserId = async (id: string | number) => {
    if (!id) {
        throw new Error("User id is required");
    }

    const res = await axios.get(
        `http://localhost:3000/api/user/${id}`
    );

    return res.data;
};

