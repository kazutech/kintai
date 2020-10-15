import React from "react";
import Toolbar from "react-big-calendar/lib/Toolbar";
import Button from "@material-ui/core/Button";

export default class CalendarToolbar extends Toolbar {
  componentDidMount() {
    const view = this.props.view;
  }

  render() {
    return (
      <div>
        <div className="rbc-btn-group">
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.navigate("PREV")}
            style={{
              borderTopRightRadius: "4px",
              borderBottomRightRadius: "4px"
            }}
          >
            前日
          </Button>
          <span> </span>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.navigate("NEXT")}
            style={{
              borderTopLeftRadius: "4px",
              borderBottomLeftRadius: "4px"
            }}
          >
            翌日
          </Button>
        </div>
        <div className="rbc-toolbar-label">{this.props.label}</div>
      </div>
    );
  }
}
