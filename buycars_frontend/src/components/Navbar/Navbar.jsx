import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { theme } from "../../Utils/Theme";
import { MainContext } from "../../Context/MinContext";
import { getToken, removeToken } from "../../Utils/storeToken";
import { useNavigate } from "react-router-dom";
import GarageIcon from '@mui/icons-material/Garage';
function Navbar() {
  const { isAuth, setisAuth } = useContext(MainContext);
  const navigate = useNavigate();
  const secureToken = getToken("token");

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logout = () => {
    removeToken("token")
    removeToken("user")
    handleCloseUserMenu();
    setisAuth(false);
    navigate("/signin");
  };
  return (
    <Box
      themeprovider={theme}
      sx={{
        width: "100%",
        height: 50,
        backgroundColor: "#009688",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingX: "20px",
        boxSizing: "border-box",
      }}
    >
      <div className="brandName" onClick={ ()=>navigate("/")}> <GarageIcon/> Buycars.com</div>
      <div>
        {" "}
        {/* <PersonIcon /> */}
        {isAuth && (
          <Tooltip title="profile">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar>
                <PersonIcon color="white" />
              </Avatar>
            </IconButton>
          </Tooltip>
        )}
        <Menu
          sx={{ mt: "35px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem key={"x"} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">UserName</Typography>
          </MenuItem>

          <MenuItem key={"y"} onClick={logout}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </div>
    </Box>
  );
}

export default Navbar;
