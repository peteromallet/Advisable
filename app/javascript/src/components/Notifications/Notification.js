import React from "react";
import { NotificationCard } from "./styles";

class Notification extends React.Component {
  render() {
    return <NotificationCard>{this.props.content}</NotificationCard>;
  }
}

export default Notification;
