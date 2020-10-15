import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Scheduler, {
  SchedulerData,
  ViewTypes,
  DATE_FORMAT
} from "react-big-scheduler";
import "react-big-scheduler/lib/css/style.css";
import moment from "moment";
import "moment/locale/ja";
import axios from "axios";
import FormDialog from "./dialog";
import withDragDropContext from "../../util/withDnDContext";
import DemoData from "./DemoData";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

class SchedulePage extends Component {
  constructor(props) {
    super(props);
    let schedulerData = new SchedulerData(
      moment().format(DATE_FORMAT),
      ViewTypes.Day
    );
    moment.locale("ja");
    schedulerData.setLocaleMoment(moment);
    schedulerData.config.schedulerWidth = "70%";

    schedulerData.setResources(DemoData.resources);
    schedulerData.setEvents(DemoData.events);

    this.state = {
      viewModel: schedulerData,
      open: true,
      title: null,
      startName: null,
      startRole: null,
      startType: null,
      eventStartTime: null,
      endName: null,
      endRole: null,
      endType: null,
      eventEndTime: null
    };
  }
  componentDidMount() {}

  getReadonlyScheduler = () => {
    axios
      .get("/scheduler")
      .then(res => {
        let startName = [],
          startRole = [],
          startType = [],
          eventStartTime = [],
          endName = [],
          endRole = [],
          endType = [],
          eventEndTime = [];
        for (let i = 0; i < res.data.timeline.length - 1; i = i + 2) {
          startName.push(
            res.data.timeline[i].groupName ||
              res.data.timeline[i].tenantName ||
              res.data.timeline[i].staffName
          );
          startRole.push(res.data.timeline[i].role);
          startType.push(res.data.timeline[i].submitType);
          eventStartTime.push(res.data.timeline[i].submitTime);

          endName.push(
            res.data.timeline[i + 1].groupName ||
              res.data.timeline[i + 1].tenantName ||
              res.data.timeline[i + 1].staffName
          );
          endRole.push(res.data.timeline[i + 1].role);
          endType.push(res.data.timeline[i + 1].submitType);
          eventEndTime.push(res.data.timeline[i + 1].submitTime);
        }
        this.setState({
          startName: startName,
          startRole: startRole,
          startType: startType,
          eventStartTime: eventStartTime,
          endName: endName,
          endRole: endRole,
          endType: endType,
          eventEndTime: eventEndTime
        });
        return;
      })
      .then(() => {
        let resources = [],
          events = [];
        for (let i = 0; i < this.state.startName.length; i++) {
          resources.push({
            id: i,
            name: this.state.startName[i]
          });
          events.push({
            id: i,
            start: this.state.eventStartTime[i],
            end: this.state.eventEndTime[i],
            title: this.state.startRole[i]
          });
        }
        this.schedulerData.setResources(resources);
        this.schedulerData.setEvents(events);
      });
  };

  render() {
    const { viewModel } = this.state;
    return (
      <Scheduler
        schedulerData={viewModel}
        prevClick={this.prevClick}
        nextClick={this.nextClick}
        onSelectDate={this.onSelectDate}
        onViewChange={this.onViewChange}
        prevClick={this.prevClick}
        nextClick={this.nextClick}
        onSelectDate={this.onSelectDate}
        onViewChange={this.onViewChange}
        eventItemClick={this.eventClicked}
        viewEventClick={this.ops1}
        viewEventText="Ops 1"
        viewEvent2Text="Ops 2"
        viewEvent2Click={this.ops2}
        updateEventStart={this.updateEventStart}
        updateEventEnd={this.updateEventEnd}
        moveEvent={this.moveEvent}
        newEvent={this.newEvent}
        onScrollLeft={this.onScrollLeft}
        onScrollRight={this.onScrollRight}
        onScrollTop={this.onScrollTop}
        onScrollBottom={this.onScrollBottom}
        toggleExpandFunc={this.toggleExpandFunc}
      />
    );
  }
  /*
  renderDialog = async schedulerData => {
    return (
      <FormDialog
        schadulerData={schedulerData}
        open={this.state.open}
        setClose={this.setClose}
        setTitle={this.setTitle}
      />
    );
  };

  changeTitle = async schedulerData => {
    if (this.state.title !== "") {
      return schedulerData;
    }
  };

  setTitle = () => {
    this.setState({});
  };

  setClose = () => {
    this.setState({ open: false });
  };
  newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    let newFreshId = 0;
    schedulerData.events.forEach(item => {
      if (item.id >= newFreshId) newFreshId = item.id + 1;
    });

    let newEvent = {
      id: newFreshId,
      title: "New event you just created",
      start: start,
      end: end,
      resourceId: slotId,
      bgColor: "purple"
    };
    schedulerData.addEvent(newEvent);
    this.setState({
      viewModel: schedulerData
    });
  };
  */

  prevClick = schedulerData => {
    schedulerData.prev();
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData
    });
  };

  nextClick = schedulerData => {
    schedulerData.next();
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData
    });
  };

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData
    });
  };

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData
    });
  };

  eventClicked = (schedulerData, event) => {
    alert(
      `You just clicked an event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  ops1 = (schedulerData, event) => {
    alert(
      `You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  ops2 = (schedulerData, event) => {
    alert(
      `You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    let newFreshId = 0;
    schedulerData.events.forEach(item => {
      if (item.id >= newFreshId) newFreshId = item.id + 1;
    });

    let newEvent = {
      id: newFreshId,
      title: "New event you just created",
      start: start,
      end: end,
      resourceId: slotId,
      bgColor: "purple"
    };
    schedulerData.addEvent(newEvent);
    this.setState({
      viewModel: schedulerData
    });
  };

  updateEventStart = (schedulerData, event, newStart) => {
    schedulerData.updateEventStart(event, newStart);

    this.setState({
      viewModel: schedulerData
    });
  };

  updateEventEnd = (schedulerData, event, newEnd) => {
    schedulerData.updateEventEnd(event, newEnd);

    this.setState({
      viewModel: schedulerData
    });
  };

  moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    schedulerData.moveEvent(event, slotId, slotName, start, end);
    this.setState({
      viewModel: schedulerData
    });
  };

  onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.next();
      schedulerData.setEvents(DemoData.events);
      this.setState({
        viewModel: schedulerData
      });

      schedulerContent.scrollLeft = maxScrollLeft - 10;
    }
  };

  onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.prev();
      schedulerData.setEvents(DemoData.events);
      this.setState({
        viewModel: schedulerData
      });

      schedulerContent.scrollLeft = 10;
    }
  };

  onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log("onScrollTop");
  };

  onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log("onScrollBottom");
  };

  toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId);
    this.setState({
      viewModel: schedulerData
    });
  };
}

export default DragDropContext(HTML5Backend)(SchedulePage);

/*
newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    this.renderDialog()
      .then(() => {
        return this.changeTitle();
      })
      .then(() => {
        let newFreshId = 0;
        schedulerData.events.forEach(item => {
          if (item.id >= newFreshId) newFreshId = item.id + 1;
        });

        let newEvent = {
          id: newFreshId,
          start: start,
          end: end,
          resourceId: slotId,
          bgColor: "purple"
        };
        if (this.state.title === "") {
          newEvent.title = "New event you just created";
        } else {
          newEvent.title = this.state.title;
        }
        schedulerData.addEvent(newEvent);
        this.setState({
          viewModel: schedulerData
        });
      });
  };
*/
