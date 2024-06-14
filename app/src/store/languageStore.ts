import { create } from 'zustand'
const lang = localStorage.getItem("lang");

export const languageStore = create((set) => ({
    lang: lang == undefined ? "en" : lang,
    changeLanguage: (lng: string) => set(() => ({ lang: lng })),
    reset: () => set({ lang: "en" }),
}))
