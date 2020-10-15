import React, { Fragment, useState, createContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Attendance from "../components/attendance/Attendance";
import StatusSheet from "../components/sheet/StatusSheet";
import axios from "axios";
import Clock from "../components/timer/Clock";
import AdminSheet from "../components/sheet/AdminSheet";
import MyCalender from "../components/calendar/Calendar";

const useStyles = makeStyles((theme) => ({
  empList: {
    margin: theme.spacing(1, 0),
  },
  empTitle: {
    padding: theme.spacing(3),
  },
  empContainer: {
    flexDirection: "row",
  },
  empContent: {
    padding: "8px 8px",
    width: "25%",
    boxSizing: "border-box",
    textAlign: "center",
  },
  messages: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(30, 0),
  },
  scheduler: {
    padding: theme.spacing(2, 0),
  },
}));

export const ContextOpen = createContext([null, () => {}]);
export const ContextSheet = createContext([null, () => {}]);
export const ContextOneChild = createContext([null, () => {}]);
export const ContextAdmin = createContext([null, () => {}]);
export const ContextAdminOpen = createContext([null, () => {}]);
export const ContextType = createContext([null, () => {}]);
export const ContextChildType = createContext([null,() => {}]);

const Home = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [children, setChildren] = useState(null);
  const [childClock, setChildClock] = useState(null);
  const [userData, setUserData] = useState(null);
  const [childData, setChildData] = useState(null);
  const [typeName, setTypeName] = useState(null);
  const [childTypeName, setChildTypeName] = useState(null);

  useEffect(() => {
    const getChildSheets = () => {
      axios
        .get("/list")
        .then((res) => {
          console.log(res.data);
          console.log(res.data.children);
          console.log(res.data.userData);
          setUserData(res.data.userData);
          setChildren(res.data.children);
          if (res.data.userData.type) {
            switch (res.data.userData.type) {
              case "organization":
                setTypeName("会社名");
                setChildTypeName("グループ名")
                break;
              case "group":
                setTypeName("グループ名");
                setChildTypeName("店舗名")
                break;
              case "tenant":
                setTypeName("店舗名");
                setChildTypeName("スタッフ名")
                break;
              case "staff":
                setTypeName("スタッフ名");
                break;
              default:
                break;
            }
          }

        })
        .catch((err) => {
          console.error(err);
        });
    };
    getChildSheets();
  }, [open]);

  return (
    <Fragment>
      <ContextAdmin.Provider value={userData}>
        <ContextType.Provider value={typeName}>
          <AdminSheet />
        </ContextType.Provider>
      </ContextAdmin.Provider>
      <Clock />
      <Paper className={classes.empList}>
        {open ? (
          <ContextOneChild.Provider
            value={[childData, childClock, setChildClock]}
          >
            <ContextOpen.Provider value={[open, setOpen]}>
              <Attendance />
            </ContextOpen.Provider>
          </ContextOneChild.Provider>
        ) : (
          <Fragment>
            <Typography
              className={classes.empTitle}
              variant="h4"
              align="center"
            >
              list
            </Typography>
            <ContextOpen.Provider value={[open, setOpen]}>
              <ContextOneChild.Provider value={[setChildData]}>
                <ContextSheet.Provider value={children}>
                  <ContextChildType.Provider value={childTypeName}>
                    <StatusSheet />
                  </ContextChildType.Provider>
                </ContextSheet.Provider>
              </ContextOneChild.Provider>
            </ContextOpen.Provider>
          </Fragment>
        )}
      </Paper>
      <Paper className={classes.scheduler}>
        <Typography>シフト表</Typography>
        <ContextOpen.Provider value={[open, setOpen]}>
          <Fragment>
            <ContextSheet.Provider value={children}>
              <MyCalender />
            </ContextSheet.Provider>
          </Fragment>
        </ContextOpen.Provider>
      </Paper>

      <Paper className={classes.messages}>
        <Typography>Messages</Typography>
      </Paper>
    </Fragment>
  );
};

export default Home;
