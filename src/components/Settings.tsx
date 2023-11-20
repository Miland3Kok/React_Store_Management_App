import {Button, FormControl, FormControlLabel, FormGroup, Switch} from "@mui/material";
import {useContext, useState} from "react";
import ManagerContext, {IManagerContext} from "../context/ManagerContext";
import SettingsContext, {ISettingsContext} from "../context/SettingsContext";
import {BlockPicker, SketchPicker} from "react-color";
import "./Settings.css";

export default function Instellingen() {
    const {showName, toggleShowNames} = useContext<ISettingsContext>(SettingsContext);
    const {showPrice, toggleShowPrice} = useContext<ISettingsContext>(SettingsContext);
    const {showPromo, toggleShowPromo} = useContext<ISettingsContext>(SettingsContext);
    const {showPositie, toggleShowPositie} = useContext<ISettingsContext>(SettingsContext);
    const {colorIv, setColorIv} = useContext<ISettingsContext>(SettingsContext);
    const {colorW, setColorW} = useContext<ISettingsContext>(SettingsContext);
    const {colorNiv, setColorNiv} = useContext<ISettingsContext>(SettingsContext);
    const [showColorPicker, setShowColorPicker] = useState(false);

    function handleiv() {
        if (showColorPicker) {
            setShowColorPicker(false);
        } else {
            setShowColorPicker(true);
        }
    }

    return (
        <div className="settings">
            <h2 className="h2dark">Settings</h2>
            <FormControl>
                <FormGroup>
                    <FormControlLabel
                        className="fcl"
                        control={<Switch checked={showName} onChange={toggleShowNames}/>}
                        label="Toon namen"/>
                    <FormControlLabel
                        className="fcl"
                        control={<Switch checked={showPrice} onChange={toggleShowPrice}/>}
                        label="Toon prijzen"/>
                    <FormControlLabel
                        className="fcl"
                        control={<Switch checked={showPromo} onChange={toggleShowPromo}/>}
                        label="Toon promotie"/>
                    <FormControlLabel
                        className="fcl"
                        control={<Switch checked={showPositie} onChange={toggleShowPositie}/>}
                        label="Toon positie"/>
                    <Button onClick={handleiv} variant="contained">Verander kleuren grondplan</Button>
                    {showColorPicker &&
                        <div className="colorpickers">
                            <div className="colorPicker">
                                <h2 className="message">Voorraad: </h2>
                                <BlockPicker
                                    color={colorIv}
                                    onChangeComplete={ color => {setColorIv(color.hex)}}/>
                            </div>
                            <div className="colorPicker">
                                <h2 className="message">Waarschuwing: </h2>
                                <BlockPicker
                                    color={colorW}
                                    onChangeComplete={ color => {setColorW(color.hex)}}/>
                            </div>
                            <div className="colorPicker">
                                <h2 className="message">Voorraad op: </h2>
                                <BlockPicker
                                    color={colorNiv}
                                    onChangeComplete={ color => {setColorNiv(color.hex)}}/>
                            </div>
                        </div>
                    }
                </FormGroup>
            </FormControl>
        </div>
    );
}