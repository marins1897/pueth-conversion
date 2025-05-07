import { AppBar, Toolbar, Typography } from "@mui/material";

export const HeaderBar = () => (
  <AppBar position="fixed" color="primary" enableColorOnDark>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        pufETH Conversion Tracker
      </Typography>
    </Toolbar>
  </AppBar>
);
