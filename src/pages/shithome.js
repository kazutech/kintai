/*
import React, {
  Fragment,
  useState,
  createContext,
  useEffect,
  useRef,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Attendance from "../components/attendance/Attendance";
import OffChildSheet from "../components/sheet/OffChildSheet";
import OnChildSheet from "../components/sheet/OnChildSheet";
import RestChildSheet from "../components/sheet/RestChildSheet";
import axios from "axios";
import Clock from "../components/timer/Clock";
import ParentSheet from "../components/sheet/ParentSheet";
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
export const ContextParent = createContext([null, () => {}]);
export const ContextAdminOpen = createContext([null, () => {}]);

const anotherHome = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [children, setChildren] = useState(null);
  const [childClock, setChildClock] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getChildSheets = () => {
      axios
        .get("/sheets")
        .then((res) => {
          console.log(res.data);
          console.log(res.data.children);
          console.log(res.data.userData);
          setUserData(res.data.userData);
          setChildren(res.data.children);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getChildSheets();
  }, [open]);

  return (
    <Fragment>
      <Fragment>
        <ContextAdmin.Provider value={userData}>
          <AdminSheet />
        </ContextAdmin.Provider>
      </Fragment>
      <Clock />
      <Paper className={classes.empList}>
        {open ? (
          <Fragment>
            <ContextOneChild.Provider
              value={[userData, childClock, setChildClock]}
            >
              <ContextOpen.Provider value={[open, setOpen]}>
                <Attendance />
              </ContextOpen.Provider>
            </ContextOneChild.Provider>
          </Fragment>
        ) : (
          <Fragment>
            <Typography
              className={classes.empTitle}
              variant="h4"
              align="center"
            >
              雇用リスト
            </Typography>
            <Fragment>
              <ContextOpen.Provider value={[open, setOpen]}>
                <Fragment>
                  <ContextOneChild.Provider value={[setUserData]}>
                    <ContextSheet.Provider value={children}>
                      <Typography>稼働中</Typography>
                      <ActiveSheet />
                    </ContextSheet.Provider>
                  </ContextOneChild.Provider>
                </Fragment>
                <Fragment>
                  <ContextOneChild.Provider value={[setUserData]}>
                    <ContextSheet.Provider value={children}>
                      <Typography>休憩中</Typography>
                      <BreakSheet />
                    </ContextSheet.Provider>
                  </ContextOneChild.Provider>
                </Fragment>
                <Fragment>
                  <ContextOneChild.Provider value={[setUserData]}>
                    <ContextSheet.Provider value={children}>
                      <Typography>待機中</Typography>
                      <InactiveSheet />
                    </ContextSheet.Provider>
                  </ContextOneChild.Provider>
                </Fragment>
              </ContextOpen.Provider>
            </Fragment>
          </Fragment>
        )}
      </Paper>
      <Paper className={classes.scheduler}>
        <Typography>シフト表</Typography>
        <Fragment>
          <ContextSheet.Provider value={children}>
            <MyCalender />
          </ContextSheet.Provider>
        </Fragment>
      </Paper>
      <Paper className={classes.messages}>
        <Typography>Messages</Typography>
      </Paper>
    </Fragment>
  );
};
const Home = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [childSheets, setChildSheets] = useState(null);
  const [childData, setChildData] = useState(null);
  const [childClock, setChildClock] = useState(null);
  const [parentData, setParentData] = useState(null);
  const ref = useRef(null);
  const [width, setWidth] = useState(null);
  /*
  const Today = dayjs().format("YYYY年MMMMD日dddd");
  const [nowTime, setNowTime] = useState(dayjs().format("Ah時mm分"));
  const [nowSec, setNowSec] = useState(dayjs().format("ss"));
  ;
  */

/*
  }
  useEffect(() => {
    let unmounted = false;
    const catchTime = async () => {
      await new Promise(r => setInterval(r, 1000));
      if (!unmounted) {
        setNowTime(dayjs().format("Ah時mm分"));
        setNowSec(dayjs().format("ss"));
      }
    };
    catchTime();
    const cleanup = () => {
      unmounted = true;
    };
    return cleanup;
  }, []);
*/
/*
useEffect(() => {
  const getChildSheets = () => {
    axios
      .get("/sheets")
      .then((res) => {
        console.log(res.data);
        console.log(res.data.children);
        console.log(res.data.parent);
        setParentData(res.data.parent);
        setChildSheets(res.data.children);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  getChildSheets();
}, [open]);
*/
/*
  const workingList = (
    <Box display="flex" flexDirection="row" flexWrap="wrap">
      <div className={classes.empContent}>
        <Button fullWidth variant="contained">
          Harry Potter
        </Button>
      </div>
    </Box>
  );

  const waitingList = (
    <Box display="flex" flexDirection="row" flexWrap="wrap">
      <div className={classes.empContent}>
        <Button fullWidth variant="contained" onClick={() => setOpen(!open)}>
          Harry Potter
        </Button>
      </div>
    </Box>
  );
  
  const onChildrenList = (
    <ContextOneChild.Provider value={[setChildData]}>
      <ContextSheet.Provider value={childSheets}>
        <Typography variant="h5">稼働中</Typography>
        <OnChildSheet />
      </ContextSheet.Provider>
    </ContextOneChild.Provider>
  );
  const restChildrenList = (
    <ContextOneChild.Provider value={[setChildData]}>
      <ContextSheet.Provider value={childSheets}>
        <Typography variant="h5">停止中</Typography>
        <RestChildSheet />
      </ContextSheet.Provider>
    </ContextOneChild.Provider>
  );
  const offChildrenList = (
    <ContextOneChild.Provider value={[setChildData]}>
      <ContextSheet.Provider value={childSheets}>
        <Typography variant="h5">待機中</Typography>
        <OffChildSheet />
      </ContextSheet.Provider>
    </ContextOneChild.Provider>
  );
  const shiftSheet = (
    <ContextSheet.Provider value={childSheets}>
      <MyCalender />
    </ContextSheet.Provider>
  );
  return (
    <Fragment>
      <ContextParent.Provider value={parentData}>
        <ParentSheet />
      </ContextParent.Provider>
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
              雇用リスト
            </Typography>
            <ContextOpen.Provider value={[open, setOpen]}>
              {onChildrenList}
              {restChildrenList}
              {offChildrenList}
            </ContextOpen.Provider>
          </Fragment>
        )}
      </Paper>
      <Paper className={classes.scheduler}>
        <Typography variant="h4" align="center">
          シフト表
        </Typography>
        {shiftSheet}
      </Paper>
      <Paper className={classes.messages}>
        <Typography variant="h5">Messages</Typography>
      </Paper>
    </Fragment>
  );
};

export default Home;
*/
