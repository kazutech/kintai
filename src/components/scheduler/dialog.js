import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
class FormDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visability: true,
      title: ""
    };
  }

  handleClose = () => {
    this.props.setClose();
    this.props.setTitle(this.state.title);
    this.setState({ visability: false });
  };

  handleTitle = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return this.state.visability ? (
      <div>
        <Dialog open={this.props.open} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>What is your new event?</DialogContentText>
            <TextField
              autoFocus
              value={this.state.title}
              margin="dense"
              id="name"
              label="Event Name"
              type="name"
              fullWidth
              onChange={this.handleTitle}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    ) : (
      this.props.schedulerData
    );
  }
}

export default FormDialog;
