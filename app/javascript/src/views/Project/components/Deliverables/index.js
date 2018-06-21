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
  handleKeyUp = (fieldArray, index) => e => {
    const content = e.target.value;
    const deliverables = fieldArray.form.values.deliverables;
    const lastItem = deliverables[deliverables.length - 1];

    if (content.length > 0 && lastItem.length !== 0) {
      fieldArray.push("");
    }
  };

  handleKeyDown = (fieldArray, index) => e => {
    const deliverables = fieldArray.form.values.deliverables;
    const isBackspace = e.keyCode === 8;
    const isEmpty = deliverables[index].length === 0;
    const isLastItem = deliverables.length - 1 === index;
    if (isBackspace && !isLastItem && deliverables.length > 1 && isEmpty) {
      fieldArray.remove(index);
    }

    const isReturn = e.keyCode === 13;
    if (isReturn) {
      e.preventDefault();
    }
  };

  handleBlur = (fieldArray, index) => e => {
    const deliverables = fieldArray.form.values.deliverables;
    const isEmpty = deliverables[index].length === 0;
    const isLastItem = deliverables.length - 1 === index;
    if (isEmpty && !isLastItem) {
      fieldArray.remove(index);
    }
  };

  render() {
    return (
      <FieldArray
        name="deliverables"
        render={fieldArray => (
          <TransitionGroup>
            {fieldArray.form.values.deliverables.map((deliverable, i) => (
              <CSSTransition timeout={500} classNames="Deliverable" key={i}>
                <DeliverableInput>
                  <Field
                    name={`deliverables.${i}`}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="Add a deliverable..."
                        onBlur={this.handleBlur(fieldArray, i)}
                        onKeyUp={this.handleKeyUp(fieldArray, i)}
                        onKeyDown={this.handleKeyDown(fieldArray, i)}
                      />
                    )}
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
