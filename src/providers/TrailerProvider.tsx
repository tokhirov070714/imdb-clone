import { createContext, useContext, useState } from "react";

const trailerCTX = createContext<any>(null);

interface Props {
    children: React.ReactNode;
}

const TrailerProvider: React.FC<Props> = ({ children }) => {

    const [trailerKey, setTrailerKey] = useState("")


    return (
        <trailerCTX.Provider value={{ trailerKey, setTrailerKey }}>
            {/* app */}
            {children}
        </trailerCTX.Provider>
    );
};

export function useTrailer() {
    const context = useContext(trailerCTX);

    if (!context) {
        throw new Error("useTheme must be used within a TrailerProvider");
    }

    return context;
}

export default TrailerProvider;
