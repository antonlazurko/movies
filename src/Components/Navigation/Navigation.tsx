import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import CloseIcon from "@material-ui/icons/Close";

import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseContext } from "../../index";
import styles from "./Navigation.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "10px",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    padding: "0 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rootMobile: {
    flexDirection: "column",
    justifyContent: "center",
  },
  menu: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  userMenuMobile: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  button: { margin: theme.spacing(1), marginLeft: "10px", fill: "black" },
}));
const Navigation = () => {
  const { auth } = useContext(FirebaseContext);
  const [showMenu, setShowMenu] = useState(false);
  const mobileScreen = useMediaQuery("(max-width:767px)");
  const tabletScreen = useMediaQuery("(min-width:768px)");
  const desktopScreen = useMediaQuery("(min-width:1024px)");

  const [user] = useAuthState(auth);
  const classes = useStyles();
  const greatingName = user?.displayName?.split(" ")[0];

  const handlerExitBtn = () => {
    auth.signOut();
  };

  return (
    <nav className={styles.nav}>
      {mobileScreen && (
        <AppBar position="relative" className={styles.AppBar}>
          <Toolbar
            variant="regular"
            className={`${classes.root} ${classes.rootMobile}`}
          >
            <IconButton
              onClick={() => setShowMenu(!showMenu)}
              className={styles.menuListBtn}
            >
              {showMenu ? (
                <CloseIcon className={styles.menuListBtn} />
              ) : (
                <MenuIcon className={styles.menuListBtn} />
              )}
            </IconButton>
            {showMenu ? (
              <>
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.menu}
                >
                  <NavLink
                    exact
                    to="/"
                    onClick={() => setShowMenu(!showMenu)}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                  >
                    Trendings
                  </NavLink>

                  <NavLink
                    to="/movies"
                    className={styles.link}
                    activeClassName={styles.activeLink}
                    onClick={() => setShowMenu(!showMenu)}
                  >
                    Search movies
                  </NavLink>

                  {user && (
                    <NavLink
                      to="/favorite"
                      className={styles.link}
                      activeClassName={styles.activeLink}
                      onClick={() => setShowMenu(!showMenu)}
                    >
                      Favorite movies
                    </NavLink>
                  )}
                </Typography>
                <Typography variant="h6" color="inherit">
                  {!user ? (
                    <NavLink
                      to="/login"
                      className={styles.link}
                      activeClassName={styles.activeLink}
                      onClick={() => setShowMenu(!showMenu)}
                    >
                      Login
                    </NavLink>
                  ) : (
                    <Button
                      onClick={handlerExitBtn}
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.button}
                      startIcon={<ExitToAppIcon />}
                    >
                      Exit
                    </Button>
                  )}
                </Typography>
              </>
            ) : (
              <Typography
                variant="h6"
                color="inherit"
                className={classes.userMenuMobile}
              >
                {user && (
                  <div className={classes.userMenuMobile}>
                    <div>{greatingName}</div>
                    <Button
                      onClick={handlerExitBtn}
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.button}
                      startIcon={<ExitToAppIcon />}
                    >
                      Exit
                    </Button>
                  </div>
                )}
              </Typography>
            )}
          </Toolbar>
        </AppBar>
      )}
      {tabletScreen && (
        <AppBar position="relative" className={styles.AppBar}>
          <Toolbar variant="regular" className={classes.root}>
            <Typography variant="h6" color="inherit" className={styles.menu}>
              <NavLink
                exact
                to="/"
                className={styles.link}
                activeClassName={styles.activeLink}
              >
                Trendings
              </NavLink>

              <NavLink
                to="/movies"
                className={styles.link}
                activeClassName={styles.activeLink}
              >
                Search movies
              </NavLink>

              {user && (
                <NavLink
                  to="/favorite"
                  className={styles.link}
                  activeClassName={styles.activeLink}
                >
                  Favorite movies
                </NavLink>
              )}
            </Typography>
            <Typography variant="h6" color="inherit">
              {!user ? (
                <NavLink
                  to="/login"
                  className={styles.link}
                  activeClassName={styles.activeLink}
                >
                  Login
                </NavLink>
              ) : (
                <>
                  {desktopScreen ? (
                    <span>{`Welcome ${user?.displayName}`}</span>
                  ) : (
                    <span>{user?.displayName}</span>
                  )}
                  <Button
                    onClick={handlerExitBtn}
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={classes.button}
                    startIcon={<ExitToAppIcon />}
                  >
                    Exit
                  </Button>
                </>
              )}
            </Typography>
          </Toolbar>
        </AppBar>
      )}
    </nav>
  );
};
export default Navigation;
