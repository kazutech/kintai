import React, { Component, createRef } from "react";
import Paper from "@material-ui/core/Paper";
import SchedulerPage from "./scheduler";

class schedulerContainer extends Component {
  constructor(props) {
    super(props);
    this.leaflet = createRef();
    this.state = { width: 0 };
  }

  componentDidMount() {
    this.setState({ width: this.leaflet.offsetWidth });
  }
  render() {
    return (
      <div
        ref={leaflet => {
          this.leaflet = leaflet;
        }}
      >
        <Paper>
          <SchedulerPage width={this.state.width} />
        </Paper>
      </div>
    );
  }
}

export default schedulerContainer;
