import React from "react";
import flatpickr from 'flatpickr';
import isEqual from 'lodash/isEqual';
import forEach from 'lodash/forEach';
import uniqueID from "lodash/uniqueId";
import InputError from "src/components/InputError";
import InputLabel from "src/components/InputLabel";
import { Input } from './styles';
import 'flatpickr/dist/themes/light.css'

class DatePicker extends React.Component {
  componentWillMount() {
    this.id = this.props.id || uniqueID("TextField");
  }

  componentDidMount() {
    this.flatpickr = flatpickr(this.node, {
      onChange: this.props.onChange,
      ...this.props.options,
    });
  }

  componentWillReceiveProps(props) {
    if (!isEqual(props.options, this.props.options)) {
      forEach(props.options, (value, option) => {
        this.flatpickr.set(option, value);
      })
    }
  }

  componentWillUnmount() {
    this.flatpickr.destroy()
  }

  render() {
    return (
      <React.Fragment>
        {this.props.label && (
          <InputLabel htmlFor={this.id}>{this.props.label}</InputLabel>
        )}
        <Input
          id={this.id}
          innerRef={c => this.node = c}
          name={this.props.name}
          value={this.props.value || ''}
          onBlur={this.props.onBlur}
          autoComplete="off"
          readOnly
          placeholder={this.props.placeholder}
        />
        {this.props.error && <InputError>{this.props.error}</InputError>}
      </React.Fragment>
    );
  }
}

export default DatePicker;
