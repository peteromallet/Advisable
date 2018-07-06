import React from "react";
import uniqueId from "lodash/uniqueId";
import { PoseGroup } from "react-pose";
import findIndex from "lodash/findIndex";
import { Container, NotificationWrapper } from "./styles";
import Notification from "./Notification";
import Context from './context';
export { default as withNotifications } from './withNotifications';

export class NotificationsProvider extends React.Component {
  state = {
    queue: [],
    notify: this.notify
  };

  notify = message => {
    const id = uniqueId("notification");
    this.setState(state => ({
      queue: [
        ...state.queue,
        {
          id,
          content: message
        }
      ]
    }));
  };

  remove = id => {
    const index = findIndex(this.state.queue, { id })
    this.setState(state => ({
      queue: [
        ...state.queue.slice(0, index),
        ...state.queue.slice(index + 1)
      ]
    }));
  }

  render() {
    return (
      <Context.Provider value={{ notify: this.notify }}>
        <Container>
          <PoseGroup preEnterPose="initial">
            {this.state.queue.map(notification => (
              <NotificationWrapper key={notification.id}>
                <Notification {...notification} onRemove={this.remove}/>
              </NotificationWrapper>
            ))}
          </PoseGroup>
        </Container>
        <React.Fragment>{this.props.children}</React.Fragment>
      </Context.Provider>
    );
  }
}

export default Context.Consumer;
