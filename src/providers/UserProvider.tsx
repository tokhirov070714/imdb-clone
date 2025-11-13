import { createContext, useContext, useEffect, useState } from "react";

import axiosInstance from "@/lib/axios";

const userCTX = createContext<any>(null);

interface Props {
    children: React.ReactNode;
}

const UserProvider: React.FC<Props> = ({ children }) => {

    const [user, setUser] = useState<any>([])


    useEffect(() => {

        axiosInstance.get(`/account/${import.meta.env.VITE_TMDB_ID}`).then((res) => {

            console.log(res.data);
            setUser(res.data)


        });

    }, [])


    return (
        <userCTX.Provider value={{ user, setUser }}>
            {/* app */}
            {children}
        </userCTX.Provider>
    );
};

export function useUser() {
    const context = useContext(userCTX);

    if (!context) {
        throw new Error("useTheme must be used within a UserProvider");
    }

    return context;
}

export default UserProvider;
