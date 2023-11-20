import { ReactElement } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import SettingsContext from "./SettingsContext";

interface IWithChildren {
  children: ReactElement | ReactElement[];
}

export default function SettingsContextProvider({ children }: IWithChildren) {
  const [showName, setShowName] = useLocalStorage<boolean>(
    "show-names",
    true
  );
  const [showPrice, setShowPrice] = useLocalStorage<boolean>(
    "show-price",
    true
    );
  const [showPromo, setShowPromo] = useLocalStorage<boolean>(
      "show-promo",
      true
  );

  const [showPositie, setShowPositie] = useLocalStorage<boolean>(
      "show-positie",
  true
  );

  const [theme, setTheme] = useLocalStorage<boolean>(
        "theme",
        true
  );

  const [colorIv, setColorIv] = useLocalStorage<string>(
        "colorIv",
      "#abf7b1"
    );

  const [colorW, setColorW] = useLocalStorage<string>(
        "colorW",
        "#f7f7b1"
    );

  const [colorNiv, setColorNiv] = useLocalStorage<string>(
        "colorNiv",
          "#f7b1b1"
    );

  const toggleShowNames = () => setShowName(!showName);
  const toggleShowPrice = () => setShowPrice(!showPrice);
  const toggleShowPromo = () => setShowPromo(!showPromo);
  const toggleShowPositie = () => setShowPositie(!showPositie);
  const changeColorIv = (color: string) => setColorIv(color);
  const changeColorW = (color: string) => setColorW(color);
  const changeColorNiv = (color: string) => setColorNiv(color);
  const toggleTheme = () => setTheme(!theme);

  return (
    <SettingsContext.Provider
      value={{
        showName: showName ?? true, toggleShowNames,
        showPrice: showPrice ?? true, toggleShowPrice,
        showPromo: showPromo ?? true, toggleShowPromo,
        showPositie: showPositie ?? true, toggleShowPositie,
        theme: theme ?? true, toggleTheme,
        colorIv: colorIv ?? "#abf7b1", setColorIv: changeColorIv,
        colorW: colorW ?? "#f7f7b1", setColorW: changeColorW,
        colorNiv: colorNiv ?? "#f7b1b1", setColorNiv: changeColorNiv,}}
    >
      {children}
    </SettingsContext.Provider>
  );
}