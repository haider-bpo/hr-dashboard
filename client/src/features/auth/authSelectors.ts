import useAuthStore, { AuthStore } from "./authStore";

// Selector functions
export const useUser = () => useAuthStore((store: AuthStore) => store.user);
export const useIsAuthenticated = () =>
  useAuthStore((store: AuthStore) => store.isAuthenticated);
export const useGetUser = () =>
  useAuthStore((store: AuthStore) => store.getUser);
export const useSigninUser = () =>
  useAuthStore((store: AuthStore) => store.signin);
export const useLogoutUser = () =>
  useAuthStore((store: AuthStore) => store.logout);
