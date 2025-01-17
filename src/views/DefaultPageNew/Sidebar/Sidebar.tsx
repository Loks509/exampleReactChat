//@ts-nocheck временно, надо убирать ошибки
import React, { useEffect, useState } from "react"

import { getMenu } from "../../../core/Api/ApiData/methods/General";
import { Link } from "react-router-dom";

import { List, ListItemButton, ListItemText, Collapse, Divider, Box } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { listItemButtonClasses } from "@mui/material/ListItemButton";

function SidebarMenuItem({ url, name, Menu }) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            {Menu.length != 0 &&
                <>
                    <ListItemButton sx={{ padding: "0.25rem 0.25rem", display: 'flex', justifyContent: 'space-between' }} >
                        <ListItemButton LinkComponent={Link} to={url} target="_blank" sx={{ padding: "0", width: '90%' }}>
                            <ListItemText primary={name} />
                        </ListItemButton>
                        <Box sx={{ width: '15%', height: '1.875rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={handleClick} >
                            {open ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                        </Box>
                    </ListItemButton>

                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List dense sx={{ width: '100%' }} component="div" disablePadding>
                            {Menu.map(item => (
                                <ListItemButton onClick={handleClose} component={Link} to={item.url} target="_blank" key={item.id} sx={{ pl: 2 }}>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                            ))}
                        </List>
                    </Collapse>
                    <Divider sx={{ width: '98%', marginLeft: '1%', borderColor: 'menu.main', position: 'relative', top: '-0.0625rem' }} />
                </ >
            }

            {Menu.length == 0 &&
                <>
                    <ListItemButton LinkComponent={Link} to={url} target="_blank" sx={{ padding: "0.25rem 0.25rem" }}>
                        <ListItemText primary={name} />
                    </ListItemButton>
                    <Divider sx={{ width: '98%', marginLeft: '1%', borderColor: 'menu.main', position: 'relative', top: '-0.0625rem' }} />
                </ >
            }
        </>
    )
}

function Sidebar() {
    const position = 4;
    const position2 = 2;

    const [items, setItems] = useState([]);
    const [items2, setItems2] = useState([]);

    useEffect(() => {
        getMenu(position).then((resp) => {
            setItems(resp.data);
        })
        getMenu(position2).then((resp) => {
            setItems2(resp.data);
        })
    }, []);


    return (
        <List dense
            sx={{
                width: {
                    xs: "92vw",
                    sm: "18rem",
                    md: "18rem",
                    lg: "18rem",
                    xl: "18rem"
                },
                minWidth: "auto",
                // maxWidth: '18rem',
                padding: {
                    md: "1rem 0 0 0.5rem",
                    lg: "1rem 0 0 0.5rem",
                    xl: "1rem 0 0 0.5rem"
                },

                [`& .${listItemButtonClasses.root}:hover`]: {
                    backgroundColor: "menu.main",
                    borderRadius: 1,
                    color: "#272945",
                    // fontWeight: "bold",
                    // "& svg": {
                    //     fill: "#272945"
                    // }
                }
            }}>
            {items.map(itemSidebar => (
                <SidebarMenuItem {...itemSidebar} key={itemSidebar.id} />
            ))}
            {items2.map(item2Sidebar => (
                <SidebarMenuItem {...item2Sidebar} key={item2Sidebar.id} />
            ))}
        </List>
    )
}
export default Sidebar