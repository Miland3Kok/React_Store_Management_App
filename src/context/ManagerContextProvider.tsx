import { ReactElement } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import ManagerContext from "./ManagerContext";

interface IWithChildren {
    children: ReactElement | ReactElement[];
}

export default function ManagerContextProvider({ children }: IWithChildren) {
    const [showManager, setShowManager] = useLocalStorage<boolean>(
    "show-manager", true
    );

    const toggleShowManager = () => setShowManager(!showManager);

    return (
        <ManagerContext.Provider
            value={{ showManager: showManager ?? true, toggleShowManager}}>
            {children}
        </ManagerContext.Provider>
    )
}