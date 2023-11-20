import {createContext} from 'react';

export interface IManagerContext {
    showManager: boolean;
    toggleShowManager: () => void;
}

export default createContext<IManagerContext>({
    showManager: false,
    toggleShowManager: () => {}
});