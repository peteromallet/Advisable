import React from 'react';
import { NotificationCard } from './styles';

class Notification extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.onRemove(this.props.id)
    }, 3000)
  }

  render() {
    return (
      <NotificationCard>
        {this.props.content}
      </NotificationCard>
    )
  }
}

export default Notification
