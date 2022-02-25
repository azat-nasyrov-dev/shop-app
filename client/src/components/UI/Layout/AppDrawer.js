import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {fetchCategories} from "../../../store/actions/categoriesActions";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

const AppDrawer = () => {
  const params = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Drawer
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      variant="permanent"
      open
    >
      <Toolbar/>
      <MenuList>
        <MenuItem
          component={Link}
          to="/"
          selected={!params.id}
        >
          All products
        </MenuItem>
        {categories.map(category => (
          <MenuItem
            key={category._id}
            component={Link}
            to={`/category/${category._id}`}
            selected={category._id === params.id}
          >
            {category.title}
          </MenuItem>
        ))}
      </MenuList>
    </Drawer>
  );
};

export default AppDrawer;