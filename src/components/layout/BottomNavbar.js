import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import useReactRouter from "use-react-router";

const useStyles = makeStyles(() => ({
  bottomBar: {
    width: "100%",
    overflow: "hidden",
    bottom: 0,
    left: "auto",
    right: 0,
    position: "fixed",
    borderTop: "thin outset"
  }
}));

const BottomNavbar = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { history } = useReactRouter();
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.bottomBar}
    >
      <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
      <BottomNavigationAction
        label="Favorites"
        icon={<FavoriteIcon />}
        onClick={() => history.push("/")}
      />
      <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
    </BottomNavigation>
  );
};

export default BottomNavbar;
