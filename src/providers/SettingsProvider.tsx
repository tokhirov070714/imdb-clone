import { createContext, useContext, useState } from "react";

const settingsCTX = createContext<any>(null);

interface Props {
    children: React.ReactNode;
}

const SettingsProvider: React.FC<Props> = ({ children }) => {

    const [lang, setLang] = useState("eng")
    const [region, setRegion] = useState("RU")


    return (
        <settingsCTX.Provider value={{ lang, region, setLang, setRegion }}>
            {/* app */}
            {children}
        </settingsCTX.Provider>
    );
};

export function useSettings() {
    const context = useContext(settingsCTX);

    if (!context) {
        throw new Error("useTheme must be used within a SettingsProvider");
    }

    return context;
}

export default SettingsProvider;
