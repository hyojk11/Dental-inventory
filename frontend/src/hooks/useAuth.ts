import { useState } from 'react';
import {User} from "@/types";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);

    const login = (userInfo: User) => {
        setUser(userInfo);
    };

    const logout = () => {
        setUser(null);
    };

    return { user, login, logout };
}
