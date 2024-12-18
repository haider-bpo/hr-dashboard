import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "@/hooks/use-toast";
import { User } from "./authTypes";
import { fetchUser, logoutUser, signinUser, signupUser } from "./authApi";

export interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;

  // Authentication Methods
  signup: (userData: User) => Promise<User>;
  signin: (credentials: User) => Promise<User>;
  logout: () => Promise<void>;

  // User Management Methods
  getUser: () => Promise<User | null>;
}

const authStore: StateCreator<AuthStore> = (set, get) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem("accessToken") || false,

  // Signup Method
  signup: async (userData) => {
    const res = await signupUser(userData);

    if (res?.data) {
      const { user } = res.data;

      toast({
        title: "Signup Successful",
        description: "You have successfully created an account",
        variant: "success",
      });

      return user;
    }
  },

  // Signin Method
  signin: async (credentials) => {
    const res = await signinUser(credentials);

    if (res?.data) {
      const { user, accessToken, refreshToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      set(() => ({
        user,
        isAuthenticated: true,
      }));

      return user;
    }
  },

  // Logout Method
  logout: async () => {
    const { user } = get();

    if (user?._id) {
      await logoutUser();
    }

    set(() => ({
      user: null,
      isAuthenticated: false,
    }));

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
      variant: "success",
    });
  },

  // Fetch User Method
  getUser: async () => {
    const res = await fetchUser();

    if (res?.data) {
      const { user } = res.data;

      set(() => ({ user }));

      return user;
    }

    return null;
  },
});

const useAuthStore = create<AuthStore>()(
  persist(authStore, {
    name: "auth-storage",
    partialize: (state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
    }),
  })
);

export default useAuthStore;
