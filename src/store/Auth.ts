import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { AppwriteException, ID, Models } from "appwrite";
import { account } from "@/app/appwrite";

interface IAuthStore {
  currentUser: Models.Session | null;
  user: Models.User<Models.Preferences> | null;
  hydrated: boolean; // when the states are retrieved from persistent storage
  jwt: string | null;

  setHydrated(): void;
  verifySession(): Promise<void>;
  login(
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: AppwriteException | null }>;

  createAccount(
    email: string,
    password: string,
    name: string
  ): Promise<{ success: boolean; error?: AppwriteException | null }>;

  logout(): Promise<void>;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => ({
      currentUser: null,
      user: null,
      hydrated: false,
      jwt: null,

      setHydrated() {
        set({ hydrated: true });
      },

      async verifySession() {
        try {
          const session = await account.getSession("current");
          set({ currentUser: session });
        } catch (error) {
          console.log("Error verifying session:", error);
        }
      },

      async login(email: string, password: string) {
        try {
          const currentUser = await account.createEmailPasswordSession(email, password);
          const [user, { jwt }] = await Promise.all([
            account.get(),
            account.createJWT(),
          ]);

          set({ user, currentUser, jwt });
          return { success: true };
        } catch (error) {
          console.log("Login Error:", error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async createAccount(email: string, password: string, name: string) {
        try {
          await account.create(ID.unique(), email, password, name);
          return { success: true };
        } catch (error) {
          console.log("Register Error:", error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async logout() {
        try {
          await account.deleteSession("current");
          set({ user: null, currentUser: null, jwt: null });
        } catch (error) {
          console.log("Logout Error:", error);
        }
      },
    })),
    {
      name: "auth",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
