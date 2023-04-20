import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { GanyContext } from "../../Contexts/GanyContext";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import "./MiniDrawer.css";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  })
);

export default function MiniDrawer({
  setMentorList,
  setStudentList,
  setProfile,
  setCreateRegester,
  setFeedbackList,
  profile,
  studentList,
  mentorList,
  createRegester,
  feedbackList,
}) {
  const { getAdminsAllMentor, getAdminsAllStudents, getFeedbacks, getAdminsGroups } =
    useContext(GanyContext);

  useEffect(() => {
    getAdminsAllMentor();
    getAdminsAllStudents();
  }, []);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Bu fonksiyonlar asida barda tiklanan icerigin sag tarafa render adilmesini saglar
  const renderProfil = () => {
    getAdminsAllMentor();
    getAdminsAllStudents();
    setMentorList(false);
    setStudentList(false);
    setProfile(true);
    setCreateRegester(false);
    setFeedbackList(false);
  };
  const renderCreateRegester = () => {
    getAdminsAllMentor();
    getAdminsGroups();
    setMentorList(false);
    setStudentList(false);
    setProfile(false);
    setCreateRegester(true);
    setFeedbackList(false);
  };
  const renderStudentList = () => {
    getAdminsAllStudents();
    setMentorList(false);
    setStudentList(true);
    setProfile(false);
    setCreateRegester(false);
    setFeedbackList(false);
  };
  const renderMentorList = () => {
    getAdminsAllMentor();
    setMentorList(true);
    setStudentList(false);
    setProfile(false);
    setCreateRegester(false);
    setFeedbackList(false);
  };
  const renderFeedbackList = () => {
    getFeedbacks();
    setMentorList(false);
    setStudentList(false);
    setProfile(false);
    setCreateRegester(false);
    setFeedbackList(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        className="appbar-div"
        position="fixed"
        open={open}
        style={{
          position: "fixed",
          top: 57,
          backgroundColor: "#fdfcdc",
          color: "#00afb9",
          height: "40px",
          justifyContent: "center",
        }}
      >
        <Toolbar className="toolbar-div">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <i className="fa-solid fa-user-tie pe-2"></i> Yönetim Paneli
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader style={{ position: "fixed", top: "200px" }}>
          <IconButton
            style={{
              position: "fixed",
              top: "69px",
              left: "206px",
              backgroundColor: "#fff",
              color: "#00afb9",
              width: "30px",
              height: "30px",
            }}
            onClick={handleDrawerClose}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon className="righicon-div" />
            ) : (
              <ChevronLeftIcon className="lefticon-div" />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List className="list-div">
          {/* {["Profil", "Yeni Kayıt Oluştur", "Öğrenciler", "Mentörler", "Gelen Emailler"].map(
            (text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }} 
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index === 0 && <i className="fs-5 text-white fa-solid fa-people-roof"></i>}
                    {index === 1 && <i className="fs-5 text-white fa-solid fa-address-card"></i>}
                    {index === 2 && <i className="fs-5 text-white fa-solid fa-people-group"></i>}
                    {index === 3 && <i className="fs-5 text-white fa-solid fa-user-plus"></i>}
                    {index === 4 && <i className="fs-5 text-white fa-solid fa-comments"></i>}
                  </ListItemIcon>
                  <ListItemText
                    style={{ fontSize: "15px" }}
                    primary={text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            )
          )} */}
          <ListItem onClick={renderProfil} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <i className="fs-5 text-white fa-solid fa-address-card"></i>
              </ListItemIcon>
              <ListItemText
                style={{ fontSize: "15px" }}
                primary={"Profil"}
                sx={{ opacity: open ? 1 : 0 }}
              >
                Profil
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem onClick={renderCreateRegester} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <i className="fs-5 text-white fa-solid fa-user-plus"></i>
              </ListItemIcon>
              <ListItemText
                style={{ fontSize: "15px" }}
                primary={"Yeni Kayit Oluştur"}
                sx={{ opacity: open ? 1 : 0 }}
              >
                Yeni Kayit Oluştur
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem onClick={renderStudentList} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <i className="fs-5 text-white fa-solid fa-people-roof"></i>
              </ListItemIcon>
              <ListItemText
                style={{ fontSize: "15px" }}
                primary={"Öğrenciler"}
                sx={{ opacity: open ? 1 : 0 }}
              >
                Öğrenciler
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem onClick={renderMentorList} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <i className="fs-5 text-white fa-solid fa-people-group"></i>
              </ListItemIcon>
              <ListItemText
                style={{ fontSize: "15px" }}
                primary={"Mentörler"}
                sx={{ opacity: open ? 1 : 0 }}
              >
                Mentörler
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem onClick={renderFeedbackList} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <i className="fs-5 text-white fa-solid fa-comments"></i>
              </ListItemIcon>
              <ListItemText
                style={{ fontSize: "15px" }}
                primary={"Gelen Emailler"}
                sx={{ opacity: open ? 1 : 0 }}
              >
                Gelen Emailler
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box> */}
    </Box>
  );
}
