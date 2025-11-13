import { createContext, useContext, useEffect, useState } from "react";

const themeCTX = createContext<any>(null);

interface Props {
    children: React.ReactNode;
}

const ThemeProvider: React.FC<Props> = ({ children }) => {

    const [theme, setTheme] = useState<string>(() => {

        const saved = localStorage.getItem("theme")
        
        if (saved) {

            try {

                console.log(saved);
                
                return JSON.parse(saved)

            } catch {

                return "light"

            }

        }

        return "light"
    })

    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(theme));
    }, [theme]);

    return (
        <themeCTX.Provider value={{ theme, setTheme }}>
            {/* app */}
            {children}
        </themeCTX.Provider>
    );
};

export function useTheme() {
    const context = useContext(themeCTX);

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
}

export default ThemeProvider;
