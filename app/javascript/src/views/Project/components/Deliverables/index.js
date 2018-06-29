import React from "react";
import styled from "styled-components";
import { FieldArray, Field } from "formik";
import Textarea from "react-textarea-autosize";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const DeliverableInput = styled.div`
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

class Deliverables extends React.Component {
  handleChange = index => e => {
    const value = e.target.value;
    const deliverables = this.props.deliverables.map((deliverable, i) => {
      if (index === i) return value
      return deliverable
    })

    const isLast = (this.props.deliverables.length - 1) === index;
    const isEmpty = deliverables[index].length === 0;

    // If we are editing the last item in the array, and there is at least
    // one character in the array then add a blank item to the end of the list.
    if (isLast && value.length > 0) {
      deliverables.push("")
    }

    if (!isLast && isEmpty) {
      deliverables.splice(index, 1);
    }

    this.props.onChange(deliverables)
  }

  render() {
    return (
      <FieldArray
        name="deliverables"
        render={fieldArray => (
          <TransitionGroup>
            {this.props.deliverables.map((deliverable, i) => (
              <CSSTransition timeout={500} classNames="slide" key={i}>
                <DeliverableInput>
                  <Textarea
                    value={deliverable}
                    placeholder="Add a deliverable..."
                    onChange={this.handleChange(i)}
                  />
                </DeliverableInput>
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      />
    );
  }
}

export default Deliverables;
