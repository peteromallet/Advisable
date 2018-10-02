import React from "react";
import { DateTime } from "luxon";
import flatpickr from 'flatpickr';
import { DateUtils  } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import isEqual from 'lodash/isEqual';
import forEach from 'lodash/forEach';
import uniqueID from "lodash/uniqueId";
import InputError from "src/components/InputError";
import InputLabel from "src/components/InputLabel";
import { Wrapper, Input } from './styles';
import NavBar from './NavBar';
import 'react-day-picker/lib/style.css';

// Renders a date picker input. Values will be passed as ISO strings
class DatePicker extends React.Component {
  componentWillMount() {
    this.id = this.props.id || uniqueID("TextField");
  }

  handleDayClick = day => {
    this.props.onChange(day.toISOString())
  }

  formatDate = (date, format, locale) => {
    return DateTime.fromJSDate(date).setLocale(locale).toFormat(format)
  }

  parseDate = (string, format, locale) => {
    const parsed= DateTime.fromFormat(string, format, { locale }).toISO()
    if (DateUtils.isDate(parsed)) {
          return parsed;
    }
    return undefined
  }

  render() {
    const valueAsDate = new Date(this.props.value);

    return (
      <Wrapper>
        {this.props.label && (
          <InputLabel htmlFor={this.id}>{this.props.label}</InputLabel>
        )}
        <DayPickerInput
          component={Input}
          value={this.props.value ? valueAsDate : ''}
          format={this.props.format || "dd LLLL yyyy"}
          formatDate={this.formatDate}
          placeholder={this.props.placeholder}
          parseDate={this.parseDate}
          onDayChange={this.handleDayClick}
          inputProps={{
            readOnly: true
          }}
          dayPickerProps={{
            showOutsideDays: true,
            selectedDays: valueAsDate,
            navbarElement: NavBar,
            ...this.props.options
          }}
        />
        {this.props.error && <InputError>{this.props.error}</InputError>}
      </Wrapper>
    );
  }
}

export default DatePicker;
