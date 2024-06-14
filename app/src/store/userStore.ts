import { create } from 'zustand'

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

// console.log("token and user from store",token,JSON.stringify(user))

export const userStore = create((set) => ({
    token: token == undefined ? null : token,
    user: user == undefined ? null : JSON.parse(JSON.stringify(user)),
    saveToken: (tok: string) => set(() => ({ token: tok })),
    saveUser:(user:any)=>set(()=>({user:user})),
    logout: () => {
        set({ token: null })
        set({ user: null })
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    },
}))
