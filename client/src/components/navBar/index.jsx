import React from 'react';
import { useHistory } from 'react-router-dom';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

import MenuButtons from '../menuButtons';
import { navBarStyles } from './styles';
import GlobeImg from '../../images/globe.png';
import { useTranslation } from 'react-i18next';


export default function NavBar(props) {
  const { user } = props;
  const theme = useTheme();
  const { t } = useTranslation(['global']);
  const classes = navBarStyles();
  const history = useHistory();
  const under600px = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuButtons = [t('Nav.destinations'), t('Nav.offers'), t('Nav.aboutUs')];

  const handleLinkClick = (e, id) => {
    return history.push(`/${id}`);
  };

  const handleAppReset = (e) => {
    history.go(0);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Link target="_blank" rel="noopener" href="#">
          <Avatar
            alt={''}
            src={GlobeImg}
            className={classes.logoLarge}
          />
        </Link>
        <Divider
          variant="middle"
          className={classes.divider}
          style={{ marginRight: 30 }}
          orientation="vertical"
          flexItem
        />

        {!under600px && (
          <Box display="flex" flexGrow={1}>
            <MenuButtons
              children={menuButtons}
              variant="outlined"
              color="primary"
              handleClick={handleLinkClick}
            />
          </Box>
        )}
        <div>
          <Box component="div" display="flex" alignItems="center">
            <Divider
              variant="middle"
              className={classes.divider}
              orientation="vertical"
              flexItem
            />
            <Typography
              variant="h6"
              style={{
                color: 'white',
                fontSize: '1.1rem',
              }}
            >
              Hola {user.userName}!
            </Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {/* //TODO: implement profilePic */}
              <Avatar
                className={classes.avatar}
                // alt={user.userName || 'Nelson Avatar'}
                src={'/broken.jpg'}
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              classes={{ paper: classes.customPopover }}
              keepMounted
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleAppReset}
                style={{ placeContent: 'center' }}
              >
                Reiniciar
              </MenuItem>
            </Menu>
          </Box>
        </div>
      </Toolbar>
    </AppBar>
  );
}
