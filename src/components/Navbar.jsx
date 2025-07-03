import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Box,
  IconButton,
} from "@mui/material";
import { Backpack } from "lucide-react";

function Navbar({ tab, setTab }) {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffffff",
        boxShadow: 1,
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="small" color="primary">
            <Backpack />
          </IconButton>
        </Box>

        <Typography
          variant="h6"
          color="primary"
          sx={{ fontWeight: "bold", flexGrow: 1, textAlign: "center" }}
        >
          Template Builder
        </Typography>

        <Tabs
          value={tab}
          onChange={(e, val) => setTab(val)}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Form Builder" />
          <Tab label="Preview" />
          <Tab label="Fill Form" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
