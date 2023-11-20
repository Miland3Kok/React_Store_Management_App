import {FormControl, FormControlLabel, FormGroup, Switch} from "@mui/material";
import {useContext} from "react";
import ManagerContext, {IManagerContext} from "../context/ManagerContext";

export default function Manager() {
    const {showManager, toggleShowManager} =
        useContext<IManagerContext>(ManagerContext);

    return (
        <div className="Manager">
            <h2>Switch to Manager</h2>
            <FormControl>
                <FormGroup>
                    <FormControlLabel
                        className="fcl"
                        control={<Switch checked={showManager} onChange={toggleShowManager}/>}
                        label="Manager"/>
                </FormGroup>
            </FormControl>
        </div>
    );
}