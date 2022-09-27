import React, {useState, createContext, useContext} from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { SandbagContext } from "../App";

export default function Menu(){

  const { loggedInUser } = useContext(SandbagContext)

  const [menuState, setMenuState] = useState(false)

  const navigate = useNavigate()

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setMenuState(prev => !prev);
    };

    const menuList = (
      <Box
        sx={{ width: 200, backgroundColor: '#F1F0CF', height:'100vh' }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <div className="player-profile">
          <div className="pic">
            <img src={require("../smile.png")} alt="" className="menu-pic" />
          </div>
          <div className="name">{loggedInUser.firstName} {loggedInUser.lastName}</div>
        </div>
        <List >
            <ListItem key="account" disablePadding>
              <ListItemButton onClick={()=>navigate("/account")}>
                <ListItemText primary="Account" primaryTypographyProps={{fontFamily: 'Source Sans Pro, sans-serif'}}  />
              </ListItemButton>
            </ListItem>
            <ListItem key="handicap" disablePadding>
              <ListItemButton onClick={()=>navigate("/home")}>
                <ListItemText primary="Handicap" primaryTypographyProps={{fontFamily: 'Source Sans Pro, sans-serif'}} />
              </ListItemButton>
            </ListItem>
            <ListItem key="scores" disablePadding>
              <ListItemButton onClick={()=>navigate("/scores")}>
                <ListItemText primary="Scores" primaryTypographyProps={{fontFamily: 'Source Sans Pro, sans-serif'}} />
              </ListItemButton>
            </ListItem>
            <ListItem key="newRound" disablePadding>
              <ListItemButton onClick={()=>navigate("/newround")}>
                <ListItemText primary="New Round" primaryTypographyProps={{fontFamily: 'Source Sans Pro, sans-serif'}} />
              </ListItemButton>
            </ListItem>
            <ListItem key="stats" disablePadding>
              <ListItemButton disabled>
                <ListItemText primary="Stats" primaryTypographyProps={{fontFamily: 'Source Sans Pro, sans-serif'}} />
                <LockOutlinedIcon />
              </ListItemButton>
            </ListItem>
            <ListItem key="predict" disablePadding>
              <ListItemButton disabled>
                <ListItemText primary="Predict" primaryTypographyProps={{fontFamily: 'Source Sans Pro, sans-serif'}} />
                <LockOutlinedIcon />
              </ListItemButton>
            </ListItem>
          <Divider>
          </Divider>
          <ListItem key="logout" disablePadding>
              <ListItemButton onClick={()=>navigate("/")}>
                <ListItemText primary="Logout" primaryTypographyProps={{fontFamily: 'Source Sans Pro, sans-serif', color: '#4BAEA0'}} />
              </ListItemButton>
          </ListItem>
        </List>
        
      </Box>
    );

  return (
    <div>
      <React.Fragment>
        <IconButton onClick={toggleDrawer(true)}><MenuIcon sx={{fontSize: '1.5em'}}></MenuIcon></IconButton>
        <Drawer
          open={menuState}
          onClose={toggleDrawer(false)}
        >
          {menuList}
        </Drawer>
      </React.Fragment>
    </div>
  )
}