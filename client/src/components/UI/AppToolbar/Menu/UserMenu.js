import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import {logoutRequest} from '../../../../store/actions/usersActions';
import IconButton from '@material-ui/core/IconButton';
import {apiURL} from '../../../../config';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  }
}));

const UserMenu = ({user}) => {
  const classes = useStyles();
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
      <IconButton
        onClick={handleClick}
        color="inherit"
      >
        {user.avatar ?
          <Avatar
            src={apiURL + '/' + user.avatar}
            className={classes.avatar}
          />
          : <Avatar className={classes.avatar}/>
        }
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disabled>{user.displayName}</MenuItem>
        <MenuItem>Profile</MenuItem>
        <MenuItem>My Account</MenuItem>
        <MenuItem onClick={() => dispatch(logoutRequest())}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;