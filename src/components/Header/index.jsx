import { Badge, Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, CheckCircle, Close, ShoppingCart } from '@material-ui/icons';
import CodeIcon from '@material-ui/icons/Code';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import { cartItemCountSelector, showMiniCartSelector } from 'features/Cart/selectors';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import { hideMiniCart } from 'features/Cart/cartSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  },

  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  userIcon: {
    position: 'relative',
  },
  userMenu: {
    position: 'absolute',
    top: theme.spacing(6),
  },
  cartIcon: {
    position: 'relative',
  },
  cartMenu: {
    position: 'absolute',
    top: '60px',
  },
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export default function Header() {
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;

  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorMiniCartEl, setAnchorMiniCartEl] = useState(null);

  const cartItemCount = useSelector(cartItemCountSelector);
  const isShowMiniCart = useSelector(showMiniCartSelector);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      // Set 'open' to false, however you would do that with your particular code.
      setOpen(false);
    }
  };

  const handleCloseMiniCart = (e) => {
    e.stopPropagation();
    dispatch(hideMiniCart());
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
  };

  const handleCartClick = (e) => {
    history.push('/carts');
    dispatch(hideMiniCart());
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <CodeIcon className={classes.menuButton} />
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/">
              HP Shop
            </Link>
          </Typography>

          <NavLink className={classes.link} to="/todos">
            <Button color="inherit">Todos</Button>
          </NavLink>
          <NavLink className={classes.link} to="/albums">
            <Button color="inherit">Albums</Button>
          </NavLink>
          <NavLink className={classes.link} to="/products">
            <Button color="inherit">Product</Button>
          </NavLink>
          {!isLoggedIn && (
            <Button color="inherit" onClick={handleClickOpen}>
              Login
            </Button>
          )}
          {isLoggedIn && (
            <IconButton className={classes.userIcon} color="inherit" onClick={handleMenuClick}>
              <AccountCircle />
            </IconButton>
          )}

          <IconButton
            className={classes.cartIcon}
            aria-label="show 4 new mails"
            color="inherit"
            onClick={handleCartClick}
          >
            <Badge overlap="rectangular" badgeContent={cartItemCount} color="secondary">
              <ShoppingCart />
              <Menu
                className={classes.cartMenu}
                id="simple-menu"
                anchorEl={anchorMiniCartEl}
                keepMounted
                open={Boolean(isShowMiniCart)}
                onClose={handleCloseMiniCart}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                getContentAnchorEl={null}
              >
                <MenuItem onClick={(e) => e.stopPropagation()}>
                  <CheckCircle />
                  <Typography>Thêm sản phầm vào giỏ hàng thành công</Typography>
                  <Button onClick={handleCloseMiniCart}>
                    <CloseIcon />
                  </Button>
                </MenuItem>

                <MenuItem onClick={handleCartClick}>
                  <Button>Xem giỏ hàng và thanh toán</Button>
                </MenuItem>
              </Menu>
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        className={classes.userMenu}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <IconButton className={classes.closeIcon} onClick={handleClose}>
          <Close />
        </IconButton>

        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already have account? Login here
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Do not have an account? Sign up here
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
            Cancel
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
