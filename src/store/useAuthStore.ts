import { create } from 'zustand'
import axios from "../axios";

interface User {
    // login: string;
    ethAddress: string;
}

interface AuthStore {
    user: User | null;
    token: string | null;
    login: (ethAddress: string) => Promise<string | null>;
    getUser: () => Promise<User | null>;
}
// password: string
// , password
const useAuthStore = create<AuthStore>((set, get) => ({
    user: null,
    token: null,
    login: async (ethAddress) => {
        try {
            const res = await axios.post<{ authToken: string }>("/login", {
                ethAddress,
                // password,
            });

            if (!res.data) {
                throw Error();
            }
            set({ token: res.data.authToken });
            return get().token;
        } catch (error) {
            set({ token: null });
        }

        return null;
    },
    getUser: async () => {

        if (get().user) {
            return get().user;
        }

        try {
            const res = await axios.get<{ data: User }>("/get-user");

            if (!res.data) {
                throw Error();
            }
            set({ user: res.data.data });

            return get().user;

        } catch (error) {
            set({ user: null });
        }
        return null;
    },
}))
  
  export default useAuthStore;