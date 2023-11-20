import "./App.css";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AppBar, FormControlLabel, IconButton, Switch, Toolbar, Typography} from "@mui/material";
import React, {createContext, useEffect, useState} from "react";
import {Afdelingen} from "./components/Afdelingen";
import {Grondplan} from "./components/Grondplan";
import {Navigation} from "./components/Navigation";
import {ProductList} from "./components/ProductList";
import About from "./components/About";
import {ProductDetail} from "./components/ProductDetail";
import {QueryClient, QueryClientProvider} from "react-query";
import Manager from "./components/Manager";
import ManagerContextProvider from "./context/ManagerContextProvider";
import SettingsContextProvider from "./context/SettingsContextProvider";
import Instellingen from "./components/Settings";
import {OverzichtAfdelingen} from "./components/OverzichtAfdelingen";
import {SearchProductGrondplan} from "./components/SearchProductGrondplan";
import useLocalStorage from "./hooks/useLocalStorage";

export const ThemeContext = createContext("light");
axios.defaults.baseURL = "http://localhost:3001";
const queryClient = new QueryClient();

type HeaderProps = {
    onOpenDrawer: () => void;
};

const Header = ({onOpenDrawer}: HeaderProps) => (
    <AppBar position="static" color="transparent">
        <Toolbar sx={{justifyContent: "flex-start"}}>
            <IconButton onClick={onOpenDrawer}>
                <MenuIcon/>
            </IconButton>
            <Typography className="winkelBeheer" variant="h6">Winkelbeheer</Typography>
        </Toolbar>
    </AppBar>
);

function App() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [themeStorage, setThemeStorage] = useLocalStorage<string>("theme", "light");

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    }

    const toggleTheme= () => {
        setThemeStorage((themeStorage === "dark" ? "light" : "dark"));
        console.log(themeStorage);
    }

    useEffect(() => {
        function getBackgroundColor() {
            if (themeStorage === "dark") {
                return "#404258";
            } else
                return "#f3ebf6";
        }
        document.body.style.background = getBackgroundColor();
    });

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeContext.Provider value={themeStorage!}>
                <ManagerContextProvider>
                    <SettingsContextProvider>
                        <div className="App" id={themeStorage!} >
                            <BrowserRouter>
                                <Header onOpenDrawer={handleDrawerToggle}/>
                                <FormControlLabel className={"themeSwitch"}
                                                  sx={{position: "absolute", top: "1px", right: "1em"}}
                                                  control={<Switch checked={themeStorage === "dark"} onClick={toggleTheme}/>}
                                                  label="Donkere modus"/>
                                <Navigation
                                    isOpen={drawerOpen}
                                    onClose={() => setDrawerOpen(false)}/>
                                <Routes>
                                    <Route path="/afdelingen" element={<Afdelingen/>}/>
                                    <Route path="/grondplan/:id" element={<Grondplan/>}/>
                                    <Route path="/grondplan" element={<Grondplan/>}/>
                                    <Route path="/producten" element={<ProductList/>}/>
                                    <Route path="/about" element={<About/>}/>
                                    <Route path="/producten" element={<ProductDetail/>}/>
                                    <Route path="/productdetail/:id" element={<ProductDetail/>}/>
                                    <Route path="/manager" element={<Manager/>}/>
                                    <Route path="/instellingen" element={<Instellingen/>}/>
                                    <Route path="/overzichtAfdelingen" element={<OverzichtAfdelingen/>}/>
                                    <Route path="/searchProduct/:id" element={<SearchProductGrondplan/>}/>
                                    <Route path="/" element={<Afdelingen/>}/>
                                </Routes>
                            </BrowserRouter>
                        </div>
                    </SettingsContextProvider>
                </ManagerContextProvider>
            </ThemeContext.Provider>
        </QueryClientProvider>
    )
}

export default App;
