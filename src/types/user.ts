export  type User = {
    id: number
    name: string
    email: string
}

export type RegBody = {
    name: string
    email: string
    password: string
}

export type LoginBody = {
    email: string
    password: string
}

