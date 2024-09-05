import { create } from "zustand";

type UserState = {
    authStatus: "unauthenticated" | "authenticated" | "loading";
    isSigningIn: boolean;
    isSigningOut: boolean;
    setIsSigningIn: (isSigningIn: boolean) => void;
    setIsSigningOut: (isSigningOut: boolean) => void;
};

export const useUserStore = create<UserState>()((set) => ({
    authStatus: "unauthenticated",
    isSigningIn: false,
    isSigningOut: false,
    setIsSigningIn: (isSigningIn: boolean) => set({ isSigningIn }),
    setIsSigningOut: (isSigningOut: boolean) => set({ isSigningOut }),
}));
