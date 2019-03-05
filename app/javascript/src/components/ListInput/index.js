import React from "react";
import uniqueID from "lodash/uniqueId";
import styled from "styled-components";
import TextField from "src/components/TextField";
import InputError from "src/components/InputError";
import InputLabel from "src/components/InputLabel";
import { withSpacing, extractSpacingProps } from 'src/components/Spacing';

const Wrapper = withSpacing(styled.div``)

const ListItem = styled.div`
  margin-bottom: 8px;

  &:last-child { margin-bottom: 0 }
`

class ListInput extends React.Component {
  static defaultProps = {
    value: []
  };

  state = {
    items: [
      ...this.props.value,
      ""
    ]
  }

  componentWillMount() {
    this.id = this.props.id || uniqueID("input");
  }

  handleChange = index => e => {
    const value = e.target.value;
    const items = this.state.items.map((v, i) => {
      if (index === i) return value;
      return v;
    });

    const isLast = this.state.items.length - 1 === index;
    const isEmpty = items[index].length === 0;

    // If we are editing the last item in the array, and there is at least
    // one character in the array then add a blank item to the end of the list.
    if (isLast && value.length > 0) {
      items.push("");
    }

    if (!isLast && isEmpty) {
      items.splice(index, 1);
    }

    this.setState({ items })
    this.props.onChange(items.filter(Boolean));
  };

  render() {
    const { label, error, placeholder } = this.props;

    return (
      <Wrapper {...extractSpacingProps(this.props)}>
        {label && <InputLabel htmlFor={this.id}>{label}</InputLabel>}
          {this.state.items.map((v, i) => (
            <ListItem key={i}>
              <TextField
                multiline
                value={v}
                minRows={1}
                autoHeight
                name={`${this.props.name}[${i}]`}
                placeholder={this.props.placeholder}
                onChange={this.handleChange(i)}
              />
            </ListItem>
          ))}
        {error && <InputError>{error}</InputError>}
      </Wrapper>
    );
  }
}

export default ListInput;
