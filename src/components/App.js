import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "carbon-components-react";
import Moment from "react-moment";
import { TextInput } from "carbon-components-react";
import { DatePickerInput } from "carbon-components-react";
import { DatePicker } from "carbon-components-react";
import { add_Reminder, remove_Reminder, clear_Reminder } from "../actions";
import "./App.css";

class App extends Component {
  state = {
    text: "",
    date: new Date(),
  };

  render_Reminders = () => {
    const { reminders } = this.props;
    console.log(this.props);
    return (
      <ul className="list-group">
        {reminders.map((reminder) => {
          return (
            <li key={reminder.id} className="list-group-item">
              <div className="dataline">
                <div>{reminder.text}</div>
                <Moment format="DD/MM/YYYY">{reminder.date}</Moment>
              </div>
              <div
                className="btn-delete"
                onClick={() => this.props.remove_Reminder(reminder.id)}
              >
                x
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  render() {
    const props = {
      datePicker: () => ({
        id: "date-picker",
        light: false,
        onChange: console.log("onPickerChange"),
        onClose: console.log("onClose"),
      }),
      datePickerInput: () => ({
        id: "date-picker-input-id",
        className: "some-class",
        labelText: "Date Picker label",
        placeholder: "dd/mm/yyyy",
        disabled: false,
        invalid: false,
        invalidText: "A valid value is required",
        iconDescription: "Icon description",
        onChange: (e) => {
          console.log(e.target.value);
          this.setState({
            date: "" + e.target.value,
          });
        },
      }),
    };
    return (
      <div className="App">
        <div className="reminder-title">
          <h2 className="">ToDo List</h2>
        </div>
        <div className="appCont">
          <TextInput
            id="textinput"
            labelText="Reminder"
            className="form-control"
            placeholder="Enter your reminder"
            type="text"
            onChange={(e) => this.setState({ text: e.target.value })}
            value={this.state.text}
          />
          <DatePicker
            id="date-picker"
            datePickerType="single"
            {...props.datePicker()}
            dateFormat="d/m/Y"
            labeltext="Date"
            onChange={(eventOrDates) => {
              const value = eventOrDates.target
                ? eventOrDates.target.value
                : eventOrDates[0];
              this.setState({ date: value });
            }}
          >
            <DatePickerInput
              {...props.datePickerInput()}
              id="date-picker-input-id"
            />
          </DatePicker>
        </div>
        <div class="btns-cont">
          <Button
            onClick={() => {
              this.props.add_Reminder(this.state.text, this.state.date);
              //this.setState({ text: "", date: "" });
            }}
            className="btn btn-primary btn-block"
          >
            Add
          </Button>
          <Button
            onClick={this.props.clear_Reminder}
            className="btn bx--btn--secondary btn-block"
          >
            Clear All
          </Button>
        </div>
        {this.render_Reminders()}
      </div>
    );
  }
}
function mapStateToprops(state) {
  return {
    reminders: state,
  };
}
export default connect(mapStateToprops, {
  add_Reminder,
  remove_Reminder,
  clear_Reminder,
})(App);
