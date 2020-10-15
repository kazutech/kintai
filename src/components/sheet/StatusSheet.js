import React, { Fragment, useContext, useState } from "react";
import { ContextSheet, ContextOpen, ContextOneChild,ContextType, ContextChildType } from "../../pages/home";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() => ({
  childSheet: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  active: {
    display: "flex",
    flexDirection: "column",
    padding: "8px 8px",
    width: "33%",
    boxSizing: "border-box",
    textAlign: "left",
    borderWidth: "1px",
    borderColor: "blue"
  },
  inactive: {
    display: "flex",
    flexDirection: "column",
    padding: "8px 8px",
    width: "33%",
    boxSizing: "border-box",
    textAlign: "left",
    borderWidth: "1px",
    borderColor: "red"
  },
  break: {
    display: "flex",
    flexDirection: "column",
    padding: "8px 8px",
    width: "33%",
    boxSizing: "border-box",
    textAlign: "left",
    borderWidth: "1px",
    borderColor: "yellow"
  },
}));

const StatusSheet = () => {
  const classes = useStyles();
  const children = useContext(ContextSheet);
  const typeName = useContext(ContextType)
  const [open, setOpen] = useContext(ContextOpen);
  const [setChildData] = useContext(ContextOneChild);
  const childTypeName = useContext(ContextChildType)

  return children === null
    ? null
    : (<Fragment>
      {children.filter((child) => {
      return child.status === "active"
    }).length === 0 ? null : (<Typography variant="h5">active</Typography>)}
      {children.filter((child) => {
      return child.status === "active"
    }).map((child) => {
        const { userName, address, tel, email, } = child;
        return (
            <Box className={classes.childSheet}>
              <Box className={classes.active}>
                <Typography fullWidth variant="contained">
                  {childTypeName}:{userName}
                </Typography>
                <Typography fullWidth variant="contained">
                  住所:{address}
                </Typography>
                <Typography fullWidth variant="contained">
                  電話番号:{tel}
                </Typography>
                <Typography fullWidth variant="contained">
                  メール:{email}
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    setChildData(child);
                    setOpen(!open);
                  }}
                >
                  勤怠管理
                </Button>
              </Box>
            </Box>
          );
      })}
      {children.filter((child) => {
      return child.status === "inactive"
    })[0].length === 0 ? null : (<Typography variant="h5">inactive</Typography>)}
      {children.filter((child) => {
      return child.status === "inactive"
    }).map((child) => {
        const { userName, address, tel, email, } = child;
        return (
            <Box className={classes.childSheet}>
              <Box className={classes.active}>
                <Typography fullWidth variant="contained">
                  {childTypeName}:{userName}
                </Typography>
                <Typography fullWidth variant="contained">
                  住所:{address}
                </Typography>
                <Typography fullWidth variant="contained">
                  電話番号:{tel}
                </Typography>
                <Typography fullWidth variant="contained">
                  メール:{email}
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    setChildData(child);
                    setOpen(!open);
                  }}
                >
                  勤怠管理
                </Button>
              </Box>
            </Box>
          );
      })}
      {children.filter((child) => {
      return child.status === "break"
    }).length === 0 ? null : (<Typography variant="h5">break</Typography>)}
      {children.filter((child) => {
      return child.status === "break"
    }).map((child) => {
        const { userName, address, tel, email, } = child;
        return (
            <Box className={classes.childSheet}>
              <Box className={classes.active}>
                <Typography fullWidth variant="contained">
                  {childTypeName}:{userName}
                </Typography>
                <Typography fullWidth variant="contained">
                  住所:{address}
                </Typography>
                <Typography fullWidth variant="contained">
                  電話番号:{tel}
                </Typography>
                <Typography fullWidth variant="contained">
                  メール:{email}
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    setChildData(child);
                    setOpen(!open);
                  }}
                >
                  勤怠管理
                </Button>
              </Box>
            </Box>
          );
      })}
      </Fragment>
      )
};

export default StatusSheet;
