import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate, Link } from "react-router-dom";
// import 'react-pro-sidebar/dist/css/styles.css';
import { Box, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaymentsIcon from "@mui/icons-material/Payments";
import LoginIcon from "@mui/icons-material/Login";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClick = () => {
    console.log(title);
    setSelected(title);
  };

  return (
    <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
      <MenuItem
        active={selected === title}
        onClick={handleClick} // Invoke the handleClick function
        icon={icon}
      >
        <Typography color={colors.gray[100]}>{title}</Typography>
      </MenuItem>
    </Link>
  );
};

const SidebarComp = () => {
  const { auth, logout } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  // eslint-disable-next-line
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate("/login"); // Redirect to login page after logout
  };

  const isLoggedIn = auth && auth.customer_id;
  const isAdmin = !!auth && auth.is_admin === 1;

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[700]} !important`,
        },
        "& .pro-icon-wrapper": { backgroundColor: "transparent !important" },
        "& .pro-inner-item": { padding: "5px 35px 5px 20px !important" },
        "& .pro-inner-item:hover": { color: "#868dfb !important" },
        "& .pro-menu-item.active": { color: "#6870fa !important" },
      }}
    >
      <Sidebar collapsed={isCollapsed} style={{ height: "100vh" }}>
        <Menu iconShape="square">
          {!isCollapsed && (
            <Box mb="1.5rem">
              <Box textAlign="center">
                <Typography
                  variant="h1"
                  color={colors.gray[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {isLoggedIn ? auth.fullname : "Welcome"}
                </Typography>
                {isLoggedIn && (
                  <Typography variant="h5" color={colors.greenAccent[400]}>
                    {auth.username}
                  </Typography>
                )}
              </Box>
            </Box>
          )}

          <Box marginLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {isLoggedIn && (
              <>

                <Item
                  title="Create Account"
                  to="/create-account"
                  icon={<AddCircleOutlineIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Update Profile"
                  to="/profile"
                  icon={<PersonOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Send Money"
                  to="/send-money"
                  icon={<AttachMoneyIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Pay Loan"
                  to="/pay-loan"
                  icon={<PaymentsIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}

            {isLoggedIn && isAdmin && (
              <Item
                title="Manage Access"
                to="/admin"
                icon={<PeopleIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}

            {isLoggedIn ? (
              <MenuItem icon={<LogoutIcon />}>
                <Button onClick={handleLogout} color="inherit">
                  Logout
                </Button>
              </MenuItem>
            ) : (
              <Item
                title="Login"
                to="/login"
                icon={<LoginIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarComp;
