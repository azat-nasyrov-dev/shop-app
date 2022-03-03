import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {logoutRequest} from '../../../../store/actions/usersActions';

const UserMenu = ({user}) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color="inherit"
      >
        Hello, {user.displayName}!
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My Account</MenuItem>
        <MenuItem onClick={() => dispatch(logoutRequest())}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;