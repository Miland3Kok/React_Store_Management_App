import {createContext} from 'react';

export interface ISettingsContext {
    showName: boolean;
    showPrice: boolean;
    showPromo: boolean;
    showPositie: boolean;
    theme: boolean;
    colorIv: string;
    colorW: string;
    colorNiv: string;
    toggleShowNames: () => void;
    toggleShowPrice: () => void;
    toggleShowPromo: () => void;
    toggleShowPositie: () => void;
    toggleTheme: () => void;
    setColorIv: (color: string) => void;
    setColorW: (color: string) => void;
    setColorNiv: (color: string) => void;
}

export default createContext<ISettingsContext>({
    showName: false,
    showPrice: false,
    showPromo: false,
    showPositie: false,
    theme: false,
    colorIv: '#abf7b1',
    colorW: '#f7f7b1',
    colorNiv: '#f7b1b1',
    toggleShowNames: () => {},
    toggleShowPrice: () => {},
    toggleShowPromo: () => {},
    toggleShowPositie: () => {},
    toggleTheme: () => {},
    setColorIv: (color: string) => {},
    setColorW: (color: string) => {},
    setColorNiv: (color: string) => {},

});