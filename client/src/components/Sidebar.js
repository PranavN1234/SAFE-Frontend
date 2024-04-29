
import {useState} from 'react'
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useAuth } from '../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
// import 'react-pro-sidebar/dist/css/styles.css';
import {Box, IconButton, Typography, useTheme, Button} from '@mui/material'
import {Link} from 'react-router-dom'
import {tokens} from "../theme"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PeopleIcon from '@mui/icons-material/People';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const handleClick = () => {
        console.log(title);
        setSelected(title);
    };

    return (

        <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
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


const SidebarComp = () =>{

    const { auth, logout } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [selected, setSelected] = useState("Dashboard")
    const handleLogout = () => {
        logout(); // Call the logout function from AuthContext
        navigate('/login'); // Redirect to login page after logout
    };
    return <Box sx={{"& .pro-sidebar-inner":{
        background: `${colors.primary[700]} !important`}
        , "& .pro-icon-wrapper":{backgroundColor: "transparent !important"},
        "& .pro-inner-item": {padding: "5px 35px 5px 20px !important"},
        "& .pro-inner-item: hover": {color: "#868dfb !important"},
        "& .pro-menu-item.active": {color: "#6870fa !important"}}}>

        <Sidebar collapsed={isCollapsed} style={{ height: '100vh' }}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.gray[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {auth.fullname} is admin: {auth.is_admin}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[400]}>
                  {auth.username}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Create Account"
              to="/create-account"
              icon={<AddCircleOutlineIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
                title="Manage Access"
                 to="/admin"
                 icon={<PeopleIcon />}
                 selected={selected}
                setSelected={setSelected}
                    />

          </Box>

          <MenuItem icon={<ExitToAppIcon />}>
                        <Button onClick={handleLogout} color="inherit">
                            Logout
                        </Button>
                    </MenuItem>
        </Menu>
      </Sidebar>

    </Box>
}

export default SidebarComp;