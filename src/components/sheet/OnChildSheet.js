/*
import React, { Fragment, useContext, createContext } from "react";
import { ContextSheet, ContextOpen, ContextOneChild } from "../../pages/home";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(() => ({
  childSheet: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  childContent: {
    display: "flex",
    flexDirection: "column",
    padding: "8px 8px",
    width: "33%",
    boxSizing: "border-box",
    textAlign: "left",
  },
}));

const OnChildSheet = () => {
  const classes = useStyles();
  const childSheets = useContext(ContextSheet);
  const [open, setOpen] = useContext(ContextOpen);
  const [setChildData] = useContext(ContextOneChild);
  if (childSheets) {
    console.log(childSheets);
    const renderCS = childSheets.map((childSheet) => {
      const {
        groupName,
        tenantName,
        staffName,
        address,
        tel,
        email,
        isWork,
      } = childSheet;
      const Name = () => {
        if (groupName) {
          return (
            <Typography fullWidth variant="contained">
              グループ名:{groupName}
            </Typography>
          );
        } else if (tenantName) {
          return (
            <Typography fullWidth variant="contained">
              店舗名:{tenantName}
            </Typography>
          );
        } else if (staffName) {
          return (
            <Typography fullWidth variant="contained">
              スタップ名{staffName}
            </Typography>
          );
        }
      };
      const SubmitBtn = () => {
        if (groupName) {
          return (
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                setChildData(childSheet);
                setOpen(!open);
              }}
            >
              勤怠管理
            </Button>
          );
        } else if (tenantName) {
          return (
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                setChildData(childSheet);
                setOpen(!open);
              }}
            >
              勤怠管理
            </Button>
          );
        } else if (staffName) {
          return (
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                setChildData(childSheet);
                setOpen(!open);
              }}
            >
              勤怠管理
            </Button>
          );
        }
      };

      return isWork === "onWork" ? (
        <Box className={classes.childContent}>
          {Name()}
          <Typography fullWidth variant="contained">
            住所:{address}
          </Typography>
          <Typography fullWidth variant="contained">
            電話番号:{tel}
          </Typography>
          <Typography fullWidth variant="contained">
            メール:{email}
          </Typography>
          {SubmitBtn()}
        </Box>
      ) : null;
    });
    return <Box className={classes.childSheet}>{renderCS}</Box>;
  } else return null;
};

export default OnChildSheet;
*/
