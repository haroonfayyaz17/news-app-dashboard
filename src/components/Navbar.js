import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

import NYTimesLogo from "../assets/imgs/ny-times-logo.png";

const pages = ["Arts", "Science", "Business", "Fashion", "Food", "Health"];

function ResponsiveAppBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            alt="NY Times Logo"
            src={NYTimesLogo}
            width="30"
            height="30"
            className="m-4"
          />
          <Typography variant="h5" noWrap href="/" className="m-4">
            NY Times
          </Typography>

          <Box
            sx={{
              marginLeft: "100px",
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                href={`/${page.toLowerCase()}`}
                key={page}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
