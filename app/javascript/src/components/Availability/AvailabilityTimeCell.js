import { uniqueId } from "lodash";
import React, { Component } from "react";
import { TimeCell } from "./styles";

class AvailabilityTimeCell extends Component {
  state = {
    firstTouch: null,
    lastTouch: null,
    touchTimer: 0,
  }

  componentDidMount() {
    this.id = uniqueId("time");
  }

  shouldComponentUpdate({ isHighlighted, isSelected }) {
    if (isSelected !== this.props.isSelected) return true;
    if (isHighlighted !== this.props.isHighlighted) return true;
    return false;
  }

  handleMouseOver = e => {
    e.preventDefault();
    e.stopPropagation();
    if (this.disabled) return;
    this.props.onMouseOver(this.props.cell);
  };

  handleMouseDown = e => {
    e.preventDefault();
    e.stopPropagation();
    if (this.disabled) return;
    this.props.onMouseDown(this.props.cell);
  };

  handleTouchStart = e => {
    e.preventDefault()

    const position = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
    this.setState({ firstTouch: position, lastTouch: position })
  }

  handleTouchMove = e => {
    const position = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
    this.setState({ lastTouch: position })
  }

  handleTouchEnd = e => {
    e.preventDefault()
    if (!this.state.firstTouch || !this.state.lastTouch) return;
    const xDiff = Math.abs(this.state.lastTouch.x - this.state.firstTouch.x)
    const yDiff = Math.abs(this.state.lastTouch.y - this.state.firstTouch.y)
    if (xDiff < 8 && yDiff < 8) {
      this.props.onTap(this.props.cell)
    }
    this.setState({ firstTouch: null, lastTouch: null })
  }

  get disabled() {
    const day = this.props.time.day();
    const isWeekend = day === 6 || day === 0; // 6 = Saturday, 0 = Sunday
    return isWeekend;
  }

  render() {
    return (
      <TimeCell
        disabled={this.disabled}
        onMouseDown={this.handleMouseDown}
        onMouseOver={this.handleMouseOver}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        onTouchMove={this.handleTouchMove}
        isSelected={this.props.isSelected}
        isHighlighted={this.props.isHighlighted}
        ref={c => this.cell = c}
      >
        {!this.disabled && (
          <div>
            <svg width={21} height={21} fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.5 21C16.299 21 21 16.299 21 10.5S16.299 0 10.5 0 0 4.701 0 10.5 4.701 21 10.5 21zm5.196-12.282a1 1 0 1 0-1.392-1.436l-5.492 5.325-2.116-2.052a1 1 0 0 0-1.392 1.436l2.812 2.727a1 1 0 0 0 1.393 0l6.187-6z"
                fill="#fff"
              />
            </svg>
          </div>
        )}
      </TimeCell>
    );
  }
}

export default AvailabilityTimeCell;
