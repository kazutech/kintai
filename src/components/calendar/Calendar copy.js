import React, { useState, useEffect, useContext, Fragment } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { ContextSheet } from "../../pages/home";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { TimePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "moment/locale/ja";
import CalendarToolbar from "../../util/calendarToolbar";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

const useStyles = makeStyles(() => ({
  formControl: {
    width: "100%",
  },
  shiftInput: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shiftBtn: {
    marginTop: 20,
    position: "relative",
  },
}));

const events = [
  {
    id: 0,
    title: "Board meeting",
    start: new Date(2018, 0, 29, 9, 0, 0),
    end: new Date(2018, 0, 29, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 1,
    title: "MS training",
    allDay: true,
    start: new Date(2018, 0, 29, 14, 0, 0),
    end: new Date(2018, 0, 29, 16, 30, 0),
    resourceId: 2,
  },
  {
    id: 2,
    title: "Team lead meeting",
    start: new Date(2018, 0, 29, 8, 30, 0),
    end: new Date(2018, 0, 29, 12, 30, 0),
    resourceId: 3,
  },
  {
    id: 11,
    title: "Birthday Party",
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 4,
  },
];

const localizer = momentLocalizer(moment);

moment.locale("ja");

const MyCalendar = () => {
  const classes = useStyles();
  const [Events, setEvents] = useState(null);
  const [newEvents, setNewEvents] = useState([]);
  const [submitName, setSubmitName] = useState("");
  const childSheets = useContext(ContextSheet);
  const [childName, setChildname] = useState("");
  const [selectedStartDate, handleStartDateChange] = useState(new Date());
  const [selectedEndDate, handleEndDateChange] = useState(new Date());
  const [jobName, setJobName] = useState("");
  useEffect(() => {
    const getEvents = () => {
      axios.get("/events").then((res) => {
        setEvents(res.data.events);
      });
    };
  }, []);

  const handleNameChange = (e) => {
    setSubmitName(e.target.value);
  };

  const handleJobNameChange = (e) => {
    setJobName(e.target.value);
  };

  let nameWithIds = [];
  const makeTimelineVisible = () => {
    axios
      .get("/calendar")
      .then((res) => {
        console.log(res.data.timeline);
        let events = [];
        let oneEvent;

        let timeline;
        timeline = res.data.timeline;
        console.log(timeline);

        let eachUserData;
        let eachTimeline;
        for (let i = 0; i < nameAndIds.length; i++) {
          oneEvent = {};
          eachUserData = timeline.filter((element) => {
            return (
              (element.groupName || element.tenantName || element.staffName) ===
              nameAndIds[i].resourceTitle
            );
          });
          console.log(eachUserData); //trim no-pair element from this array if it occur when the day passed
          if (eachUserData.length % 2 != 0) {
            eachUserData.splice(eachUserData.length - 1, 1);
          }
          eachTimeline = [];
          for (let j = 0; j < eachUserData.length; j++) {
            eachTimeline.push(eachUserData[j].lastTime);
          }
          /*
          let Morning;
          Morning = eachTimeline.filter((element) => {
            return element.includes("前");
          });

          let Afternoon;
          Afternoon = eachTimeline.filter((element) => {
            return element.includes("後");
          });
          */
          eachTimeline.sort((a, b) => {
            const ComparedNum1 = a
              .split("")
              .filter((element) => {
                return Number.isFinite(Number(element));
              })
              .join("");
            const ComparedNum2 = b
              .split("")
              .filter((element) => {
                return Number.isFinite(Number(element));
              })
              .join("");
            if (ComparedNum1 > ComparedNum2) return 1;
            else if (ComparedNum1 < ComparedNum2) return -1;
            else return 0;
          });
          /*
          console.log(Afternoon);
          Afternoon.sort((a, b) => {
            const ComparedNum1 = a
              .split("")
              .filter((element) => {
                return Number.isFinite(Number(element));
              })
              .join("");
            const ComparedNum2 = b
              .split("")
              .filter((element) => {
                return Number.isFinite(Number(element));
              })
              .join("");
            if (ComparedNum1 > ComparedNum2) return 1;
            else if (ComparedNum1 < ComparedNum2) return -1;
            else return 0;
          }).filter((element) => {
              return Number.isFinite(Number(element));
            })
          .join("")
          .map(value => {
            return value + 1200
          })
          .split("")
          */
          console.log(eachTimeline);

          for (let k = 0; k < eachTimeline.length; k = k + 2) {
            oneEvent.title = eachUserData.filter((element) => {
              return element.lastTime === eachTimeline[k + 1];
            })[0].isWork;

            /*
            let timefragment = [];
            timefragment[k] = timeframes[k].split("").filter((element) => {
              return Number.isFinite(Number(element));
            });
            let hour1 = timefragment[k].splice(2, 2).join("");
            let minite1 = timefragment[k].splice(0, 2).join("");
            let hour2 = timefragment[k + 1].splice(2, 2).join("");
            let minite2 = timefragment[k + 1].splice(0, 2).join("");
            */
            oneEvent.start = new Date(eachTimeline[k]);
            oneEvent.end = new Date(eachTimeline[k + 1]);
            oneEvent.resourceId = i * 2 + 1;
            console.log(events);
            events.push(oneEvent);
          }
          console.log(events);
        }
        /*
        for (let i = 0; i < timeline.length; i = i + 2) {
          oneEvent.title =
            res.data.timeline[i].groupName ||
            res.data.timeline[i].tenantName ||
            res.data.timeline[i].staffName;
          oneEvent.start = timeframes[i];
          oneEvent.end = timeframes[i + 1];
          oneEvent.resourceId =
            nameAndIds.filter((element) => {
              return (
                element.resourceTitle ===
                (res.data.timeline[i].groupName ||
                  res.data.timeline[i].tenantName ||
                  res.data.timeline[i].staffName)
              );
            })[0].resourceId + 1;
          events.push(oneEvent);
        }
        */
        setNewEvents(events);
        console.log(events);
        console.log(oneEvent);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const TextFunc = () => {
    let arr = [
      "午後11時24分",
      "午後11時25分",
      "午前11時23分",
      "午後11時26分",
      "午後11時24分",
      "午後11時25分",
      "午前11時24分",
      "午前11時25分",
    ];

    let Morning;
    Morning = arr.filter((element) => {
      return element.includes("前");
    });
    let Afternoon;
    Afternoon = arr.filter((element) => {
      return element.includes("後");
    });

    Morning.sort((a, b) => {
      const ComparedNum1 = a
        .split("")
        .filter((element) => {
          return Number.isFinite(Number(element));
        })
        .join("");
      const ComparedNum2 = b
        .split("")
        .filter((element) => {
          return Number.isFinite(Number(element));
        })
        .join("");
      if (ComparedNum1 > ComparedNum2) return 1;
      else if (ComparedNum1 < ComparedNum2) return -1;
      else return 0;
    });

    Afternoon.sort((a, b) => {
      const ComparedNum1 = a
        .split("")
        .filter((element) => {
          return Number.isFinite(Number(element));
        })
        .join("");
      const ComparedNum2 = b
        .split("")
        .filter((element) => {
          return Number.isFinite(Number(element));
        })
        .join("");
      if (ComparedNum1 > ComparedNum2) return 1;
      else if (ComparedNum1 < ComparedNum2) return -1;
      else return 0;
    });

    let Timeband = Morning.concat(Afternoon);
    console.log(Timeband);
  };

  const handleSubmit = () => {
    const shiftData = {
      title: jobName,
      start: selectedStartDate,
      end: selectedEndDate,
    };
    shiftData.resourceId = spreadName().filter(
      (nameWithId) => nameWithId.resourceTitle === submitName
    )[0].resourceId;
    console.log(shiftData);
  };
  let nameAndIds;
  const spreadName = () => {
    childSheets.forEach((childSheet, index) => {
      if (childSheet) {
        const { groupName, tenantName, staffName } = childSheet;
        console.log(childSheet);
        if (groupName) {
          nameWithIds.push({
            resourceId: index * 2,
            resourceTitle: groupName,
          });
        } else if (tenantName) {
          nameWithIds.push({
            resourceId: index * 2,
            resourceTitle: tenantName,
          });
        } else if (staffName) {
          nameWithIds.push({
            resourceId: index * 2,
            resourceTitle: staffName,
          });
        }
      }
    });
    nameAndIds = nameWithIds.slice(0, childSheets.length);
    console.log(nameAndIds);
    return nameAndIds;
  };
  return (
    <div>
      <Calendar
        /*
        components={{ toolbar: (props) => <CalendarToolbar {...props} /> }}
        */
        localizer={localizer}
        events={newEvents}
        startAccessor="start"
        endAccessor="end"
        defaultView={Views.DAY}
        views={["day", "work_week"]}
        step={60}
        defaultDate={new Date()}
        resources={
          childSheets !== null &&
          spreadName()
            .concat(newEvents)
            .sort((a, b) => {
              return a.resourceId - b.resourceId;
            })
        }
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
      />
      <Grid container align="center">
        <Grid item sm />
        <Grid item sm>
          <FormControl className={classes.formControl}>
            <InputLabel id="submitType">従事者名</InputLabel>
            <Select
              labelId="submitType"
              id="submitType"
              value={submitName}
              onChange={handleNameChange}
            >
              {childSheets !== null &&
                childSheets.map((childSheet) => {
                  if (childSheet) {
                    const { groupName, tenantName, staffName } = childSheet;
                    if (groupName) {
                      return <MenuItem value={groupName}>{groupName}</MenuItem>;
                    } else if (tenantName) {
                      return (
                        <MenuItem value={tenantName}>{tenantName}</MenuItem>
                      );
                    } else if (staffName) {
                      return <MenuItem value={staffName}>{staffName}</MenuItem>;
                    }
                  }
                })}
            </Select>
          </FormControl>
          <MuiPickersUtilsProvider utils={MomentUtils} locale={"ja"}>
            <div className={classes.shiftInput}>
              <TimePicker
                clearable
                ampm={false}
                label="何時から"
                value={selectedStartDate}
                onChange={handleStartDateChange}
              />
              <span style={{ marginTop: "1.5em" }}>〜</span>
              <TimePicker
                clearable
                ampm={false}
                label="何時まで"
                value={selectedEndDate}
                onChange={handleEndDateChange}
              />
            </div>
          </MuiPickersUtilsProvider>
          <TextField
            id="job"
            name="job"
            type="job"
            label="仕事内容"
            className={classes.textField}
            fullWidth
            value={jobName}
            onChange={handleJobNameChange}
          />
          <Button
            className={classes.shiftBtn}
            variant="contained"
            color="primary"
            onClick={makeTimelineVisible}
          >
            Submit
          </Button>
        </Grid>
        <Grid item sm />
      </Grid>
      <Button
        color="primary"
        variant="contained"
        style={{ margin: "10px 10px" }}
        onClick={TextFunc}
      >
        RefreshCalendar
      </Button>
    </div>
  );
};

export default MyCalendar;
/*
  componentDidMount() {
      axios.get("/getCalendar")
      .then(res => {
          events = res.data.events
          this.setState({ events });
      })
  }
 
              {(typeof childSheets === "array" ||
                childSheets instanceof Array) &&
                childSheets.map(childSheet => {
                  console.log(childSheet);
                  const { groupName, tenantName, staffName } = childSheet;
                  const Name = () => {
                    if (
                      typeof groupName === "string" ||
                      groupName instanceof String
                    ) {
                      setChildname(groupName);
                    } else if (
                      typeof tenantName === "string" ||
                      tenantName instanceof String
                    ) {
                      setChildname(tenantName);
                    } else if (
                      typeof staffName === "string" ||
                      staffName instanceof String
                    ) {
                      setChildname(staffName);
                    }
                    return <MenuItem>{childName}</MenuItem>;
                  };
                  return <Fragment>{Name}</Fragment>;
                })}
              }

  refreshCalendar = () => {
    let newCalender = {};
    newCalender.events = this.state.events;
    axios.post("/refreshCalender", newCalender).then(res => {
      alert(res.data.message);
    });
  };
  */
