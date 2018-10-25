import React from "react";
import uniqueID from "lodash/uniqueId";
import styled from "styled-components";
import Textarea from "react-textarea-autosize";
import InputError from "src/components/InputError";
import InputLabel from "src/components/InputLabel";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListInputItem = styled.div`
  position: relative;
  background: #f4f7fc;
  border-radius: 10px;
  margin-bottom: 10px;

  &.slide-enter {
    opacity: 0;
    transform: translateY(10px);
  }

  &.slide-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 300ms, transform 300ms;
  }

  &::before {
    top: 50%;
    left: 20px;
    content: "";
    width: 8px;
    height: 8px;
    position: absolute;
    background: #becce3;
    border-radius: 100%;
    transform: translateY(-50%);
  }

  textarea {
    width: 100%;
    resize: none;
    border: none;
    outline: none;
    color: #31395d;
    font-size: 15px;
    font-weight: 500;
    background: transparent;
    padding: 12px 15px 12px 45px;
    letter-spacing: -0.02em;
  }

  textarea::-webkit-input-placeholder {
    color: #a4add1;
  }
  textarea::-moz-placeholder {
    color: #a4add1;
  }
  textarea:-ms-input-placeholder {
    color: #a4add1;
  }
  textarea:-moz-placeholder {
    color: #a4add1;
  }
`;

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
      <React.Fragment>
        {label && <InputLabel htmlFor={this.id}>{label}</InputLabel>}
        <TransitionGroup>
          {this.state.items.map((v, i) => (
            <CSSTransition timeout={500} classNames="slide" key={i}>
              <ListInputItem>
                <Textarea
                  value={v}
                  name={`${this.props.name}[${i}]`}
                  placeholder={this.props.placeholder}
                  onChange={this.handleChange(i)}
                />
              </ListInputItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
        {error && <InputError>{error}</InputError>}
      </React.Fragment>
    );
  }
}

export default ListInput;
