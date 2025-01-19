import HeaderBreadcrumbs from "../breadcrumbs/HeaderBreadcrumbs";

import Auth from "../../UIpack/auth/Auth";

import { AppBar, Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";

import Setting from "../Setting/Setting";


function Header() {
  const themeMobile = useTheme();
  const isMobile = useMediaQuery(themeMobile.breakpoints.down('md'));

  return (
    <AppBar>
      <Toolbar>

        <Box
          sx={{
            display: {
              xs: "flex",
              sm: "flex",
              md: "flex",
              lg: "flex",
              xl: "flex",
            },
            alignItems: "center",
            justifyContent: "start",
            flexGrow: 1,
          }}>
          <HeaderBreadcrumbs />
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          {!isMobile &&
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "right",
                maxWidth: "100%"
              }}>
              <Auth />
              <Setting />
            </Box>
          }
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;