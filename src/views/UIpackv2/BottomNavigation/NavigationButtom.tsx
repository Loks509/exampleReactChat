import { useState } from "react";
import { Paper, BottomNavigation } from "@mui/material";

import Auth from "../../UIpack/auth/Auth";
import Setting from "../../DefaultPageNew/Setting/Setting";
import BotNavSite from "../../DefaultPageNew/BotNavSite/BotNavSite";

export default function NavigationButtom() {

    const [value, setValue] = useState();

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10 }} elevation={3} >
            <BottomNavigation
                value={value}
                onChange={(_, newValue) => {
                    setValue(newValue);
                }}
            >
                <BotNavSite />
                <Auth />
                <Setting />
            </BottomNavigation>
        </Paper >
    )
}