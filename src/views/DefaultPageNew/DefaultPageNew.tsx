import Header from "./header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import { Box, Container, Toolbar } from "@mui/material";


function DefaultPageNew() {
    return (
        <Box>
            <Header />
            <Box>
                <Container>
                    <Toolbar />
                    <Outlet />
                    <Footer />
                </Container>
            </Box>
        </Box>
    )
}
export default DefaultPageNew