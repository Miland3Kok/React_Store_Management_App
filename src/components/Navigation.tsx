import {Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import BoardsIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/SettingsApplications";
import AboutIcon from "@mui/icons-material/InfoOutlined";
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import DehazeIcon from '@mui/icons-material/Dehaze';
import ManagerContext from "../context/ManagerContext";
import {useContext} from "react";

interface NavigationProps {
    isOpen: boolean;
    onClose: () => void
}

export function Navigation({isOpen, onClose}: NavigationProps) {
    const {showManager} = useContext(ManagerContext);

    return (
        <div>
            <Drawer className="drawer" open={isOpen} onClose={onClose}>
                {showManager && <List sx={{width: 200}}>
                    {[
                        {label: "Overzicht Afdelingen", link: "/overzichtAfdelingen", icon: <DehazeIcon/>},
                    ].map((menuItem) => (
                        <ListItem className="listI" disableGutters key={menuItem.link}>
                            <ListItemButton component="a" href={menuItem.link}>
                                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                                <ListItemText primary={menuItem.label}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>}
                <Divider/>
                <List sx={{width: 200}}>
                    {[
                        {label: "Afdelingen", link: "/", icon: <BoardsIcon/>},
                        {label: "Producten", link: "/producten", icon: <CategoryIcon/>},
                        {label: "Instellingen", link: "/instellingen", icon: <SettingsIcon/>},
                        {label: "About", link: "/about", icon: <AboutIcon/>},
                        {label: "Manager", link: "/manager", icon: <LogoutIcon/>},
                    ].map((menuItem) => (
                        <ListItem  className="listi"disableGutters key={menuItem.link}>
                            <ListItemButton component="a" href={menuItem.link}>
                                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                                <ListItemText className="litext" primary={menuItem.label}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    )
}
